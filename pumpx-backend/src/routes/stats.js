import express from 'express';

const router = express.Router();

router.get('/platform', async (req, res) => {
  res.json({
    success: true,
    data: {
      totalUsers: 25800,
      totalTokens: 1234,
      totalVolume: 12500000,
      aiAccuracy: 98.7,
      activeUsers24h: 5420,
      transactions24h: 15678,
    }
  });
});

router.get('/tokens', async (req, res) => {
  res.json({
    success: true,
    data: {
      created24h: 45,
      graduated24h: 3,
      averageMarketCap: 450000,
      totalMarketCap: 555300000,
    }
  });
});

export default router;
