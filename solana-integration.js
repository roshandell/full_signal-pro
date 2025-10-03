// Solana Integration for PumpX Platform
// Advanced wallet connection and token operations

class SolanaIntegration {
    constructor() {
        this.connection = null;
        this.wallet = null;
        this.walletAdapter = null;
        this.PLATFORM_WALLET = 'Fro4991MZF5ka11jBumRZZWtk4S8svrmbuNe46BVpYJA';
        this.PLATFORM_FEE_PERCENTAGE = 0.01; // 1% platform fee
        this.TOKEN_2022_PROGRAM_ID = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
        
        this.initializeConnection();
    }

    async initializeConnection() {
        try {
            // Connect to Solana mainnet
            this.connection = new solanaWeb3.Connection(
                'https://api.mainnet-beta.solana.com',
                'confirmed'
            );
            
            console.log('Solana connection initialized');
        } catch (error) {
            console.error('Failed to initialize Solana connection:', error);
            // Fallback to devnet for development
            this.connection = new solanaWeb3.Connection(
                'https://api.devnet.solana.com',
                'confirmed'
            );
        }
    }

    // Enhanced wallet detection and connection
    async detectWallets() {
        const wallets = [];
        
        // Check for Phantom
        if (window.solana && window.solana.isPhantom) {
            wallets.push({
                name: 'Phantom',
                icon: '👻',
                adapter: window.solana,
                connect: () => this.connectPhantom()
            });
        }
        
        // Check for Solflare
        if (window.solflare && window.solflare.isSolflare) {
            wallets.push({
                name: 'Solflare',
                icon: '🔥',
                adapter: window.solflare,
                connect: () => this.connectSolflare()
            });
        }
        
        // Check for other wallets
        if (window.backpack) {
            wallets.push({
                name: 'Backpack',
                icon: '🎒',
                adapter: window.backpack,
                connect: () => this.connectBackpack()
            });
        }
        
        return wallets;
    }

    async connectPhantom() {
        try {
            if (!window.solana || !window.solana.isPhantom) {
                throw new Error('Phantom wallet not found');
            }

            const response = await window.solana.connect();
            this.wallet = response.publicKey;
            this.walletAdapter = window.solana;
            
            // Set up event listeners
            window.solana.on('connect', () => {
                console.log('Phantom connected');
            });
            
            window.solana.on('disconnect', () => {
                this.handleDisconnect();
            });
            
            window.solana.on('accountChanged', (publicKey) => {
                if (publicKey) {
                    this.wallet = publicKey;
                    this.updateWalletInfo();
                } else {
                    this.handleDisconnect();
                }
            });

            return {
                success: true,
                publicKey: response.publicKey.toString(),
                walletName: 'Phantom'
            };
        } catch (error) {
            console.error('Phantom connection failed:', error);
            return { success: false, error: error.message };
        }
    }

    async connectSolflare() {
        try {
            if (!window.solflare || !window.solflare.isSolflare) {
                throw new Error('Solflare wallet not found');
            }

            const response = await window.solflare.connect();
            this.wallet = response.publicKey;
            this.walletAdapter = window.solflare;
            
            return {
                success: true,
                publicKey: response.publicKey.toString(),
                walletName: 'Solflare'
            };
        } catch (error) {
            console.error('Solflare connection failed:', error);
            return { success: false, error: error.message };
        }
    }

    async connectBackpack() {
        try {
            if (!window.backpack) {
                throw new Error('Backpack wallet not found');
            }

            const response = await window.backpack.connect();
            this.wallet = response.publicKey;
            this.walletAdapter = window.backpack;
            
            return {
                success: true,
                publicKey: response.publicKey.toString(),
                walletName: 'Backpack'
            };
        } catch (error) {
            console.error('Backpack connection failed:', error);
            return { success: false, error: error.message };
        }
    }

    handleDisconnect() {
        this.wallet = null;
        this.walletAdapter = null;
        console.log('Wallet disconnected');
        
        // Update UI
        if (window.updateWalletDisconnectedUI) {
            window.updateWalletDisconnectedUI();
        }
    }

    // Get wallet balances
    async getBalances() {
        if (!this.wallet || !this.connection) {
            throw new Error('Wallet not connected');
        }

        try {
            // Get SOL balance
            const solBalance = await this.connection.getBalance(this.wallet);
            const solBalanceInSol = solBalance / solanaWeb3.LAMPORTS_PER_SOL;

            // Get token accounts (including PXP if exists)
            const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(
                this.wallet,
                { programId: solanaWeb3.TOKEN_PROGRAM_ID }
            );

            const tokens = tokenAccounts.value.map(account => {
                const tokenInfo = account.account.data.parsed.info;
                return {
                    mint: tokenInfo.mint,
                    balance: tokenInfo.tokenAmount.uiAmount,
                    decimals: tokenInfo.tokenAmount.decimals
                };
            });

            return {
                sol: solBalanceInSol,
                tokens: tokens
            };
        } catch (error) {
            console.error('Failed to get balances:', error);
            throw error;
        }
    }

