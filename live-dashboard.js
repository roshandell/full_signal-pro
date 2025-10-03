// Live Dashboard for PumpX Platform
// Real-time display of platform statistics, profits, and token metrics

class LiveDashboard {
    constructor() {
        this.profitManagement = null;
        this.solanaIntegration = null;
        this.updateInterval = 5000; // 5 seconds
        this.intervalId = null;
        this.isVisible = false;
        this.chartData = {
            profits: [],
            volume: [],
            users: []
        };
        this.initializeDashboard();
    }

    // Initialize dashboard
    initializeDashboard() {
        this.createDashboardHTML();
        this.setupEventListeners();
        this.loadHistoricalData();
        console.log('Live Dashboard initialized');
    }

    // Set dependencies
    setProfitManagement(profitManagement) {
        this.profitManagement = profitManagement;
    }

    setSolanaIntegration(solanaIntegration) {
        this.solanaIntegration = solanaIntegration;
    }

    // Create dashboard HTML structure
    createDashboardHTML() {
        const dashboardHTML = `
            <div id="liveDashboard" class="live-dashboard" style="display: none;">
                <div class="dashboard-header">
                    <h2>
                        <i class="fas fa-chart-line"></i>
                        <span data-lang="live-dashboard">داشبورد زنده پلتفرم</span>
                        <span class="live-indicator">🔴 LIVE</span>
                    </h2>
                    <button class="close-dashboard" onclick="closeLiveDashboard()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="dashboard-content">
                    <!-- Real-time Stats -->
                    <div class="stats-grid">
                        <div class="stat-card glass-effect">
                            <div class="stat-icon">💰</div>
                            <div class="stat-info">
                                <h3 data-lang="total-profits">کل سود</h3>
                                <div class="stat-value" id="totalProfits">0.0000 SOL</div>
                                <div class="stat-change" id="profitChange">+0.00%</div>
                            </div>
                        </div>

                        <div class="stat-card glass-effect">
                            <div class="stat-icon">🏭</div>
                            <div class="stat-info">
                                <h3 data-lang="tokens-created">توکن‌های ساخته شده</h3>
                                <div class="stat-value" id="tokensCreated">0</div>
                                <div class="stat-change" id="tokensChange">+0</div>
                            </div>
                        </div>

                        <div class="stat-card glass-effect">
                            <div class="stat-icon">📊</div>
                            <div class="stat-info">
                                <h3 data-lang="trading-volume">حجم معاملات</h3>
                                <div class="stat-value" id="tradingVolume">0.0000 SOL</div>
                                <div class="stat-change" id="volumeChange">+0.00%</div>
                            </div>
                        </div>

                        <div class="stat-card glass-effect">
                            <div class="stat-icon">👥</div>
                            <div class="stat-info">
                                <h3 data-lang="active-users">کاربران فعال</h3>
                                <div class="stat-value" id="activeUsers">0</div>
                                <div class="stat-change" id="usersChange">+0</div>
                            </div>
                        </div>
                    </div>

                    <!-- Platform Token Info -->
                    <div class="platform-token-section glass-effect">
                        <h3>
                            <i class="fas fa-coins"></i>
                            <span data-lang="pxp-token-metrics">معیارهای توکن PXP</span>
                        </h3>
                        <div class="token-metrics-grid">
                            <div class="metric-item">
                                <span data-lang="current-price">قیمت فعلی:</span>
                                <strong id="pxpPrice">$0.000000</strong>
                            </div>
                            <div class="metric-item">
                                <span data-lang="market-cap">ارزش بازار:</span>
                                <strong id="pxpMarketCap">$0</strong>
                            </div>
                            <div class="metric-item">
                                <span data-lang="circulating-supply">عرضه در گردش:</span>
                                <strong id="pxpCirculating">600,000,000 PXP</strong>
                            </div>
                            <div class="metric-item">
                                <span data-lang="daily-volume">حجم روزانه:</span>
                                <strong id="pxpDailyVolume">0 PXP</strong>
                            </div>
                        </div>
                    </div>

                    <!-- Profit Breakdown -->
                    <div class="profit-breakdown glass-effect">
                        <h3>
                            <i class="fas fa-pie-chart"></i>
                            <span data-lang="profit-breakdown">تفکیک سود</span>
                        </h3>
                        <div class="breakdown-grid">
                            <div class="breakdown-item">
                                <div class="breakdown-label">
                                    <i class="fas fa-magic"></i>
                                    <span data-lang="token-creation-fees">کارمزد ساخت توکن</span>
                                </div>
                                <div class="breakdown-value" id="tokenCreationProfits">0.0000 SOL</div>
                            </div>
                            <div class="breakdown-item">
                                <div class="breakdown-label">
                                    <i class="fas fa-exchange-alt"></i>
                                    <span data-lang="trading-commissions">کمیسیون معاملات</span>
                                </div>
                                <div class="breakdown-value" id="tradingProfits">0.0000 SOL</div>
                            </div>
                            <div class="breakdown-item">
                                <div class="breakdown-label">
                                    <i class="fas fa-sync-alt"></i>
                                    <span data-lang="conversion-fees">کارمزد تبدیل</span>
                                </div>
                                <div class="breakdown-value" id="conversionProfits">0.0000 SOL</div>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Transactions -->
                    <div class="recent-transactions glass-effect">
                        <h3>
                            <i class="fas fa-history"></i>
                            <span data-lang="recent-transactions">تراکنش‌های اخیر</span>
                        </h3>
                        <div class="transactions-list" id="recentTransactionsList">
                            <!-- Transactions will be populated here -->
                        </div>
                    </div>

                    <!-- Platform Wallet Info -->
                    <div class="platform-wallet glass-effect">
                        <h3>
                            <i class="fas fa-wallet"></i>
                            <span data-lang="platform-wallet">کیف پول پلتفرم</span>
                        </h3>
                        <div class="wallet-info">
                            <div class="wallet-address">
                                <span data-lang="address">آدرس:</span>
                                <code id="platformWalletAddress">Fro4991MZF5ka11jBumRZZWtk4S8svrmbuNe46BVpYJA</code>
                                <button onclick="copyPlatformAddress()" class="copy-btn">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                            <div class="wallet-balance">
                                <span data-lang="balance">موجودی:</span>
                                <strong id="platformWalletBalance">0.0000 SOL</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add dashboard to body
        document.body.insertAdjacentHTML('beforeend', dashboardHTML);
        
        // Add dashboard styles
        this.addDashboardStyles();
    }

    // Add dashboard CSS styles
    addDashboardStyles() {
        const styles = `
            <style>
                .live-dashboard {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    z-index: 10000;
                    overflow-y: auto;
                    padding: 20px;
                }

                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                    padding: 20px;
                    background: linear-gradient(135deg, #1a1a2e, #16213e);
                    border-radius: 15px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .dashboard-header h2 {
                    color: #00d4ff;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    font-size: 1.8rem;
                }

                .live-indicator {
                    background: linear-gradient(45deg, #ff4444, #ff6b6b);
                    padding: 5px 10px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }

                .close-dashboard {
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    color: white;
                    padding: 10px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 18px;
                    transition: all 0.3s;
                }

                .close-dashboard:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: scale(1.1);
                }

                .dashboard-content {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .stat-card {
                    padding: 25px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    transition: transform 0.3s;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                }

                .stat-icon {
                    font-size: 3rem;
                    opacity: 0.8;
                }

                .stat-info h3 {
                    margin: 0 0 10px 0;
                    color: #00d4ff;
                    font-size: 1rem;
                }

                .stat-value {
                    font-size: 1.8rem;
                    font-weight: bold;
                    color: white;
                    margin-bottom: 5px;
                }

                .stat-change {
                    font-size: 0.9rem;
                    font-weight: bold;
                }

                .stat-change.positive {
                    color: #4ade80;
                }

                .stat-change.negative {
                    color: #ef4444;
                }

                .platform-token-section,
                .profit-breakdown,
                .recent-transactions,
                .platform-wallet {
                    margin-bottom: 30px;
                    padding: 25px;
                }

                .platform-token-section h3,
                .profit-breakdown h3,
                .recent-transactions h3,
                .platform-wallet h3 {
                    color: #00d4ff;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .token-metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 15px;
                }

                .metric-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    background: rgba(0, 212, 255, 0.1);
                    border-radius: 10px;
                    border: 1px solid rgba(0, 212, 255, 0.3);
                }

                .breakdown-grid {
                    display: grid;
                    gap: 15px;
                }

                .breakdown-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .breakdown-label {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #ffffff;
                }

                .breakdown-value {
                    font-weight: bold;
                    color: #4ade80;
                }

                .transactions-list {
                    max-height: 300px;
                    overflow-y: auto;
                }

                .transaction-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px;
                    margin-bottom: 8px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    border-left: 3px solid #00d4ff;
                }

                .transaction-type {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: bold;
                }

                .transaction-amount {
                    color: #4ade80;
                    font-weight: bold;
                }

                .transaction-time {
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.6);
                }

