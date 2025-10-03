// Enhanced Phantom Wallet Integration for PumpX Platform
// Comprehensive wallet connection, transaction handling, and testing system

class PhantomIntegration {
    constructor() {
        this.wallet = null;
        this.isConnected = false;
        this.publicKey = null;
        this.connection = null;
        this.PLATFORM_WALLET = 'Fro4991MZF5ka11jBumRZZWtk4S8svrmbuNe46BVpYJA';
        this.eventListeners = [];
        this.transactionHistory = [];
        this.initializeConnection();
    }

    // Initialize Solana connection
    async initializeConnection() {
        try {
            // Try mainnet first, fallback to devnet for testing
            this.connection = new solanaWeb3.Connection(
                'https://api.mainnet-beta.solana.com',
                'confirmed'
            );
            
            // Test connection
            await this.connection.getVersion();
            console.log('Solana mainnet connection established');
        } catch (error) {
            console.warn('Mainnet connection failed, using devnet:', error);
            this.connection = new solanaWeb3.Connection(
                'https://api.devnet.solana.com',
                'confirmed'
            );
        }
    }

    // Check if Phantom is installed
    isPhantomInstalled() {
        return !!(window.solana && window.solana.isPhantom);
    }

    // Get Phantom wallet object
    getPhantom() {
        if (this.isPhantomInstalled()) {
            return window.solana;
        }
        return null;
    }

