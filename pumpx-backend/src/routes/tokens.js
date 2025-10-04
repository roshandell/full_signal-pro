import express from 'express';
import { ValidationError } from '../middleware/errorHandler.js';
import solanaService from '../services/solanaService.js';
import aiService from '../services/aiService.js';

const router = express.Router();

// Mock data for development
const mockTokens = [
  {
    id: '1',
    address: 'MOON1234567890abcdefghijklmnopqrstuvwxyz',
    name: 'MoonRocket',
    symbol: 'MOON',
    description: 'A revolutionary token designed to reach the moon and beyond!',
    icon: '🚀',
    totalSupply: 1000000000,
    decimals: 9,
    creator: 'Creator1Address',
    price: 0.00045,
    marketCap: 450000,
    volume24h: 125000,
    change24h: 12.5,
    holders: 1234,
    transactions: 5678,
    bondingCurveProgress: 45,
    graduated: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    address: 'SPMP1234567890abcdefghijklmnopqrstuvwxyz',
    name: 'SolPump',
    symbol: 'SPMP',
    description: 'The ultimate pump token on Solana blockchain',
    icon: '💎',
    totalSupply: 1000000000,
    decimals: 9,
    creator: 'Creator2Address',
    price: 0.00032,
    marketCap: 320000,
    volume24h: 89000,
    change24h: -5.2,
    holders: 856,
    transactions: 3421,
    bondingCurveProgress: 32,
    graduated: false,
    createdAt: new Date().toISOString(),
  },
];

/**
 * GET /api/v1/tokens
 * Get all tokens with filters
 */
router.get('/', async (req, res, next) => {
  try {
    const { search, sort, filter } = req.query;

    let tokens = [...mockTokens];

    // Apply search
    if (search) {
      tokens = tokens.filter(t => 
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply filter
    if (filter === 'trending') {
      tokens = tokens.filter(t => t.change24h > 10);
    } else if (filter === 'new') {
      tokens = tokens.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    // Apply sort
    if (sort === 'marketCap') {
      tokens = tokens.sort((a, b) => b.marketCap - a.marketCap);
    } else if (sort === 'volume') {
      tokens = tokens.sort((a, b) => b.volume24h - a.volume24h);
    }

    res.json({
      success: true,
      data: tokens,
      total: tokens.length
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/tokens/:address
 * Get token details by address
 */
router.get('/:address', async (req, res, next) => {
  try {
    const { address } = req.params;

    const token = mockTokens.find(t => t.address === address);

    if (!token) {
      throw new ValidationError('Token not found');
    }

    res.json({
      success: true,
      data: token
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/tokens/create
 * Create a new token
 */
router.post('/create', async (req, res, next) => {
  try {
    const { name, symbol, supply, description, icon, creator, useAI } = req.body;

    if (!name || !symbol || !supply || !creator) {
      throw new ValidationError('Name, symbol, supply, and creator are required');
    }

    // Generate AI description if requested
    let finalDescription = description;
    if (useAI && !description) {
      const aiDesc = await aiService.generateDescription(name, symbol, 'A revolutionary cryptocurrency');
      finalDescription = aiDesc.en;
    }

    // Create token on Solana
    const tokenResult = await solanaService.createToken({
      name,
      symbol,
      decimals: 9,
      supply,
      creator
    });

    const newToken = {
      id: String(mockTokens.length + 1),
      address: tokenResult.tokenAddress,
      name,
      symbol,
      description: finalDescription || '',
      icon: icon || '🪙',
      totalSupply: supply,
      decimals: 9,
      creator,
      price: 0.0001,
      marketCap: 0,
      volume24h: 0,
      change24h: 0,
      holders: 1,
      transactions: 0,
      bondingCurveProgress: 0,
      graduated: false,
      createdAt: new Date().toISOString(),
      signature: tokenResult.signature
    };

    mockTokens.push(newToken);

    res.status(201).json({
      success: true,
      data: newToken,
      message: 'Token created successfully on Solana blockchain'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/tokens/:address/holders
 * Get token holders
 */
router.get('/:address/holders', async (req, res, next) => {
  try {
    const { address } = req.params;

    // Mock holders data
    const holders = [
      { address: 'Holder1Address', amount: 1000000, percentage: 10 },
      { address: 'Holder2Address', amount: 500000, percentage: 5 },
      { address: 'Holder3Address', amount: 250000, percentage: 2.5 },
    ];

    res.json({
      success: true,
      data: holders
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/tokens/:address/transactions
 * Get token transactions
 */
router.get('/:address/transactions', async (req, res, next) => {
  try {
    const { address } = req.params;

    // Mock transactions data
    const transactions = [
      {
        signature: 'tx1234567890',
        type: 'buy',
        amount: 1000,
        price: 0.00045,
        timestamp: new Date().toISOString(),
      },
      {
        signature: 'tx0987654321',
        type: 'sell',
        amount: 500,
        price: 0.00043,
        timestamp: new Date().toISOString(),
      },
    ];

    res.json({
      success: true,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/tokens/trending
 * Get trending tokens
 */
router.get('/trending', async (req, res, next) => {
  try {
    const trending = mockTokens
      .filter(t => t.change24h > 5)
      .sort((a, b) => b.change24h - a.change24h)
      .slice(0, 10);

    res.json({
      success: true,
      data: trending
    });
  } catch (error) {
    next(error);
  }
});

export default router;
