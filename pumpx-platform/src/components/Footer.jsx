import { useTranslation } from 'react-i18next';
import { Twitter, Send, Github, MessageCircle } from 'lucide-react';
import logo from '../assets/pumpx_logo.png';

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/pumpx', label: 'Twitter' },
    { icon: Send, href: 'https://t.me/pumpx', label: 'Telegram' },
    { icon: MessageCircle, href: 'https://discord.gg/pumpx', label: 'Discord' },
    { icon: Github, href: 'https://github.com/pumpx', label: 'GitHub' },
  ];

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Create Token', href: '#create' },
        { label: 'Explore Tokens', href: '#tokens' },
        { label: 'Swap', href: '#swap' },
        { label: 'Portfolio', href: '#portfolio' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: t('footer.docs'), href: '#' },
        { label: 'API', href: '#' },
        { label: 'Tutorials', href: '#' },
        { label: 'FAQ', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: t('footer.about'), href: '#' },
        { label: t('footer.community'), href: '#' },
        { label: 'Blog', href: '#' },
        { label: t('footer.support'), href: '#' },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="PumpX" className="h-10 w-auto" />
              <span className="text-xl font-bold gradient-text">PumpX</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The first 100% AI-powered token launchpad on Solana. Create, trade, and manage your tokens with artificial intelligence.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-primary" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PumpX. {t('footer.rights')}.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
