import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header
      "nav.home": "Home",
      "nav.create": "Create Token",
      "nav.tokens": "Tokens",
      "nav.swap": "Swap",
      "nav.portfolio": "Portfolio",
      "nav.pxp": "PXP Token",
      "nav.connectWallet": "Connect Wallet",
      
      // Hero Section
      "hero.title": "AI-Powered Solana Token Launchpad",
      "hero.subtitle": "Create, trade, and manage your tokens with 100% AI assistance",
      "hero.createButton": "Create Your Token",
      "hero.exploreButton": "Explore Tokens",
      
      // Stats
      "stats.activeUsers": "Active Users",
      "stats.tokensCreated": "Tokens Created",
      "stats.totalVolume": "Total Volume",
      "stats.aiAccuracy": "AI Accuracy",
      
      // Token Creation
      "create.title": "Create Your Token",
      "create.name": "Token Name",
      "create.symbol": "Token Symbol",
      "create.supply": "Total Supply",
      "create.description": "Description",
      "create.icon": "Token Icon",
      "create.uploadIcon": "Click to upload or drag and drop",
      "create.aiSuggestions": "AI Suggestions",
      "create.generating": "Generating suggestions...",
      "create.costs": "Creation Costs",
      "create.networkFee": "Network Fee",
      "create.platformFee": "Platform Fee",
      "create.total": "Total",
      "create.createButton": "Create Token",
      
      // Token List
      "tokens.title": "All Tokens",
      "tokens.trending": "Trending",
      "tokens.new": "New",
      "tokens.search": "Search tokens...",
      "tokens.marketCap": "Market Cap",
      "tokens.volume24h": "24h Volume",
      "tokens.holders": "Holders",
      "tokens.change24h": "24h Change",
      
      // Swap
      "swap.title": "Swap Tokens",
      "swap.from": "From",
      "swap.to": "To",
      "swap.balance": "Balance",
      "swap.slippage": "Slippage",
      "swap.priceImpact": "Price Impact",
      "swap.swapButton": "Swap",
      
      // Footer
      "footer.about": "About PumpX",
      "footer.docs": "Documentation",
      "footer.community": "Community",
      "footer.support": "Support",
      "footer.rights": "All rights reserved",
    }
  },
  fa: {
    translation: {
      // Header
      "nav.home": "خانه",
      "nav.create": "ساخت توکن",
      "nav.tokens": "توکن‌ها",
      "nav.swap": "تبدیل",
      "nav.portfolio": "پورتفولیو",
      "nav.pxp": "توکن PXP",
      "nav.connectWallet": "اتصال کیف پول",
      
      // Hero Section
      "hero.title": "پلتفرم هوشمند ساخت توکن سولانا",
      "hero.subtitle": "توکن خود را با کمک هوش مصنوعی بسازید، معامله کنید و مدیریت کنید",
      "hero.createButton": "ساخت توکن",
      "hero.exploreButton": "مشاهده توکن‌ها",
      
      // Stats
      "stats.activeUsers": "کاربران فعال",
      "stats.tokensCreated": "توکن ساخته شده",
      "stats.totalVolume": "حجم کل معاملات",
      "stats.aiAccuracy": "دقت هوش مصنوعی",
      
      // Token Creation
      "create.title": "ساخت توکن جدید",
      "create.name": "نام توکن",
      "create.symbol": "نماد توکن",
      "create.supply": "کل عرضه",
      "create.description": "توضیحات",
      "create.icon": "آیکون توکن",
      "create.uploadIcon": "کلیک کنید یا فایل را بکشید",
      "create.aiSuggestions": "پیشنهادات هوش مصنوعی",
      "create.generating": "در حال تولید پیشنهادات...",
      "create.costs": "هزینه‌های ساخت",
      "create.networkFee": "هزینه شبکه",
      "create.platformFee": "کارمزد پلتفرم",
      "create.total": "مجموع",
      "create.createButton": "ساخت توکن",
      
      // Token List
      "tokens.title": "همه توکن‌ها",
      "tokens.trending": "پرطرفدار",
      "tokens.new": "جدید",
      "tokens.search": "جستجوی توکن...",
      "tokens.marketCap": "ارزش بازار",
      "tokens.volume24h": "حجم ۲۴ ساعته",
      "tokens.holders": "نگهدارندگان",
      "tokens.change24h": "تغییر ۲۴ ساعته",
      
      // Swap
      "swap.title": "تبدیل توکن",
      "swap.from": "از",
      "swap.to": "به",
      "swap.balance": "موجودی",
      "swap.slippage": "لغزش",
      "swap.priceImpact": "تاثیر قیمت",
      "swap.swapButton": "تبدیل",
      
      // Footer
      "footer.about": "درباره PumpX",
      "footer.docs": "مستندات",
      "footer.community": "جامعه",
      "footer.support": "پشتیبانی",
      "footer.rights": "تمامی حقوق محفوظ است",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