    // Create SPL Token 2022
    async createToken(tokenData) {
        if (!this.wallet || !this.walletAdapter) {
            throw new Error('Wallet not connected');
        }

        try {
            const {
                name,
                symbol,
                decimals = 9,
                supply,
                description,
                image
            } = tokenData;

            // Create mint account
            const mintKeypair = solanaWeb3.Keypair.generate();
            const mint = mintKeypair.publicKey;

            // Calculate required lamports for mint account
            const mintRent = await this.connection.getMinimumBalanceForRentExemption(
                splToken.MintLayout.span
            );

            // Create transaction
            const transaction = new solanaWeb3.Transaction();

            // Create mint account instruction
            transaction.add(
                solanaWeb3.SystemProgram.createAccount({
                    fromPubkey: this.wallet,
                    newAccountPubkey: mint,
                    space: splToken.MintLayout.span,
                    lamports: mintRent,
                    programId: splToken.TOKEN_PROGRAM_ID,
                })
            );

            // Initialize mint instruction
            transaction.add(
                splToken.createInitializeMintInstruction(
                    mint,
                    decimals,
                    this.wallet,
                    this.wallet,
                    splToken.TOKEN_PROGRAM_ID
                )
            );

            // Get associated token account
            const associatedTokenAccount = await splToken.getAssociatedTokenAddress(
                mint,
                this.wallet,
                false,
                splToken.TOKEN_PROGRAM_ID,
                splToken.ASSOCIATED_TOKEN_PROGRAM_ID
            );

            // Create associated token account instruction
            transaction.add(
                splToken.createAssociatedTokenAccountInstruction(
                    this.wallet,
                    associatedTokenAccount,
                    this.wallet,
                    mint,
                    splToken.TOKEN_PROGRAM_ID,
                    splToken.ASSOCIATED_TOKEN_PROGRAM_ID
                )
            );

            // Mint tokens instruction
            transaction.add(
                splToken.createMintToInstruction(
                    mint,
                    associatedTokenAccount,
                    this.wallet,
                    supply * Math.pow(10, decimals),
                    [],
                    splToken.TOKEN_PROGRAM_ID
                )
            );

            // Add platform fee transfer
            const platformFeeAmount = 0.01 * solanaWeb3.LAMPORTS_PER_SOL; // 0.01 SOL
            transaction.add(
                solanaWeb3.SystemProgram.transfer({
                    fromPubkey: this.wallet,
                    toPubkey: new solanaWeb3.PublicKey(this.PLATFORM_WALLET),
                    lamports: platformFeeAmount,
                })
            );

            // Get recent blockhash
            const { blockhash } = await this.connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = this.wallet;

            // Partially sign with mint keypair
            transaction.partialSign(mintKeypair);

            // Sign and send transaction
            const signedTransaction = await this.walletAdapter.signTransaction(transaction);
            const signature = await this.connection.sendRawTransaction(
                signedTransaction.serialize()
            );

            // Confirm transaction
            await this.connection.confirmTransaction(signature, 'confirmed');

            // Create metadata (simplified version)
            const metadata = {
                name,
                symbol,
                description,
                image,
                mint: mint.toString(),
                decimals,
                supply
            };

            return {
                success: true,
                mint: mint.toString(),
                signature,
                metadata
            };

        } catch (error) {
            console.error('Token creation failed:', error);
            throw error;
        }
    }

