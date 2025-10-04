import express from 'express';

const router = express.Router();

router.get('/profile', async (req, res) => {
  res.json({
    success: true,
    data: {
      address: 'UserWalletAddress',
      username: 'CryptoUser',
      tokensCreated: 5,
      totalEarnings: 12.5,
      level: 'Pro',
    }
  });
});

router.get('/portfolio', async (req, res) => {
  res.json({
    success: true,
    data: {
      totalValue: 1250.50,
      holdings: [
        { token: 'MOON', amount: 10000, value: 450 },
        { token: 'SPMP', amount: 5000, value: 160 },
      ]
    }
  });
});

export default router;
