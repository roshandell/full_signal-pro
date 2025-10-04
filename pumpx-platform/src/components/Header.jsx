import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Wallet } from 'lucide-react';
import { Button } from './ui/button';
import logo from '../assets/pumpx_logo.png';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const navItems = [
    { key: 'home', href: '#' },
    { key: 'create', href: '#create' },
    { key: 'tokens', href: '#tokens' },
    { key: 'swap', href: '#swap' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'pxp', href: '#pxp' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="PumpX" className="h-10 w-auto" />
            <span className="text-xl font-bold gradient-text">PumpX</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="hidden sm:flex"
            >
              <Globe className="h-5 w-5" />
            </Button>

            {/* Connect Wallet */}
            <Button
              onClick={() => setIsConnected(!isConnected)}
              className="gradient-primary text-white"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {isConnected ? 'Connected' : t('nav.connectWallet')}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
              <Button
                variant="ghost"
                onClick={toggleLanguage}
                className="justify-start"
              >
                <Globe className="h-4 w-4 mr-2" />
                {i18n.language === 'en' ? 'فارسی' : 'English'}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
