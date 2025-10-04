import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';

export default function TokenCreation() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    supply: '',
    description: '',
  });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateAISuggestions = async () => {
    setAiLoading(true);
    // Simulate AI generation
    setTimeout(() => {
      setAiSuggestions({
        names: ['MoonRocket', 'SolPump', 'CryptoGem'],
        symbols: ['MOON', 'SPMP', 'CGEM'],
        descriptions: [
          'A revolutionary token designed to reach the moon and beyond!',
          'The ultimate pump token on Solana blockchain',
          'Hidden gem waiting to be discovered by the crypto community',
        ],
      });
      setAiLoading(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating token:', formData);
    // Token creation logic will go here
  };

  return (
    <section id="create" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              {t('create.title')}
            </h2>
            <p className="text-muted-foreground">
              Let AI help you create the perfect token in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Form */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Token Details</CardTitle>
                <CardDescription>Fill in your token information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Token Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('create.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., MoonRocket"
                      required
                    />
                  </div>

                  {/* Token Symbol */}
                  <div className="space-y-2">
                    <Label htmlFor="symbol">{t('create.symbol')}</Label>
                    <Input
                      id="symbol"
                      name="symbol"
                      value={formData.symbol}
                      onChange={handleChange}
                      placeholder="e.g., MOON"
                      maxLength={10}
                      required
                    />
                  </div>

                  {/* Total Supply */}
                  <div className="space-y-2">
                    <Label htmlFor="supply">{t('create.supply')}</Label>
                    <Input
                      id="supply"
                      name="supply"
                      type="number"
                      value={formData.supply}
                      onChange={handleChange}
                      placeholder="1000000000"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">{t('create.description')}</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your token..."
                      rows={4}
                      required
                    />
                  </div>

                  {/* Icon Upload */}
                  <div className="space-y-2">
                    <Label>{t('create.icon')}</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{t('create.uploadIcon')}</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, SVG (max 2MB)</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full gradient-primary text-white" size="lg">
                    {t('create.createButton')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {t('create.aiSuggestions')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={generateAISuggestions}
                    disabled={aiLoading}
                    variant="outline"
                    className="w-full mb-4"
                  >
                    {aiLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {t('create.generating')}
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Ideas
                      </>
                    )}
                  </Button>

                  {aiSuggestions && (
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Names:</p>
                        {aiSuggestions.names.map((name, i) => (
                          <Button
                            key={i}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start mb-1"
                            onClick={() => setFormData({ ...formData, name })}
                          >
                            {name}
                          </Button>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Symbols:</p>
                        {aiSuggestions.symbols.map((symbol, i) => (
                          <Button
                            key={i}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start mb-1"
                            onClick={() => setFormData({ ...formData, symbol })}
                          >
                            {symbol}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Costs */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('create.costs')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('create.networkFee')}</span>
                    <span className="font-medium">~0.002 SOL</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('create.platformFee')}</span>
                    <span className="font-medium">0.01 SOL</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold">
                    <span>{t('create.total')}</span>
                    <span className="gradient-text">~0.012 SOL</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
