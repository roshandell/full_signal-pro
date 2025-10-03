// Enhanced Multilingual Support System for PumpX Platform
// Comprehensive Persian and English language support with RTL/LTR handling

class MultilingualSystem {
    constructor() {
        this.currentLanguage = 'fa';
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

                // Contract Information
                'contract-info': 'اطلاعات قرارداد PXP',
                'contract-address': 'آدرس قرارداد',
                'decimals': 'اعشار',
                'high-precision': 'دقت بالا در معاملات',
                'status': 'وضعیت',
                'active': 'فعال',
                'ready-trading': 'آماده برای معاملات',

                // Wallet Information
                'wallet-info': 'اطلاعات کیف پول',
                'sol-balance': 'موجودی SOL:',
                'pxp-balance': 'موجودی PXP:',
                'wallet-address': 'آدرس کیف پول:',
                'wallet-connected': 'کیف پول متصل شد',
                'wallet-disconnected': 'کیف پول قطع شد',

                // Token Creator
                'ai-token-creator': 'ساخت توکن با هوش مصنوعی',
                'token-name-label': 'نام توکن:',
                'token-name-placeholder': 'مثال: MyAwesomeToken',
                'token-symbol-label': 'نماد توکن:',
                'token-symbol-placeholder': 'مثال: MAT',
                'token-supply-label': 'کل عرضه:',
                'token-supply-placeholder': '1000000',
                'token-description-label': 'توضیحات:',
                'token-description-placeholder': 'توضیح کوتاهی از توکن شما...',
                'icon-upload-label': 'آپلود آیکون توکن:',
                'drag-drop-icon': 'کلیک کنید یا فایل را بکشید',
                'supported-formats': 'فرمت‌های پشتیبانی شده: PNG, JPG, SVG',

                // AI Features
                'ai-suggestions': 'پیشنهادات هوش مصنوعی',
                'generating-suggestions': 'در حال تولید پیشنهادات...',
                'ai-optimization': 'بهینه‌سازی با AI',
                'ai-analysis': 'تحلیل هوشمند',
                'ai-security-check': 'بررسی امنیت با AI',

                // Fees and Costs
                'creation-fees': 'هزینه‌های ساخت',
                'solana-fee': 'هزینه شبکه سولانا:',
                'platform-fee': 'کارمزد پلتفرم:',
                'total-fee': 'مجموع:',
                'fee-note': 'کارمزد به کیف پول پلتفرم واریز می‌شود',
                'create-token': 'ساخت توکن روی سولانا',

                // Features
                'real-token-creation': 'ساخت توکن واقعی روی سولانا',
                'solana-sdk': 'استفاده از Solana SDK',
                'token-metadata': 'ساخت توکن با متادیتا',
                'blockchain-storage': 'ذخیره در بلاک‌چین',
                'wallet-display': 'نمایش توکن در کیف‌پول',
                'live-trading': 'خرید، فروش و تبدیل توکن‌ها',
                'dex-connection': 'اتصال به Jupiter DEX',
                'real-time-conversion': 'تبدیل با نرخ لحظه‌ای',
                'ai-trading-tips': 'پیشنهاد بهترین زمان معامله',
                'volatility-alerts': 'هشدار نوسانات شدید',

                // Portfolio Management
                'ai-portfolio': 'مدیریت پورتفولیو با AI',
                'auto-analysis': 'تحلیل خودکار پورتفولیو',
                'optimization-suggestions': 'پیشنهادات بهینه‌سازی',
                'risk-alerts': 'هشدارهای ریسک',
                'analytical-reports': 'گزارش‌های تحلیلی',

                // Market Analytics
                'advanced-analytics': 'تحلیل‌های پیشرفته بازار',
                'technical-charts': 'نمودارهای تکنیکال',
                'market-indicators': 'شاخص‌های بازار',
                'ai-price-prediction': 'پیش‌بینی قیمت با AI',
                'sentiment-analysis': 'تحلیل احساسات بازار',

                // Basic Features
                'basic-features': 'ویژگی‌های پایه',
                'live-prices': 'مشاهده قیمت‌های زنده',
                'token-info': 'اطلاعات عمومی توکن‌ها',
                'free-tutorials': 'آموزش‌های رایگان',
                'support-24-7': 'پشتیبانی 24/7',

                // Social Features
                'social-features': 'ویژگی‌های اجتماعی',
                'social-sharing': 'اشتراک‌گذاری در شبکه‌ها',
                'official-channels': 'عضویت در کانال‌های رسمی',
                'news-updates': 'دریافت اخبار و به‌روزرسانی',
                'community-connection': 'ارتباط با جامعه',

                // AI Everywhere
                'ai-everywhere': 'هوش مصنوعی در همه بخش‌ها',
                'ai-name-suggestion': 'پیشنهاد نام و نماد توکن',
                'ai-behavior-analysis': 'تحلیل رفتار کاربران',
                'ai-risk-detection': 'تشخیص ریسک تراکنش‌ها',
                'ai-viral-content': 'تولید محتوا برای وایرال شدن',
                'ai-learning': 'یادگیری از داده‌های کاربران',
                'ai-market-prediction': 'پیش‌بینی روند بازار',

                // Trading Center
                'trading-center': 'مرکز معاملات PXP',
                'current-price': 'قیمت فعلی PXP',
                '24h-change': 'تغییرات 24 ساعته:',
                'buy': 'خرید',
                'sell': 'فروش',
                'convert': 'تبدیل',
                'swap': 'مبادله',

                // Market Stats
                'market-stats': 'آمار بازار',
                '24h-volume': 'حجم معاملات 24h:',
                'highest-price': 'بالاترین قیمت:',
                'lowest-price': 'پایین‌ترین قیمت:',
                'holders-count': 'تعداد نگهدارندگان:',
                'view-explorer': 'مشاهده در Solana Explorer',

                // Dashboard Stats
                'active-users': 'کاربران فعال',
                'tokens-created': 'توکن ساخته شده',
                'total-volume': 'حجم کل معاملات',
                'ai-accuracy': 'دقت پیش‌بینی AI',
                'total-profits': 'کل سود',
                'trading-volume': 'حجم معاملات',

                // Live Dashboard
                'live-dashboard': 'داشبورد زنده پلتفرم',
                'pxp-token-metrics': 'معیارهای توکن PXP',
                'current-price': 'قیمت فعلی:',
                'market-cap': 'ارزش بازار:',
                'circulating-supply': 'عرضه در گردش:',
                'daily-volume': 'حجم روزانه:',
                'profit-breakdown': 'تفکیک سود',
                'token-creation-fees': 'کارمزد ساخت توکن',
                'trading-commissions': 'کمیسیون معاملات',
                'conversion-fees': 'کارمزد تبدیل',
                'recent-transactions': 'تراکنش‌های اخیر',
                'platform-wallet': 'کیف پول پلتفرم',
                'address': 'آدرس:',
                'balance': 'موجودی:',

                // Community
                'join-community': 'به جامعه PumpX بپیوندید',
                'community-description': 'با هزاران کاربر دیگر در ارتباط باشید و از آخرین اخبار و به‌روزرسانی‌ها مطلع شوید',

                // Footer
                'all-rights-reserved': 'تمامی حقوق محفوظ است.',
                'made-with-love': 'ساخته شده با ❤️ برای جامعه سولانا',

                // Messages and Notifications
                'wallet-connect-first': 'ابتدا کیف پول خود را متصل کنید',
                'insufficient-sol': 'موجودی SOL کافی نیست',
                'insufficient-pxp': 'موجودی PXP کافی نیست',
                'fill-required-fields': 'لطفاً تمام فیلدهای ضروری را پر کنید',
                'token-created-success': 'توکن با موفقیت ساخته شد!',
                'trade-success': 'معامله با موفقیت انجام شد',
                'address-copied': 'آدرس کپی شد!',
                'welcome-message': 'به PumpX خوش آمدید! پلتفرم کامل ساخت و مدیریت توکن با هوش مصنوعی',

                // Error Messages
                'connection-error': 'خطا در اتصال',
                'transaction-failed': 'تراکنش ناموفق',
                'network-error': 'خطای شبکه',
                'unknown-error': 'خطای نامشخص',

                // Time and Date
                'today': 'امروز',
                'yesterday': 'دیروز',
                'this-week': 'این هفته',
                'this-month': 'این ماه',
                'loading': 'در حال بارگذاری...',
                'processing': 'در حال پردازش...',
                'completed': 'تکمیل شد',
                'pending': 'در انتظار',
                'confirmed': 'تأیید شد'
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

                // Contract Information
                'contract-info': 'PXP Contract Information',
                'contract-address': 'Contract Address',
                'decimals': 'Decimals',
                'high-precision': 'High precision trading',
                'status': 'Status',
                'active': 'Active',
                'ready-trading': 'Ready for trading',

                // Wallet Information
                'wallet-info': 'Wallet Information',
                'sol-balance': 'SOL Balance:',
                'pxp-balance': 'PXP Balance:',
                'wallet-address': 'Wallet Address:',
                'wallet-connected': 'Wallet connected',
                'wallet-disconnected': 'Wallet disconnected',

                // Token Creator
                'ai-token-creator': 'AI Token Creator',
                'token-name-label': 'Token Name:',
                'token-name-placeholder': 'e.g., MyAwesomeToken',
                'token-symbol-label': 'Token Symbol:',
                'token-symbol-placeholder': 'e.g., MAT',
                'token-supply-label': 'Total Supply:',
                'token-supply-placeholder': '1000000',
                'token-description-label': 'Description:',
                'token-description-placeholder': 'Brief description of your token...',
                'icon-upload-label': 'Upload Token Icon:',
                'drag-drop-icon': 'Click or drag file here',
                'supported-formats': 'Supported formats: PNG, JPG, SVG',

                // AI Features
                'ai-suggestions': 'AI Suggestions',
                'generating-suggestions': 'Generating suggestions...',
                'ai-optimization': 'AI Optimization',
                'ai-analysis': 'Smart Analysis',
                'ai-security-check': 'AI Security Check',

                // Fees and Costs
                'creation-fees': 'Creation Fees',
                'solana-fee': 'Solana Network Fee:',
                'platform-fee': 'Platform Fee:',
                'total-fee': 'Total:',
                'fee-note': 'Fees are sent to platform wallet',
                'create-token': 'Create Token on Solana',

                // Features
                'real-token-creation': 'Real Token Creation on Solana',
                'solana-sdk': 'Using Solana SDK',
                'token-metadata': 'Token creation with metadata',
                'blockchain-storage': 'Blockchain storage',
                'wallet-display': 'Display token in wallet',
                'live-trading': 'Buy, sell and convert tokens',
                'dex-connection': 'Connect to Jupiter DEX',
                'real-time-conversion': 'Real-time conversion',
                'ai-trading-tips': 'AI trading suggestions',
                'volatility-alerts': 'Volatility alerts',

                // Portfolio Management
                'ai-portfolio': 'AI Portfolio Management',
                'auto-analysis': 'Automatic portfolio analysis',
                'optimization-suggestions': 'Optimization suggestions',
                'risk-alerts': 'Risk alerts',
                'analytical-reports': 'Analytical reports',

                // Market Analytics
                'advanced-analytics': 'Advanced Market Analytics',
                'technical-charts': 'Technical charts',
                'market-indicators': 'Market indicators',
                'ai-price-prediction': 'AI price prediction',
                'sentiment-analysis': 'Market sentiment analysis',

                // Basic Features
                'basic-features': 'Basic Features',
                'live-prices': 'Live price viewing',
                'token-info': 'General token information',
                'free-tutorials': 'Free tutorials',
                'support-24-7': '24/7 Support',

                // Social Features
                'social-features': 'Social Features',
                'social-sharing': 'Social media sharing',
                'official-channels': 'Join official channels',
                'news-updates': 'News and updates',
                'community-connection': 'Community connection',

                // AI Everywhere
                'ai-everywhere': 'AI in All Sections',
                'ai-name-suggestion': 'Token name and symbol suggestions',
                'ai-behavior-analysis': 'User behavior analysis',
                'ai-risk-detection': 'Transaction risk detection',
                'ai-viral-content': 'Viral content generation',
                'ai-learning': 'Learning from user data',
                'ai-market-prediction': 'Market trend prediction',

                // Trading Center
                'trading-center': 'PXP Trading Center',
                'current-price': 'Current PXP Price',
                '24h-change': '24h Change:',
                'buy': 'Buy',
                'sell': 'Sell',
                'convert': 'Convert',
                'swap': 'Swap',

                // Market Stats
                'market-stats': 'Market Stats',
                '24h-volume': '24h Volume:',
                'highest-price': 'Highest Price:',
                'lowest-price': 'Lowest Price:',
                'holders-count': 'Holders Count:',
                'view-explorer': 'View on Solana Explorer',

                // Dashboard Stats
                'active-users': 'Active Users',
                'tokens-created': 'Tokens Created',
                'total-volume': 'Total Volume',
                'ai-accuracy': 'AI Prediction Accuracy',
                'total-profits': 'Total Profits',
                'trading-volume': 'Trading Volume',

                // Live Dashboard
                'live-dashboard': 'Live Platform Dashboard',
                'pxp-token-metrics': 'PXP Token Metrics',
                'current-price': 'Current Price:',
                'market-cap': 'Market Cap:',
                'circulating-supply': 'Circulating Supply:',
                'daily-volume': 'Daily Volume:',
                'profit-breakdown': 'Profit Breakdown',
                'token-creation-fees': 'Token Creation Fees',
                'trading-commissions': 'Trading Commissions',
                'conversion-fees': 'Conversion Fees',
                'recent-transactions': 'Recent Transactions',
                'platform-wallet': 'Platform Wallet',
                'address': 'Address:',
                'balance': 'Balance:',

                // Community
                'join-community': 'Join PumpX Community',
                'community-description': 'Connect with thousands of other users and stay updated with the latest news',

                // Footer
                'all-rights-reserved': 'All rights reserved.',
                'made-with-love': 'Made with ❤️ for Solana community',

                // Messages and Notifications
                'wallet-connect-first': 'Please connect your wallet first',
                'insufficient-sol': 'Insufficient SOL balance',
                'insufficient-pxp': 'Insufficient PXP balance',
                'fill-required-fields': 'Please fill all required fields',
                'token-created-success': 'Token created successfully!',
                'trade-success': 'Trade completed successfully',
                'address-copied': 'Address copied!',
                'welcome-message': 'Welcome to PumpX! Complete AI-powered token creation and management platform',

                // Error Messages
                'connection-error': 'Connection error',
                'transaction-failed': 'Transaction failed',
                'network-error': 'Network error',
                'unknown-error': 'Unknown error',

                // Time and Date
                'today': 'Today',
                'yesterday': 'Yesterday',
                'this-week': 'This week',
                'this-month': 'This month',
                'loading': 'Loading...',
                'processing': 'Processing...',
                'completed': 'Completed',
                'pending': 'Pending',
                'confirmed': 'Confirmed'
            }
        };
    }

    // Initialize language system
    initializeLanguageSystem() {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0];
        const savedLang = localStorage.getItem('pumpx_language');
        
        // Set initial language
        this.currentLanguage = savedLang || (this.supportedLanguages.includes(browserLang) ? browserLang : 'fa');
        
        // Apply initial language
        this.applyLanguage(this.currentLanguage);
        
        console.log('Multilingual system initialized with language:', this.currentLanguage);
    }

    // Switch language
    switchLanguage(language) {
        if (!this.supportedLanguages.includes(language)) {
            console.warn('Unsupported language:', language);
            return;
        }

        this.currentLanguage = language;
        localStorage.setItem('pumpx_language', language);
        
        this.applyLanguage(language);
        this.notifyCallbacks(language);
    }

    // Apply language to the page
    applyLanguage(language) {
        // Set document attributes
        document.documentElement.lang = language;
        document.documentElement.dir = this.rtlLanguages.includes(language) ? 'rtl' : 'ltr';
        
        // Update language buttons
        this.updateLanguageButtons(language);
        
        // Update all translatable elements
        this.updateTranslatableElements(language);
        
        // Update placeholder texts
        this.updatePlaceholderTexts(language);
        
        // Update dynamic content
        this.updateDynamicContent(language);
        
        // Apply RTL/LTR specific styles
        this.applyDirectionalStyles(language);
    }

    // Update language buttons
    updateLanguageButtons(language) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[onclick="switchLanguage('${language}')"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    // Update translatable elements
    updateTranslatableElements(language) {
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            const translation = this.getTranslation(key, language);
            
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    // Update placeholder texts
    updatePlaceholderTexts(language) {
        document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
            const key = element.getAttribute('data-lang-placeholder');
            const translation = this.getTranslation(key, language);
            
            if (translation) {
                element.placeholder = translation;
            }
        });
    }

    // Update dynamic content
    updateDynamicContent(language) {
        // Update title attributes
        document.querySelectorAll('[data-lang-title]').forEach(element => {
            const key = element.getAttribute('data-lang-title');
            const translation = this.getTranslation(key, language);
            
            if (translation) {
                element.title = translation;
            }
        });

        // Update aria-label attributes
        document.querySelectorAll('[data-lang-aria]').forEach(element => {
            const key = element.getAttribute('data-lang-aria');
            const translation = this.getTranslation(key, language);
            
            if (translation) {
                element.setAttribute('aria-label', translation);
            }
        });
    }

    // Apply directional styles
    applyDirectionalStyles(language) {
        const isRTL = this.rtlLanguages.includes(language);
        const body = document.body;
        
        // Remove existing direction classes
        body.classList.remove('rtl', 'ltr');
        
        // Add appropriate direction class
        body.classList.add(isRTL ? 'rtl' : 'ltr');
        
        // Update CSS custom properties for direction-aware styling
        document.documentElement.style.setProperty('--text-align-start', isRTL ? 'right' : 'left');
        document.documentElement.style.setProperty('--text-align-end', isRTL ? 'left' : 'right');
        document.documentElement.style.setProperty('--margin-start', isRTL ? 'margin-right' : 'margin-left');
        document.documentElement.style.setProperty('--margin-end', isRTL ? 'margin-left' : 'margin-right');
        document.documentElement.style.setProperty('--padding-start', isRTL ? 'padding-right' : 'padding-left');
        document.documentElement.style.setProperty('--padding-end', isRTL ? 'padding-left' : 'padding-right');
    }

    // Get translation for a key
    getTranslation(key, language = null) {
        const lang = language || this.currentLanguage;
        return this.translations[lang] && this.translations[lang][key] || key;
    }

    // Add translation
    addTranslation(language, key, value) {
        if (!this.translations[language]) {
            this.translations[language] = {};
        }
        this.translations[language][key] = value;
    }

    // Add multiple translations
    addTranslations(language, translations) {
        if (!this.translations[language]) {
            this.translations[language] = {};
        }
        Object.assign(this.translations[language], translations);
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Check if language is RTL
    isRTL(language = null) {
        const lang = language || this.currentLanguage;
        return this.rtlLanguages.includes(lang);
    }

    // Register callback for language changes
    onLanguageChange(callback) {
        this.callbacks.push(callback);
    }

    // Notify callbacks of language change
    notifyCallbacks(language) {
        this.callbacks.forEach(callback => {
            try {
                callback(language);
            } catch (error) {
                console.error('Language change callback error:', error);
            }
        });
    }

    // Format number based on language
    formatNumber(number, language = null) {
        const lang = language || this.currentLanguage;
        
        if (lang === 'fa') {
            // Persian number formatting
            return new Intl.NumberFormat('fa-IR').format(number);
        } else {
            // English number formatting
            return new Intl.NumberFormat('en-US').format(number);
        }
    }

    // Format currency based on language
    formatCurrency(amount, currency = 'USD', language = null) {
        const lang = language || this.currentLanguage;
        
        try {
            if (lang === 'fa') {
                return new Intl.NumberFormat('fa-IR', {
                    style: 'currency',
                    currency: currency,
                    minimumFractionDigits: 2
                }).format(amount);
            } else {
                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: currency,
                    minimumFractionDigits: 2
                }).format(amount);
            }
        } catch (error) {
            // Fallback formatting
            return `${amount.toFixed(2)} ${currency}`;
        }
    }

    // Format date based on language
    formatDate(date, language = null) {
        const lang = language || this.currentLanguage;
        
        try {
            if (lang === 'fa') {
                return new Intl.DateTimeFormat('fa-IR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }).format(date);
            } else {
                return new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }).format(date);
            }
        } catch (error) {
            // Fallback formatting
            return date.toLocaleDateString();
        }
    }

    // Format time based on language
    formatTime(date, language = null) {
        const lang = language || this.currentLanguage;
        
        try {
            if (lang === 'fa') {
                return new Intl.DateTimeFormat('fa-IR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }).format(date);
            } else {
                return new Intl.DateTimeFormat('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }).format(date);
            }
        } catch (error) {
            // Fallback formatting
            return date.toLocaleTimeString();
        }
    }

    // Get language-specific font family
    getFontFamily(language = null) {
        const lang = language || this.currentLanguage;
        
        if (lang === 'fa') {
            return 'Vazir, Tahoma, Arial, sans-serif';
        } else {
            return 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
        }
    }

    // Update font family based on language
    updateFontFamily(language = null) {
        const lang = language || this.currentLanguage;
        const fontFamily = this.getFontFamily(lang);
        
        document.documentElement.style.setProperty('--font-family', fontFamily);
    }
}

// Global functions for language switching
window.switchLanguage = function(language) {
    if (window.multilingualSystem) {
        window.multilingualSystem.switchLanguage(language);
    }
};

// Initialize multilingual system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.multilingualSystem = new MultilingualSystem();
    
    // Update existing switchLanguage function
    const originalSwitchLanguage = window.switchLanguage;
    window.switchLanguage = function(language) {
        if (window.multilingualSystem) {
            window.multilingualSystem.switchLanguage(language);
        } else if (originalSwitchLanguage) {
            originalSwitchLanguage(language);
        }
    };
});

// Export for global use
if (typeof window !== 'undefined') {
    window.MultilingualSystem = MultilingualSystem;
}

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MultilingualSystem;
}
