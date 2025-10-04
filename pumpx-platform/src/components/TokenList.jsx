import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, TrendingUp, Clock, Users, DollarSign } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Mock data
const mockTokens = [
  {
    id: 1,
    name: 'MoonRocket',
    symbol: 'MOON',
    icon: '🚀',
    price: 0.00045,
    change24h: 12.5,
    marketCap: 450000,
    volume24h: 125000,
    holders: 1234,
    trending: true,
  },
  {
    id: 2,
    name: 'SolPump',
    symbol: 'SPMP',
    icon: '💎',
    price: 0.00032,
    change24h: -5.2,
    marketCap: 320000,
    volume24h: 89000,
    holders: 856,
    trending: true,
  },
  {
    id: 3,
    name: 'CryptoGem',
    symbol: 'CGEM',
    icon: '💰',
    price: 0.00067,
    change24h: 25.8,
    marketCap: 670000,
    volume24h: 234000,
    holders: 2156,
    trending: false,
  },
  {
    id: 4,
    name: 'SolanaKing',
    symbol: 'KING',
    icon: '👑',
    price: 0.00089,
    change24h: 8.3,
    marketCap: 890000,
    volume24h: 156000,
    holders: 1678,
    trending: false,
  },
];

export default function TokenList() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredTokens = mockTokens.filter((token) => {
    const matchesSearch =
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'trending') return matchesSearch && token.trending;
    if (activeTab === 'new') return matchesSearch;
    return matchesSearch;
  });

  return (
    <section id="tokens" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              {t('tokens.title')}
            </h2>
            <p className="text-muted-foreground">
              Discover and trade the hottest tokens on Solana
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('tokens.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="trending">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {t('tokens.trending')}
                </TabsTrigger>
                <TabsTrigger value="new">
                  <Clock className="h-4 w-4 mr-2" />
                  {t('tokens.new')}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Token Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTokens.map((token) => (
              <Card key={token.id} className="token-card cursor-pointer">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{token.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg">{token.name}</h3>
                        <p className="text-sm text-muted-foreground">{token.symbol}</p>
                      </div>
                    </div>
                    {token.trending && (
                      <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        🔥 Hot
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="text-2xl font-bold mb-1">
                      ${token.price.toFixed(5)}
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        token.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {token.change24h >= 0 ? '+' : ''}
                      {token.change24h}% {t('tokens.change24h')}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {t('tokens.marketCap')}
                      </span>
                      <span className="font-medium">
                        ${(token.marketCap / 1000).toFixed(1)}K
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {t('tokens.volume24h')}
                      </span>
                      <span className="font-medium">
                        ${(token.volume24h / 1000).toFixed(1)}K
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {t('tokens.holders')}
                      </span>
                      <span className="font-medium">{token.holders.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-4 border-t border-border flex gap-2">
                    <Button size="sm" className="flex-1 gradient-primary text-white">
                      Buy
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredTokens.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tokens found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