                .wallet-info {
                    display: grid;
                    gap: 15px;
                }

                .wallet-address {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 15px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }

                .wallet-address code {
                    background: rgba(0, 0, 0, 0.3);
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-family: monospace;
                    font-size: 0.9rem;
                    flex: 1;
                }

                .copy-btn {
                    background: linear-gradient(45deg, #00d4ff, #0099cc);
                    border: none;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .copy-btn:hover {
                    transform: scale(1.05);
                }

                .wallet-balance {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    background: rgba(74, 222, 128, 0.1);
                    border-radius: 10px;
                    border: 1px solid rgba(74, 222, 128, 0.3);
                }

                @media (max-width: 768px) {
                    .live-dashboard {
                        padding: 10px;
                    }
                    
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .token-metrics-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .stat-card {
                        padding: 20px;
                    }
                    
                    .dashboard-header h2 {
                        font-size: 1.4rem;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    // Setup event listeners
    setupEventListeners() {
        // Listen for profit updates
        window.addEventListener('profitUpdate', (event) => {
            this.handleProfitUpdate(event.detail);
        });

        // Listen for daily reset
        window.addEventListener('dailyReset', (event) => {
            this.handleDailyReset(event.detail);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
    }

    // Show dashboard
    show() {
        const dashboard = document.getElementById('liveDashboard');
        if (dashboard) {
            dashboard.style.display = 'block';
            this.isVisible = true;
            this.startRealTimeUpdates();
            this.updateDashboard();
        }
    }

    // Hide dashboard
    hide() {
        const dashboard = document.getElementById('liveDashboard');
        if (dashboard) {
            dashboard.style.display = 'none';
            this.isVisible = false;
            this.stopRealTimeUpdates();
        }
    }

    // Start real-time updates
    startRealTimeUpdates() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        this.intervalId = setInterval(() => {
            this.updateDashboard();
        }, this.updateInterval);
    }

    // Stop real-time updates
    stopRealTimeUpdates() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    // Update dashboard data
    async updateDashboard() {
        try {
            if (!this.profitManagement) return;

            const dashboardData = this.profitManagement.getDashboardData();
            
            // Update stats
            this.updateStats(dashboardData);
            
            // Update platform token metrics
            this.updatePlatformTokenMetrics(dashboardData.platformToken);
            
            // Update profit breakdown
            this.updateProfitBreakdown(dashboardData.breakdown);
            
            // Update recent transactions
            this.updateRecentTransactions(dashboardData.recentTransactions);
            
            // Update platform wallet info
            await this.updatePlatformWalletInfo();
            
        } catch (error) {
            console.error('Dashboard update failed:', error);
        }
    }

    // Update statistics
    updateStats(data) {
        // Total profits
        const totalProfitsEl = document.getElementById('totalProfits');
        if (totalProfitsEl) {
            totalProfitsEl.textContent = `${data.summary.totalEarned.toFixed(4)} SOL`;
        }

        // Tokens created (simulated)
        const tokensCreatedEl = document.getElementById('tokensCreated');
        if (tokensCreatedEl) {
            const tokensCount = Math.floor(data.summary.totalEarned / 0.01); // Based on creation fee
            tokensCreatedEl.textContent = tokensCount.toString();
        }

        // Trading volume
        const tradingVolumeEl = document.getElementById('tradingVolume');
        if (tradingVolumeEl) {
            const volume = data.breakdown.trading.total / 0.01; // Estimate from commissions
            tradingVolumeEl.textContent = `${volume.toFixed(4)} SOL`;
        }

        // Active users (simulated)
        const activeUsersEl = document.getElementById('activeUsers');
        if (activeUsersEl) {
            const users = Math.floor(Math.random() * 100) + 50;
            activeUsersEl.textContent = users.toString();
        }
    }

    // Update platform token metrics
    updatePlatformTokenMetrics(tokenData) {
        const priceEl = document.getElementById('pxpPrice');
        if (priceEl) {
            priceEl.textContent = `$${tokenData.currentPrice.toFixed(8)}`;
        }

        const marketCapEl = document.getElementById('pxpMarketCap');
        if (marketCapEl) {
            marketCapEl.textContent = `$${tokenData.marketCap.toFixed(2)}`;
        }

        const dailyVolumeEl = document.getElementById('pxpDailyVolume');
        if (dailyVolumeEl) {
            dailyVolumeEl.textContent = `${tokenData.dailyVolume.toFixed(0)} PXP`;
        }
    }

    // Update profit breakdown
    updateProfitBreakdown(breakdown) {
        const tokenCreationEl = document.getElementById('tokenCreationProfits');
        if (tokenCreationEl) {
            tokenCreationEl.textContent = `${breakdown.tokenCreation.total.toFixed(4)} SOL`;
        }

        const tradingEl = document.getElementById('tradingProfits');
        if (tradingEl) {
            tradingEl.textContent = `${breakdown.trading.total.toFixed(4)} SOL`;
        }

        const conversionEl = document.getElementById('conversionProfits');
        if (conversionEl) {
            conversionEl.textContent = `${breakdown.conversion.total.toFixed(4)} SOL`;
        }
    }

    // Update recent transactions
    updateRecentTransactions(transactions) {
        const listEl = document.getElementById('recentTransactionsList');
        if (!listEl || !transactions) return;

        const transactionsHTML = transactions.map(tx => {
            const typeIcons = {
                tokenCreation: '🏭',
                trading: '📊',
                conversion: '🔄'
            };

            const typeNames = {
                tokenCreation: 'ساخت توکن',
                trading: 'معاملات',
                conversion: 'تبدیل'
            };

            return `
                <div class="transaction-item">
                    <div class="transaction-type">
                        <span>${typeIcons[tx.type]}</span>
                        <span>${typeNames[tx.type]}</span>
                        <small>${tx.user}</small>
                    </div>
                    <div class="transaction-amount">+${tx.amount.toFixed(4)} SOL</div>
                    <div class="transaction-time">${new Date(tx.timestamp).toLocaleTimeString('fa-IR')}</div>
                </div>
            `;
        }).join('');

        listEl.innerHTML = transactionsHTML;
    }

    // Update platform wallet info
    async updatePlatformWalletInfo() {
        try {
            if (this.solanaIntegration && this.solanaIntegration.connection) {
                const walletPubkey = new solanaWeb3.PublicKey(this.profitManagement.PLATFORM_WALLET);
                const balance = await this.solanaIntegration.connection.getBalance(walletPubkey);
                const balanceInSol = balance / solanaWeb3.LAMPORTS_PER_SOL;

                const balanceEl = document.getElementById('platformWalletBalance');
                if (balanceEl) {
                    balanceEl.textContent = `${balanceInSol.toFixed(4)} SOL`;
                }
            }
        } catch (error) {
            console.error('Failed to update platform wallet balance:', error);
        }
    }

    // Handle profit update events
    handleProfitUpdate(detail) {
        if (this.isVisible) {
            this.updateDashboard();
        }
        
        // Add visual notification
        this.showProfitNotification(detail);
    }

    // Handle daily reset events
    handleDailyReset(detail) {
        if (this.isVisible) {
            this.updateDashboard();
        }
    }

    // Show profit notification
    showProfitNotification(detail) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(45deg, #4ade80, #22c55e);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10001;
            animation: slideIn 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            💰 سود جدید: +${detail.amount.toFixed(4)} SOL
            <br><small>کل سود: ${detail.totalEarned.toFixed(4)} SOL</small>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Load historical data
    loadHistoricalData() {
        // This would typically load from a database
        // For now, we'll generate some sample historical data
        const days = 7;
        const today = new Date();
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            this.chartData.profits.push({
                date: date.toISOString().split('T')[0],
                value: Math.random() * 0.1
            });
            
            this.chartData.volume.push({
                date: date.toISOString().split('T')[0],
                value: Math.random() * 10
            });
            
            this.chartData.users.push({
                date: date.toISOString().split('T')[0],
                value: Math.floor(Math.random() * 50) + 20
            });
        }
    }
}

// Global functions for dashboard control
window.showLiveDashboard = function() {
    if (window.liveDashboard) {
        window.liveDashboard.show();
    }
};

window.closeLiveDashboard = function() {
    if (window.liveDashboard) {
        window.liveDashboard.hide();
    }
};

window.copyPlatformAddress = function() {
    const address = 'Fro4991MZF5ka11jBumRZZWtk4S8svrmbuNe46BVpYJA';
    navigator.clipboard.writeText(address).then(() => {
        if (window.showNotification) {
            window.showNotification('آدرس کپی شد!', 'success');
        }
    });
};

// Export for global use
if (typeof window !== 'undefined') {
    window.LiveDashboard = LiveDashboard;
}
