# PumpX - AI-Powered Solana Token Launchpad

<div align="center">

![PumpX Logo](./assets/pumpx_logo.png)

**The First 100% AI-Powered Token Launchpad on Solana**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solana](https://img.shields.io/badge/Solana-Blockchain-purple)](https://solana.com)
[![AI Powered](https://img.shields.io/badge/AI-Powered-blue)](https://openai.com)

[Website](https://pumpx.info) • [Documentation](#) • [Twitter](#) • [Telegram](#)

</div>

---

## 🚀 Features

### Core Features
- **AI-Powered Token Creation**: Generate token names, symbols, and descriptions with AI
- **Bonding Curve Trading**: Fair launch mechanism with automatic price discovery
- **Jupiter Integration**: Best-in-class token swapping powered by Jupiter Aggregator
- **Real-time Analytics**: Live price charts, volume tracking, and holder statistics
- **Multi-language Support**: Full support for English and Persian (فارسی)
- **Wallet Integration**: Seamless connection with Solana wallets

### AI Capabilities
- 🤖 **Smart Name Generation**: AI suggests creative and viral token names
- 📝 **Description Writing**: Automated professional token descriptions
- 📊 **Market Analysis**: AI-powered investment insights and risk assessment
- 🎯 **Viral Strategies**: Marketing recommendations for maximum reach
- 📈 **Trend Prediction**: AI-based price trend forecasting

### Platform Features
- 💎 **PXP Token**: Platform native token with governance and staking
- 🔄 **Auto-Graduation**: Tokens automatically graduate to DEX at market cap milestone
- 💰 **Revenue Sharing**: Token creators earn from trading fees
- 🏆 **Achievements System**: Gamified user experience with rewards
- 👥 **Referral Program**: Earn from inviting new users

---

## 📁 Project Structure

```
pumpx/
├── pumpx-platform/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── lib/            # Utilities and i18n
│   │   ├── assets/         # Images and static files
│   │   └── App.jsx         # Main application
│   └── package.json
│
├── pumpx-backend/          # Backend (Node.js + Express)
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   │   ├── aiService.js        # OpenAI integration
│   │   │   ├── solanaService.js    # Solana blockchain
│   │   │   └── jupiterService.js   # Jupiter DEX
│   │   ├── middleware/     # Express middleware
│   │   └── server.js       # Main server file
│   └── package.json
│
└── docs/                   # Documentation
    ├── architecture.md     # System architecture
    ├── api.md             # API documentation
    └── deployment.md      # Deployment guide
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: Zustand
- **Wallet**: @solana/wallet-adapter
- **Charts**: Recharts
- **i18n**: react-i18next
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js 5
- **Database**: PostgreSQL + Redis
- **Blockchain**: @solana/web3.js + @solana/spl-token
- **AI**: OpenAI GPT-4.1
- **DEX**: Jupiter Aggregator API
- **WebSocket**: ws

### Infrastructure
- **Hosting**: VPS (194.62.43.193)
- **SSL**: Let's Encrypt
- **CDN**: Cloudflare
- **RPC**: QuickNode / Helius

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm or npm
- Solana CLI (optional)
- PostgreSQL (for production)
- Redis (for production)

### Frontend Setup

```bash
cd pumpx-platform
pnpm install
pnpm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd pumpx-backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

The backend will be available at `http://localhost:3001`

### Environment Variables

**Backend (.env)**
```env
PORT=3001
NODE_ENV=development
OPENAI_API_KEY=your_openai_key
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
CORS_ORIGIN=http://localhost:5173
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api/v1
```

### Endpoints

#### AI Endpoints
- `POST /ai/suggest-name` - Generate token name suggestions
- `POST /ai/suggest-symbol` - Generate token symbol suggestions
- `POST /ai/generate-description` - Generate token description
- `POST /ai/analyze-token` - Analyze token for insights
- `POST /ai/viral-strategy` - Generate viral marketing strategy
- `POST /ai/predict-trend` - Predict price trends

#### Token Endpoints
- `GET /tokens` - Get all tokens
- `GET /tokens/:address` - Get token details
- `POST /tokens/create` - Create new token
- `GET /tokens/:address/holders` - Get token holders
- `GET /tokens/:address/transactions` - Get token transactions
- `GET /tokens/trending` - Get trending tokens

#### Swap Endpoints
- `POST /swap/quote` - Get swap quote
- `POST /swap/execute` - Execute swap
- `GET /swap/tokens` - Get supported tokens
- `GET /swap/price/:address` - Get token price

#### User Endpoints
- `GET /user/profile` - Get user profile
- `GET /user/portfolio` - Get user portfolio

#### Stats Endpoints
- `GET /stats/platform` - Get platform statistics
- `GET /stats/tokens` - Get token statistics

---

## 🎨 Design System

### Colors
- **Primary**: Purple/Blue gradient (#7C3AED → #3B82F6)
- **Secondary**: Light purple (#A78BFA)
- **Accent**: Blue (#60A5FA)
- **Background**: Off-white (#FAFAFA) / Dark (#1F1F1F)

### Typography
- **Font Family**: Inter, system-ui
- **Headings**: Bold, gradient text
- **Body**: Regular, high contrast

---

## 🔒 Security

- ✅ Rate limiting on all endpoints
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Helmet.js security headers
- ✅ No private key storage
- ✅ User-signed transactions only

---

## 📈 Revenue Model

1. **Token Creation Fee**: 0.01-0.02 SOL per token
2. **Trading Fees**: 1% on bonding curve trades
   - 70% to platform
   - 20% to token creator
   - 10% to liquidity pool
3. **Swap Fees**: 0.5% on Jupiter swaps
4. **Graduation Fee**: 2% of liquidity on DEX graduation

---

## 🗺️ Roadmap

### Phase 1: MVP ✅
- [x] Basic token creation
- [x] AI suggestions
- [x] Token listing
- [x] Multi-language support

### Phase 2: Core Features (In Progress)
- [ ] Bonding curve implementation
- [ ] Jupiter swap integration
- [ ] Real-time WebSocket updates
- [ ] Portfolio tracking

### Phase 3: Advanced Features
- [ ] PXP token launch
- [ ] Staking & governance
- [ ] Advanced analytics
- [ ] Mobile app

### Phase 4: Growth
- [ ] Marketing campaigns
- [ ] Partnerships
- [ ] Community building
- [ ] Expansion to other chains

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

- **Website**: [https://pumpx.info](https://pumpx.info)
- **Email**: support@pumpx.info
- **Twitter**: [@PumpX_Official](#)
- **Telegram**: [t.me/pumpx](#)
- **Discord**: [discord.gg/pumpx](#)

---

## 🙏 Acknowledgments

- [Solana](https://solana.com) - High-performance blockchain
- [OpenAI](https://openai.com) - AI capabilities
- [Jupiter](https://jup.ag) - DEX aggregator
- [Pump.fun](https://pump.fun) - Inspiration for bonding curve mechanism

---

<div align="center">

**Built with ❤️ by the PumpX Team**

[⬆ Back to Top](#pumpx---ai-powered-solana-token-launchpad)

</div>
