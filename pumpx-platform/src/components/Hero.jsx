import { useTranslation } from 'react-i18next';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Button } from './ui/button';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">100% AI-Powered Platform</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="gradient-text">{t('hero.title')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animation-delay-400">
            <Button size="lg" className="gradient-primary text-white text-lg px-8 py-6 animate-glow">
              <Zap className="h-5 w-5 mr-2" />
              {t('hero.createButton')}
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <TrendingUp className="h-5 w-5 mr-2" />
              {t('hero.exploreButton')}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">25.8K</div>
              <div className="text-sm text-muted-foreground">{t('stats.activeUsers')}</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">1,234</div>
              <div className="text-sm text-muted-foreground">{t('stats.tokensCreated')}</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">$12.5M</div>
              <div className="text-sm text-muted-foreground">{t('stats.totalVolume')}</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">98.7%</div>
              <div className="text-sm text-muted-foreground">{t('stats.aiAccuracy')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