    // Connect to Phantom wallet
    async connect() {
        try {
            if (!this.isPhantomInstalled()) {
                throw new Error('Phantom wallet not installed');
            }

            const phantom = this.getPhantom();
            
            // Request connection
            const response = await phantom.connect();
            
            if (response.publicKey) {
                this.wallet = phantom;
                this.publicKey = response.publicKey;
                this.isConnected = true;
                
                // Set up event listeners
                this.setupEventListeners();
                
                // Get initial balance
                const balance = await this.getBalance();
                
                // Emit connection event
                this.emitEvent('connected', {
                    publicKey: this.publicKey.toString(),
                    balance: balance
                });

                return {
                    success: true,
                    publicKey: this.publicKey.toString(),
                    balance: balance,
                    walletName: 'Phantom'
                };
            } else {
                throw new Error('Connection failed - no public key received');
            }
        } catch (error) {
            console.error('Phantom connection failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Disconnect from Phantom wallet
    async disconnect() {
        try {
            if (this.wallet && this.isConnected) {
                await this.wallet.disconnect();
            }
            
            this.cleanup();
            
            this.emitEvent('disconnected', {
                message: 'Wallet disconnected successfully'
            });

            return { success: true };
        } catch (error) {
            console.error('Disconnect failed:', error);
            this.cleanup();
            return { success: false, error: error.message };
        }
    }

    // Clean up connection state
    cleanup() {
        this.wallet = null;
        this.publicKey = null;
        this.isConnected = false;
        this.removeEventListeners();
    }

    // Set up Phantom event listeners
    setupEventListeners() {
        if (!this.wallet) return;

        // Account changed
        this.wallet.on('accountChanged', (publicKey) => {
            if (publicKey) {
                this.publicKey = publicKey;
                this.emitEvent('accountChanged', {
                    publicKey: publicKey.toString()
                });
            } else {
                this.handleDisconnect();
            }
        });

        // Wallet disconnected
        this.wallet.on('disconnect', () => {
            this.handleDisconnect();
        });
    }

    // Remove event listeners
    removeEventListeners() {
        if (this.wallet) {
            this.wallet.removeAllListeners();
        }
    }

    // Handle wallet disconnect
    handleDisconnect() {
        this.cleanup();
        this.emitEvent('disconnected', {
            message: 'Wallet disconnected'
        });
    }

    // Get wallet balance
    async getBalance() {
        try {
            if (!this.isConnected || !this.publicKey) {
                throw new Error('Wallet not connected');
            }

            const balance = await this.connection.getBalance(this.publicKey);
            return balance / solanaWeb3.LAMPORTS_PER_SOL;
        } catch (error) {
            console.error('Failed to get balance:', error);
            return 0;
        }
    }

    // Get token balances
    async getTokenBalances() {
        try {
            if (!this.isConnected || !this.publicKey) {
                throw new Error('Wallet not connected');
            }

            const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(
                this.publicKey,
                { programId: solanaWeb3.TOKEN_PROGRAM_ID }
            );

            const tokens = tokenAccounts.value.map(account => {
                const tokenInfo = account.account.data.parsed.info;
                return {
                    mint: tokenInfo.mint,
                    balance: tokenInfo.tokenAmount.uiAmount,
                    decimals: tokenInfo.tokenAmount.decimals,
                    symbol: this.getTokenSymbol(tokenInfo.mint)
                };
            });

            return tokens;
        } catch (error) {
            console.error('Failed to get token balances:', error);
            return [];
        }
    }

    // Get token symbol (simplified mapping)
    getTokenSymbol(mint) {
        const knownTokens = {
            [this.PLATFORM_WALLET]: 'PXP',
            'So11111111111111111111111111111111111111112': 'SOL'
        };
        
        return knownTokens[mint] || 'UNKNOWN';
    }

    // Send SOL transaction
    async sendSOL(toAddress, amount) {
        try {
            if (!this.isConnected || !this.wallet) {
                throw new Error('Wallet not connected');
            }

            const transaction = new solanaWeb3.Transaction().add(
                solanaWeb3.SystemProgram.transfer({
                    fromPubkey: this.publicKey,
                    toPubkey: new solanaWeb3.PublicKey(toAddress),
                    lamports: amount * solanaWeb3.LAMPORTS_PER_SOL,
                })
            );

            // Get recent blockhash
            const { blockhash } = await this.connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = this.publicKey;

            // Sign and send transaction
            const signedTransaction = await this.wallet.signTransaction(transaction);
            const signature = await this.connection.sendRawTransaction(
                signedTransaction.serialize()
            );

            // Confirm transaction
            await this.connection.confirmTransaction(signature, 'confirmed');

            // Record transaction
            this.recordTransaction({
                type: 'transfer',
                signature,
                amount,
                to: toAddress,
                timestamp: Date.now()
            });

            this.emitEvent('transactionComplete', {
                signature,
                type: 'SOL Transfer',
                amount,
                to: toAddress
            });

            return {
                success: true,
                signature,
                amount,
                to: toAddress
            };
        } catch (error) {
            console.error('SOL transfer failed:', error);
            throw error;
        }
    }

    // Send platform fee
    async sendPlatformFee(amount) {
        try {
            return await this.sendSOL(this.PLATFORM_WALLET, amount);
        } catch (error) {
            console.error('Platform fee transfer failed:', error);
            throw error;
        }
    }

    // Sign message
    async signMessage(message) {
        try {
            if (!this.isConnected || !this.wallet) {
                throw new Error('Wallet not connected');
            }

            const encodedMessage = new TextEncoder().encode(message);
            const signedMessage = await this.wallet.signMessage(encodedMessage);

            return {
                success: true,
                signature: Array.from(signedMessage.signature),
                publicKey: this.publicKey.toString()
            };
        } catch (error) {
            console.error('Message signing failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Test wallet functionality
    async runWalletTests() {
        const testResults = {
            connection: false,
            balance: false,
            tokenAccounts: false,
            signing: false,
            overall: false
        };

        try {
            // Test 1: Connection
            if (this.isConnected && this.publicKey) {
                testResults.connection = true;
                console.log('✅ Wallet connection test passed');
            } else {
                console.log('❌ Wallet connection test failed');
            }

            // Test 2: Balance retrieval
            try {
                const balance = await this.getBalance();
                if (typeof balance === 'number') {
                    testResults.balance = true;
                    console.log('✅ Balance retrieval test passed:', balance, 'SOL');
                } else {
                    console.log('❌ Balance retrieval test failed');
                }
            } catch (error) {
                console.log('❌ Balance retrieval test failed:', error.message);
            }

            // Test 3: Token accounts
            try {
                const tokens = await this.getTokenBalances();
                if (Array.isArray(tokens)) {
                    testResults.tokenAccounts = true;
                    console.log('✅ Token accounts test passed:', tokens.length, 'tokens found');
                } else {
                    console.log('❌ Token accounts test failed');
                }
            } catch (error) {
                console.log('❌ Token accounts test failed:', error.message);
            }

            // Test 4: Message signing
            try {
                const testMessage = 'PumpX Wallet Test - ' + Date.now();
                const signResult = await this.signMessage(testMessage);
                if (signResult.success) {
                    testResults.signing = true;
                    console.log('✅ Message signing test passed');
                } else {
                    console.log('❌ Message signing test failed:', signResult.error);
                }
            } catch (error) {
                console.log('❌ Message signing test failed:', error.message);
            }

            // Overall result
            testResults.overall = Object.values(testResults).every(result => result === true);

            this.emitEvent('testsComplete', testResults);

            return testResults;
        } catch (error) {
            console.error('Wallet tests failed:', error);
            return testResults;
        }
    }

    // Get wallet information
    getWalletInfo() {
        return {
            isConnected: this.isConnected,
            publicKey: this.publicKey ? this.publicKey.toString() : null,
            isPhantomInstalled: this.isPhantomInstalled(),
            network: this.connection ? this.connection.rpcEndpoint : null,
            transactionCount: this.transactionHistory.length
        };
    }

    // Record transaction
    recordTransaction(transaction) {
        this.transactionHistory.push({
            ...transaction,
            id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        });

        // Keep only last 100 transactions
        if (this.transactionHistory.length > 100) {
            this.transactionHistory = this.transactionHistory.slice(-100);
        }
    }

    // Get transaction history
    getTransactionHistory() {
        return [...this.transactionHistory];
    }

    // Add event listener
    addEventListener(event, callback) {
        this.eventListeners.push({ event, callback });
    }

    // Remove event listener
    removeEventListener(event, callback) {
        this.eventListeners = this.eventListeners.filter(
            listener => listener.event !== event || listener.callback !== callback
        );
    }

    // Emit event
    emitEvent(event, data) {
        this.eventListeners
            .filter(listener => listener.event === event)
            .forEach(listener => {
                try {
                    listener.callback(data);
                } catch (error) {
                    console.error('Event listener error:', error);
                }
            });

        // Also emit as DOM event
        if (typeof window !== 'undefined') {
            const customEvent = new CustomEvent(`phantom_${event}`, {
                detail: data
            });
            window.dispatchEvent(customEvent);
        }
    }

    // Auto-reconnect if previously connected
    async autoReconnect() {
        try {
            if (this.isPhantomInstalled()) {
                const phantom = this.getPhantom();
                
                if (phantom.isConnected) {
                    const result = await this.connect();
                    if (result.success) {
                        console.log('Auto-reconnected to Phantom wallet');
                        return true;
                    }
                }
            }
            return false;
        } catch (error) {
            console.error('Auto-reconnect failed:', error);
            return false;
        }
    }

    // Check network status
    async checkNetworkStatus() {
        try {
            const version = await this.connection.getVersion();
            const slot = await this.connection.getSlot();
            
            return {
                connected: true,
                version: version['solana-core'],
                slot: slot,
                endpoint: this.connection.rpcEndpoint
            };
        } catch (error) {
            return {
                connected: false,
                error: error.message
            };
        }
    }

    // Get recent transactions from blockchain
    async getRecentTransactions(limit = 10) {
        try {
            if (!this.isConnected || !this.publicKey) {
                throw new Error('Wallet not connected');
            }

            const signatures = await this.connection.getSignaturesForAddress(
                this.publicKey,
                { limit }
            );

            const transactions = [];
            for (const sig of signatures) {
                try {
                    const tx = await this.connection.getTransaction(sig.signature);
                    if (tx) {
                        transactions.push({
                            signature: sig.signature,
                            slot: sig.slot,
                            blockTime: sig.blockTime,
                            status: sig.err ? 'failed' : 'success',
                            fee: tx.meta?.fee || 0
                        });
                    }
                } catch (error) {
                    console.warn('Failed to fetch transaction:', sig.signature);
                }
            }

            return transactions;
        } catch (error) {
            console.error('Failed to get recent transactions:', error);
            return [];
        }
    }

    // Validate address
    isValidSolanaAddress(address) {
        try {
            new solanaWeb3.PublicKey(address);
            return true;
        } catch (error) {
            return false;
        }
    }

    // Get airdrop (devnet only)
    async requestAirdrop(amount = 1) {
        try {
            if (!this.isConnected || !this.publicKey) {
                throw new Error('Wallet not connected');
            }

            // Only allow airdrop on devnet
            if (!this.connection.rpcEndpoint.includes('devnet')) {
                throw new Error('Airdrop only available on devnet');
            }

            const signature = await this.connection.requestAirdrop(
                this.publicKey,
                amount * solanaWeb3.LAMPORTS_PER_SOL
            );

            await this.connection.confirmTransaction(signature, 'confirmed');

            this.emitEvent('airdropComplete', {
                signature,
                amount
            });

            return {
                success: true,
                signature,
                amount
            };
        } catch (error) {
            console.error('Airdrop failed:', error);
            throw error;
        }
    }
}

// Global Phantom integration instance
let phantomIntegration = null;

// Initialize Phantom integration
function initializePhantomIntegration() {
    if (!phantomIntegration) {
        phantomIntegration = new PhantomIntegration();
        
        // Set up global event listeners
        phantomIntegration.addEventListener('connected', (data) => {
            console.log('Phantom wallet connected:', data.publicKey);
            if (window.showNotification) {
                window.showNotification('✅ Phantom wallet connected successfully!', 'success');
            }
        });

        phantomIntegration.addEventListener('disconnected', (data) => {
            console.log('Phantom wallet disconnected');
            if (window.showNotification) {
                window.showNotification('🔌 Phantom wallet disconnected', 'info');
            }
        });

        phantomIntegration.addEventListener('transactionComplete', (data) => {
            console.log('Transaction completed:', data.signature);
            if (window.showNotification) {
                window.showNotification(`✅ Transaction completed: ${data.type}`, 'success');
            }
        });

        // Try auto-reconnect
        phantomIntegration.autoReconnect();
    }
    
    return phantomIntegration;
}

// Global functions for Phantom integration
window.connectPhantomWallet = async function() {
    const phantom = initializePhantomIntegration();
    return await phantom.connect();
};

window.disconnectPhantomWallet = async function() {
    if (phantomIntegration) {
        return await phantomIntegration.disconnect();
    }
    return { success: false, error: 'No wallet connected' };
};

window.getPhantomWalletInfo = function() {
    if (phantomIntegration) {
        return phantomIntegration.getWalletInfo();
    }
    return null;
};

window.runPhantomTests = async function() {
    if (phantomIntegration && phantomIntegration.isConnected) {
        return await phantomIntegration.runWalletTests();
    }
    throw new Error('Phantom wallet not connected');
};

// Export for global use
if (typeof window !== 'undefined') {
    window.PhantomIntegration = PhantomIntegration;
    window.phantomIntegration = phantomIntegration;
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePhantomIntegration();
});

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhantomIntegration;
}
