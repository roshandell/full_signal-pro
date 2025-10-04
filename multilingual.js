// Enhanced Multilingual Support System for PumpX Platform
// Comprehensive Persian and English language support with RTL/LTR handling

class MultilingualSystem {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'fa';
        this.supportedLanguages = ['fa', 'en'];
        this.translations = {};
        this.rtlLanguages = ['fa', 'ar', 'he'];
        this.callbacks = [];
        this.loadTranslations();
        this.initializeLanguageSystem();
    }

    // Load comprehensive translations
    loadTranslations() {
        this.translations = {
            fa: {
                // Navigation
                'nav-home': 'خانه',
                'nav-features': 'ویژگی‌ها',
                'nav-creator': 'ساخت توکن',
                'nav-trading': 'معاملات',
                'nav-ai': 'هوش مصنوعی',
                'nav-social': 'اجتماعی',
                'nav-dashboard': 'داشبورد زنده',
                'connect-wallet': 'اتصال کیف پول',

                // Hero Section
                'hero-subtitle': 'پلتفرم هوشمند ساخت و مدیریت توکن سولانا با قدرت هوش مصنوعی',
                'platform-description': 'PumpX اولین پلتفرم کاملاً هوشمند برای ساخت، مدیریت و معاملات توکن‌های سولانا است که با استفاده از هوش مصنوعی پیشرفته، تجربه‌ای بی‌نظیر از دنیای DeFi ارائه می‌دهد.',
                'viral-badge': '🔥 #1 پلتفرم وایرال توکن‌سازی با AI 🔥',
                'hero-main-subtitle': '🚀 پلتفرم انقلابی ساخت و مدیریت توکن سولانا با قدرت هوش مصنوعی<br>💎 معاملات زنده، درآمدزایی خودکار، و ویژگی‌های وایرال',

                // AI Status Indicator
                'ai-active': 'AI فعال',
                'ai-market-analysis': '🧠 تحلیل بازار: ',
                'ai-optimization': '🎯 بهینه‌سازی: ',
                'ai-prediction': '📈 پیش‌بینی: ',
                'status-active': 'فعال',

                // Token Information
                'token-name': 'نام توکن',
                'platform-token': 'توکن اختصاصی پلتفرم',
                'total-supply': 'کل عرضه',
                'one-billion': 'یک میلیارد توکن',
                'network': 'شبکه',
                'fast-cheap': 'سریع و کم هزینه',
                'token-type': 'نوع توکن',
                'solana-standard': 'استاندارد جدید سولانا',
                'usage': 'کاربرد',
                'fee-governance': 'پرداخت کارمزد و حکمرانی',
                'ai-powered': 'هوش مصنوعی',
                'smart-management': 'مدیریت هوشمند',

                // Live Trading Section
                'live-trading-title': '📊 معاملات زنده',
                'live-trading-subtitle': 'قیمت‌های لحظه‌ای ارزهای دیجیتال',
                'start-trading': '🚀 شروع معاملات',

                // AI Features Section
                'ai-features-title': '🤖 قدرت هوش مصنوعی',
                'ai-features-subtitle': 'تکنولوژی پیشرفته AI برای بهینه‌سازی و وایرال شدن',
                'ai-smart-analysis-title': 'تحلیل هوشمند بازار',
                'ai-smart-analysis-desc': 'تحلیل لحظه‌ای بازار، شناسایی ترندها، و پیش‌بینی قیمت با دقت بالا',
                'ai-auto-optimization-title': 'بهینه‌سازی خودکار',
                'ai-auto-optimization-desc': 'بهینه‌سازی خودکار پورتفولیو، مدیریت ریسک، و پیشنهادات سرمایه‌گذاری',
                'ai-viral-marketing-title': 'وایرال مارکتینگ',
                'ai-viral-marketing-desc': 'تولید محتوای وایرال، بهینه‌سازی شبکه‌های اجتماعی، و افزایش محبوبیت',
                'ai-smart-suggestions-title': 'پیشنهادات هوشمند',
                'ai-smart-suggestions-desc': 'پیشنهاد نام و نماد توکن، تحلیل رفتار کاربران، و بهینه‌سازی تجربه',
                'ai-advanced-security-title': 'امنیت پیشرفته',
                'ai-advanced-security-desc': 'تشخیص ریسک تراکنش‌ها، شناسایی تهدیدات، و محافظت از دارایی‌ها',
                'ai-trend-prediction-title': 'پیش‌بینی روند',
                'ai-trend-prediction-desc': 'پیش‌بینی روند بازار، تحلیل احساسات، و شناسایی فرصت‌های سرمایه‌گذاری',

                // Profit System Section
                'profit-system-title': '💰 سیستم درآمدزایی',
                'profit-system-subtitle': 'درآمد خودکار از ساخت توکن‌ها و معاملات کاربران',
                'step1-title': '1. ساخت توکن',
                'step1-desc': 'کاربران توکن می‌سازند',
                'step2-title': '2. دریافت کارمزد',
                'step2-desc': 'کارمزد به پلتفرم واریز می‌شود',
                'step3-title': '3. تبدیل خودکار',
                'step3-desc': 'توکن‌ها در صرافی تبدیل می‌شوند',
                'step4-title': '4. واریز سود',
                'step4-desc': 'سود به کیف پول Phantom واریز می‌شود',
                'profit-stats-title': '💎 آمار درآمدزایی',
                'profit-today': 'درآمد امروز',
                'tokens-created-stats': 'توکن ساخته شده',
                'success-rate': 'نرخ موفقیت',
                'active-users-stats': 'کاربران فعال',

                // Social Proof
                'social-proof-title': '🌟 اعتماد میلیون‌ها کاربر',
                'social-proof-subtitle': 'بیش از 25 هزار کاربر فعال و 1200 توکن موفق ساخته شده',
                'active-users-label': 'کاربران فعال',
                'tokens-created-label': 'توکن ساخته شده',
                'total-volume-label': 'حجم کل معاملات',
                'ai-accuracy-label': 'دقت پیش‌بینی AI',

                // CTA Section
                'cta-title': '🚀 آماده برای شروع انقلاب؟',
                'cta-subtitle': 'به بیش از 25 هزار کاربر بپیوندید و توکن خود را با هوش مصنوعی بسازید',
                'cta-create-token': '💎 ساخت توکن با AI',
                'cta-start-trading': '📊 شروع معاملات',
                'cta-view-dashboard': '🎯 مشاهده داشبورد',

                // Messages and Notifications
                'wallet-connected-success': '✅ کیف پول با موفقیت متصل شد!',
                'phantom-install-prompt': '❌ لطفاً کیف پول Phantom را نصب کنید',
                'wallet-connect-error': '❌ خطا در اتصال کیف پول',
                'trading-launching': '🚀 در حال راه‌اندازی پنل معاملات...',
                'prices-updated': '🔄 قیمت‌ها به‌روزرسانی شد',
                'welcome-message': '🎉 به PumpX خوش آمدید! پلتفرم هوشمند توکن‌سازی',

                // Footer
                'footer-text': 'تمامی حقوق محفوظ است. ساخته شده با ❤️ برای جامعه سولانا'
            },
            en: {
                // Navigation
                'nav-home': 'Home',
                'nav-features': 'Features',
                'nav-creator': 'Create Token',
                'nav-trading': 'Trading',
                'nav-ai': 'AI',
                'nav-social': 'Social',
                'nav-dashboard': 'Live Dashboard',
                'connect-wallet': 'Connect Wallet',

                // Hero Section
                'hero-subtitle': 'Smart Solana token creation and management platform powered by AI',
                'platform-description': 'PumpX is the first fully intelligent platform for creating, managing and trading Solana tokens that provides an unparalleled DeFi experience using advanced artificial intelligence.',
                'viral-badge': '🔥 #1 Viral AI Token Platform 🔥',
                'hero-main-subtitle': '🚀 Revolutionary Solana token creation & management platform powered by AI<br>💎 Live trading, automated monetization, and viral features',

                // AI Status Indicator
                'ai-active': 'AI Active',
                'ai-market-analysis': '🧠 Market Analysis: ',
                'ai-optimization': '🎯 Optimization: ',
                'ai-prediction': '📈 Prediction: ',
                'status-active': 'Active',

                // Token Information
                'token-name': 'Token Name',
                'platform-token': 'Platform Token',
                'total-supply': 'Total Supply',
                'one-billion': 'One billion tokens',
                'network': 'Network',
                'fast-cheap': 'Fast and cheap',
                'token-type': 'Token Type',
                'solana-standard': 'New Solana standard',
                'usage': 'Usage',
                'fee-governance': 'Fee payment and governance',
                'ai-powered': 'AI Powered',
                'smart-management': 'Smart management',

                // Live Trading Section
                'live-trading-title': '📊 Live Trading',
                'live-trading-subtitle': 'Real-time cryptocurrency prices',
                'start-trading': '🚀 Start Trading',

                // AI Features Section
                'ai-features-title': '🤖 Power of Artificial Intelligence',
                'ai-features-subtitle': 'Advanced AI technology for optimization and virality',
                'ai-smart-analysis-title': 'Smart Market Analysis',
                'ai-smart-analysis-desc': 'Real-time market analysis, trend identification, and high-accuracy price prediction',
                'ai-auto-optimization-title': 'Automated Optimization',
                'ai-auto-optimization-desc': 'Automated portfolio optimization, risk management, and investment suggestions',
                'ai-viral-marketing-title': 'Viral Marketing',
                'ai-viral-marketing-desc': 'Viral content generation, social media optimization, and popularity growth',
                'ai-smart-suggestions-title': 'Smart Suggestions',
                'ai-smart-suggestions-desc': 'Token name and symbol suggestions, user behavior analysis, and experience optimization',
                'ai-advanced-security-title': 'Advanced Security',
                'ai-advanced-security-desc': 'Transaction risk detection, threat identification, and asset protection',
                'ai-trend-prediction-title': 'Trend Prediction',
                'ai-trend-prediction-desc': 'Market trend prediction, sentiment analysis, and investment opportunity identification',

                // Profit System Section
                'profit-system-title': '💰 Monetization System',
                'profit-system-subtitle': 'Automated income from token creation and user transactions',
                'step1-title': '1. Token Creation',
                'step1-desc': 'Users create tokens',
                'step2-title': '2. Fee Collection',
                'step2-desc': 'Fees are deposited to the platform',
                'step3-title': '3. Automated Conversion',
                'step3-desc': 'Tokens are converted on exchange',
                'step4-title': '4. Profit Deposit',
                'step4-desc': 'Profits are deposited to Phantom wallet',
                'profit-stats-title': '💎 Monetization Statistics',
                'profit-today': 'Today\'s Profit',
                'tokens-created-stats': 'Tokens Created',
                'success-rate': 'Success Rate',
                'active-users-stats': 'Active Users',

                // Social Proof
                'social-proof-title': '🌟 Trusted by Millions',
                'social-proof-subtitle': 'Over 25k active users and 1200 successful tokens created',
                'active-users-label': 'Active Users',
                'tokens-created-label': 'Tokens Created',
                'total-volume-label': 'Total Trading Volume',
                'ai-accuracy-label': 'AI Prediction Accuracy',

                // CTA Section
                'cta-title': '🚀 Ready to Start the Revolution?',
                'cta-subtitle': 'Join over 25k users and create your token with AI',
                'cta-create-token': '💎 Create Token with AI',
                'cta-start-trading': '📊 Start Trading',
                'cta-view-dashboard': '🎯 View Dashboard',

                // Messages and Notifications
                'wallet-connected-success': '✅ Wallet connected successfully!',
                'phantom-install-prompt': '❌ Please install Phantom wallet',
                'wallet-connect-error': '❌ Error connecting wallet',
                'trading-launching': '🚀 Launching trading panel...',
                'prices-updated': '🔄 Prices updated',
                'welcome-message': '🎉 Welcome to PumpX! Smart Token Creation Platform',

                // Footer
                'footer-text': 'All rights reserved. Made with ❤️ for the Solana community'
            }
        };
    }

    initializeLanguageSystem() {
        document.documentElement.setAttribute('lang', this.currentLanguage);
        document.documentElement.setAttribute('dir', this.rtlLanguages.includes(this.currentLanguage) ? 'rtl' : 'ltr');
        this.applyTranslations();
    }

    setLanguage(lang) {
        if (this.supportedLanguages.includes(lang)) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            this.initializeLanguageSystem();
            this.callbacks.forEach(callback => callback(lang));
        }
    }

    getTranslation(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    applyTranslations() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.innerHTML = this.getTranslation(key);
        });

        // Update specific elements that might not use data-translate
        document.title = this.getTranslation('PumpX - پلتفرم هوشمند ساخت و مدیریت توکن سولانا با AI'); // Update title
        document.querySelector('meta[name="description"]').setAttribute('content', this.getTranslation('hero-main-subtitle'));
        document.querySelector('meta[property="og:description"]').setAttribute('content', this.getTranslation('hero-main-subtitle'));
        document.querySelector('meta[name="twitter:description"]').setAttribute('content', this.getTranslation('hero-main-subtitle'));

        // Update navigation links
        document.querySelector('.nav-menu a[href="#home"]').innerHTML = this.getTranslation('nav-home');
        document.querySelector('.nav-menu a[href="#features"]').innerHTML = this.getTranslation('nav-features');
        document.querySelector('.nav-menu a[href="#create-token"]').innerHTML = this.getTranslation('nav-creator');
        document.querySelector('.nav-menu a[href="#trading"]').innerHTML = this.getTranslation('nav-trading');
        document.querySelector('.nav-menu a[href="#ai"]').innerHTML = this.getTranslation('nav-ai');
        document.querySelector('.nav-menu a[href="#social"]').innerHTML = this.getTranslation('nav-social');
        document.querySelector('.nav-menu a[href="#dashboard"]').innerHTML = this.getTranslation('nav-dashboard');
        document.querySelector('.wallet-connect').innerHTML = `<i class="fas fa-wallet"></i> ${this.getTranslation('connect-wallet')}`;

        // Update hero section
        document.querySelector('.viral-badge').innerHTML = this.getTranslation('viral-badge');
        document.querySelector('.hero-subtitle').innerHTML = this.getTranslation('hero-main-subtitle');

        // Update AI status indicator
        document.querySelector('.ai-status span').innerHTML = this.getTranslation('ai-active');
        document.querySelector('.ai-status div:nth-child(2) div:nth-child(1)').innerHTML = this.getTranslation('ai-market-analysis') + `<span style="color: #00ff88;">${this.getTranslation('status-active')}</span>`;
        document.querySelector('.ai-status div:nth-child(2) div:nth-child(2)').innerHTML = this.getTranslation('ai-optimization') + `<span style="color: #00ff88;">${this.getTranslation('status-active')}</span>`;
        document.querySelector('.ai-status div:nth-child(2) div:nth-child(3)').innerHTML = this.getTranslation('ai-prediction') + `<span style="color: #00ff88;">${this.getTranslation('status-active')}</span>`;

        // Update token stats
        document.querySelector('.token-stats div:nth-child(1) .stat-title').innerHTML = this.getTranslation('token-name');
        document.querySelector('.token-stats div:nth-child(1) .stat-description').innerHTML = this.getTranslation('platform-token');
        document.querySelector('.token-stats div:nth-child(2) .stat-title').innerHTML = this.getTranslation('total-supply');
        document.querySelector('.token-stats div:nth-child(2) .stat-description').innerHTML = this.getTranslation('one-billion');
        document.querySelector('.token-stats div:nth-child(3) .stat-title').innerHTML = this.getTranslation('network');
        document.querySelector('.token-stats div:nth-child(3) .stat-description').innerHTML = this.getTranslation('fast-cheap');
        document.querySelector('.token-stats div:nth-child(4) .stat-title').innerHTML = this.getTranslation('token-type');
        document.querySelector('.token-stats div:nth-child(4) .stat-description').innerHTML = this.getTranslation('solana-standard');
        document.querySelector('.token-stats div:nth-child(5) .stat-title').innerHTML = this.getTranslation('usage');
        document.querySelector('.token-stats div:nth-child(5) .stat-description').innerHTML = this.getTranslation('fee-governance');
        document.querySelector('.token-stats div:nth-child(6) .stat-title').innerHTML = this.getTranslation('ai-powered');
        document.querySelector('.token-stats div:nth-child(6) .stat-description').innerHTML = this.getTranslation('smart-management');

        // Update live trading section
        document.querySelector('.trading-title').innerHTML = this.getTranslation('live-trading-title');
        document.querySelector('.trading-section p').innerHTML = this.getTranslation('live-trading-subtitle');
        document.querySelector('.trading-section .cta-button').innerHTML = this.getTranslation('start-trading');

        // Update AI features section
        document.querySelector('.ai-features .ai-title').innerHTML = this.getTranslation('ai-features-title');
        document.querySelector('.ai-features p').innerHTML = this.getTranslation('ai-features-subtitle');
        document.querySelector('.ai-grid div:nth-child(1) .ai-card-title').innerHTML = this.getTranslation('ai-smart-analysis-title');
        document.querySelector('.ai-grid div:nth-child(1) .ai-card-description').innerHTML = this.getTranslation('ai-smart-analysis-desc');
        document.querySelector('.ai-grid div:nth-child(2) .ai-card-title').innerHTML = this.getTranslation('ai-auto-optimization-title');
        document.querySelector('.ai-grid div:nth-child(2) .ai-card-description').innerHTML = this.getTranslation('ai-auto-optimization-desc');
        document.querySelector('.ai-grid div:nth-child(3) .ai-card-title').innerHTML = this.getTranslation('ai-viral-marketing-title');
        document.querySelector('.ai-grid div:nth-child(3) .ai-card-description').innerHTML = this.getTranslation('ai-viral-marketing-desc');
        document.querySelector('.ai-grid div:nth-child(4) .ai-card-title').innerHTML = this.getTranslation('ai-smart-suggestions-title');
        document.querySelector('.ai-grid div:nth-child(4) .ai-card-description').innerHTML = this.getTranslation('ai-smart-suggestions-desc');
        document.querySelector('.ai-grid div:nth-child(5) .ai-card-title').innerHTML = this.getTranslation('ai-advanced-security-title');
        document.querySelector('.ai-grid div:nth-child(5) .ai-card-description').innerHTML = this.getTranslation('ai-advanced-security-desc');
        document.querySelector('.ai-grid div:nth-child(6) .ai-card-title').innerHTML = this.getTranslation('ai-trend-prediction-title');
        document.querySelector('.ai-grid div:nth-child(6) .ai-card-description').innerHTML = this.getTranslation('ai-trend-prediction-desc');

        // Update profit system section
        document.querySelector('.profit-system .profit-title').innerHTML = this.getTranslation('profit-system-title');
        document.querySelector('.profit-system p').innerHTML = this.getTranslation('profit-system-subtitle');
        document.querySelector('.profit-flow div:nth-child(1) h4').innerHTML = this.getTranslation('step1-title');
        document.querySelector('.profit-flow div:nth-child(1) p').innerHTML = this.getTranslation('step1-desc');
        document.querySelector('.profit-flow div:nth-child(3) h4').innerHTML = this.getTranslation('step2-title');
        document.querySelector('.profit-flow div:nth-child(3) p').innerHTML = this.getTranslation('step2-desc');
        document.querySelector('.profit-flow div:nth-child(5) h4').innerHTML = this.getTranslation('step3-title');
        document.querySelector('.profit-flow div:nth-child(5) p').innerHTML = this.getTranslation('step3-desc');
        document.querySelector('.profit-flow div:nth-child(7) h4').innerHTML = this.getTranslation('step4-title');
        document.querySelector('.profit-flow div:nth-child(7) p').innerHTML = this.getTranslation('step4-desc');
        document.querySelector('.profit-system div:nth-child(3) h4').innerHTML = this.getTranslation('profit-stats-title');
        document.querySelector('.profit-system div:nth-child(3) div:nth-child(2) div:nth-child(1) div:nth-child(2)').innerHTML = this.getTranslation('profit-today');
        document.querySelector('.profit-system div:nth-child(3) div:nth-child(2) div:nth-child(2) div:nth-child(2)').innerHTML = this.getTranslation('tokens-created-stats');
        document.querySelector('.profit-system div:nth-child(3) div:nth-child(2) div:nth-child(3) div:nth-child(2)').innerHTML = this.getTranslation('success-rate');
        document.querySelector('.profit-system div:nth-child(3) div:nth-child(2) div:nth-child(4) div:nth-child(2)').innerHTML = this.getTranslation('active-users-stats');

        // Update social proof
        document.querySelector('.social-proof h2').innerHTML = this.getTranslation('social-proof-title');
        document.querySelector('.social-proof p').innerHTML = this.getTranslation('social-proof-subtitle');
        document.querySelector('.stats-grid div:nth-child(1) .stat-label').innerHTML = this.getTranslation('active-users-label');
        document.querySelector('.stats-grid div:nth-child(2) .stat-label').innerHTML = this.getTranslation('tokens-created-label');
        document.querySelector('.stats-grid div:nth-child(3) .stat-label').innerHTML = this.getTranslation('total-volume-label');
        document.querySelector('.stats-grid div:nth-child(4) .stat-label').innerHTML = this.getTranslation('ai-accuracy-label');

        // Update CTA section
        document.querySelector('.cta-section h2').innerHTML = this.getTranslation('cta-title');
        document.querySelector('.cta-section p').innerHTML = this.getTranslation('cta-subtitle');
        document.querySelector('.cta-section a:nth-child(3)').innerHTML = this.getTranslation('cta-create-token');
        document.querySelector('.cta-section a:nth-child(4)').innerHTML = this.getTranslation('cta-start-trading');
        document.querySelector('.cta-section a:nth-child(5)').innerHTML = this.getTranslation('cta-view-dashboard');

        // Update footer
        // Assuming footer is not using data-translate for now, if it does, add it here.
    }

    // Register a callback function to be called when the language changes
    onLanguageChange(callback) {
        this.callbacks.push(callback);
    }
}

const multilingual = new MultilingualSystem();

// Expose setLanguage globally for language buttons
window.setLanguage = (lang) => {
    multilingual.setLanguage(lang);
    // Re-apply translations to dynamic content if needed
    // For example, if you have content loaded after initial page load
    // you might need to call multilingual.applyTranslations() again.
};

// Add event listeners to language buttons (assuming they have IDs like 'lang-fa' and 'lang-en')
document.addEventListener('DOMContentLoaded', () => {
    const faButton = document.getElementById('lang-fa');
    const enButton = document.getElementById('lang-en');

    if (faButton) {
        faButton.addEventListener('click', () => multilingual.setLanguage('fa'));
    }
    if (enButton) {
        enButton.addEventListener('click', () => multilingual.setLanguage('en'));
    }
});