    // Swap tokens using Jupiter API
    async swapTokens(inputMint, outputMint, amount, slippage = 1) {
        if (!this.wallet) {
            throw new Error('Wallet not connected');
        }

        try {
            // Get quote from Jupiter
            const quoteResponse = await fetch(
                `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippage * 100}`
            );
            
            if (!quoteResponse.ok) {
                throw new Error('Failed to get quote');
            }
            
            const quoteData = await quoteResponse.json();

            // Get swap transaction
            const swapResponse = await fetch('https://quote-api.jup.ag/v6/swap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quoteResponse: quoteData,
                    userPublicKey: this.wallet.toString(),
                    wrapAndUnwrapSol: true,
                }),
            });

            if (!swapResponse.ok) {
                throw new Error('Failed to get swap transaction');
            }

            const { swapTransaction } = await swapResponse.json();

            // Deserialize and sign transaction
            const transaction = solanaWeb3.Transaction.from(
                Buffer.from(swapTransaction, 'base64')
            );

            const signedTransaction = await this.walletAdapter.signTransaction(transaction);
            const signature = await this.connection.sendRawTransaction(
                signedTransaction.serialize()
            );

            // Calculate and send platform fee
            const platformFee = parseFloat(quoteData.outAmount) * this.PLATFORM_FEE_PERCENTAGE;
            await this.sendPlatformFee(platformFee, outputMint);

            await this.connection.confirmTransaction(signature, 'confirmed');

            return {
                success: true,
                signature,
                inputAmount: quoteData.inAmount,
                outputAmount: quoteData.outAmount,
                platformFee
            };

        } catch (error) {
            console.error('Swap failed:', error);
            throw error;
        }
    }

    // Send platform fee
    async sendPlatformFee(amount, tokenMint) {
        try {
            if (tokenMint === 'So11111111111111111111111111111111111111112') {
                // SOL transfer
                const transaction = new solanaWeb3.Transaction().add(
                    solanaWeb3.SystemProgram.transfer({
                        fromPubkey: this.wallet,
                        toPubkey: new solanaWeb3.PublicKey(this.PLATFORM_WALLET),
                        lamports: amount,
                    })
                );

                const { blockhash } = await this.connection.getLatestBlockhash();
                transaction.recentBlockhash = blockhash;
                transaction.feePayer = this.wallet;

                const signedTransaction = await this.walletAdapter.signTransaction(transaction);
                const signature = await this.connection.sendRawTransaction(
                    signedTransaction.serialize()
                );

                await this.connection.confirmTransaction(signature, 'confirmed');
                return signature;
            } else {
                // Token transfer
                const platformTokenAccount = await splToken.getAssociatedTokenAddress(
                    new solanaWeb3.PublicKey(tokenMint),
                    new solanaWeb3.PublicKey(this.PLATFORM_WALLET)
                );

                const userTokenAccount = await splToken.getAssociatedTokenAddress(
                    new solanaWeb3.PublicKey(tokenMint),
                    this.wallet
                );

                const transaction = new solanaWeb3.Transaction().add(
                    splToken.createTransferInstruction(
                        userTokenAccount,
                        platformTokenAccount,
                        this.wallet,
                        amount,
                        [],
                        splToken.TOKEN_PROGRAM_ID
                    )
                );

                const { blockhash } = await this.connection.getLatestBlockhash();
                transaction.recentBlockhash = blockhash;
                transaction.feePayer = this.wallet;

                const signedTransaction = await this.walletAdapter.signTransaction(transaction);
                const signature = await this.connection.sendRawTransaction(
                    signedTransaction.serialize()
                );

                await this.connection.confirmTransaction(signature, 'confirmed');
                return signature;
            }
        } catch (error) {
            console.error('Platform fee transfer failed:', error);
            // Don't throw error for fee transfer failure
        }
    }

    // Get token price from Jupiter
    async getTokenPrice(tokenMint) {
        try {
            const response = await fetch(
                `https://price.jup.ag/v4/price?ids=${tokenMint}`
            );
            
            if (!response.ok) {
                throw new Error('Failed to get price');
            }
            
            const data = await response.json();
            return data.data[tokenMint]?.price || 0;
        } catch (error) {
            console.error('Failed to get token price:', error);
            return 0;
        }
    }

    // AI-powered market analysis
    async analyzeMarket(tokenMint) {
        try {
            // Simulate AI analysis
            const analysis = {
                sentiment: Math.random() > 0.5 ? 'bullish' : 'bearish',
                confidence: Math.random() * 100,
                recommendation: Math.random() > 0.5 ? 'buy' : 'sell',
                riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
                priceTarget: Math.random() * 0.01,
                timeframe: '24h'
            };

            return analysis;
        } catch (error) {
            console.error('Market analysis failed:', error);
            return null;
        }
    }

    // Generate AI token suggestions
    generateTokenSuggestions() {
        const categories = [
            { theme: 'DeFi', names: ['DefiKing', 'YieldMaster', 'LiquidGold'], symbols: ['DKING', 'YIELD', 'LGOLD'] },
            { theme: 'Gaming', names: ['GameFi', 'PlayEarn', 'MetaGame'], symbols: ['GAFI', 'PLAY', 'META'] },
            { theme: 'AI', names: ['AIToken', 'SmartCoin', 'NeuralNet'], symbols: ['AITK', 'SMART', 'NEURAL'] },
            { theme: 'Green', names: ['EcoToken', 'GreenEnergy', 'SolarCoin'], symbols: ['ECO', 'GREEN', 'SOLAR'] },
            { theme: 'Social', names: ['SocialFi', 'CommunityToken', 'ShareCoin'], symbols: ['SOFI', 'COMM', 'SHARE'] }
        ];

        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const suggestions = [];

        for (let i = 0; i < 3; i++) {
            const nameIndex = Math.floor(Math.random() * randomCategory.names.length);
            suggestions.push({
                name: randomCategory.names[nameIndex],
                symbol: randomCategory.symbols[nameIndex],
                description: `${randomCategory.theme} token for the future of decentralized finance`,
                category: randomCategory.theme
            });
        }

        return suggestions;
    }

    // Security check using AI
    async performSecurityCheck(walletAddress) {
        try {
            // Simulate AI security analysis
            const riskFactors = [];
            const score = Math.random() * 100;

            if (score < 30) {
                riskFactors.push('High transaction frequency detected');
            }
            if (score < 50) {
                riskFactors.push('Interaction with unknown contracts');
            }
            if (score > 80) {
                riskFactors.push('Clean transaction history');
            }

            return {
                score: Math.round(score),
                level: score > 70 ? 'low' : score > 40 ? 'medium' : 'high',
                factors: riskFactors,
                recommendation: score > 70 ? 'Safe to proceed' : 'Exercise caution'
            };
        } catch (error) {
            console.error('Security check failed:', error);
            return null;
        }
    }
}

// Export for global use
window.SolanaIntegration = SolanaIntegration;
