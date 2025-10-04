import express from 'express';
import jupiterService from '../services/jupiterService.js';
import { ValidationError } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * POST /api/v1/swap/quote
 * Get swap quote from Jupiter
 */
router.post('/quote', async (req, res, next) => {
  try {
    const { inputMint, outputMint, amount, slippageBps } = req.body;

    if (!inputMint || !outputMint || !amount) {
      throw new ValidationError('inputMint, outputMint, and amount are required');
    }

    const quote = await jupiterService.getQuote({
      inputMint,
      outputMint,
      amount,
      slippageBps
    });

    res.json({
      success: true,
      data: quote
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/swap/execute
 * Execute swap transaction
 */
router.post('/execute', async (req, res, next) => {
  try {
    const { quoteResponse, userPublicKey } = req.body;

    if (!quoteResponse || !userPublicKey) {
      throw new ValidationError('quoteResponse and userPublicKey are required');
    }

    const transaction = await jupiterService.getSwapTransaction({
      quoteResponse,
      userPublicKey
    });

    res.json({
      success: true,
      data: transaction,
      message: 'Swap transaction prepared successfully'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/swap/tokens
 * Get supported tokens
 */
router.get('/tokens', async (req, res, next) => {
  try {
    const tokens = await jupiterService.getSupportedTokens();

    res.json({
      success: true,
      data: tokens
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/swap/price/:address
 * Get token price
 */
router.get('/price/:address', async (req, res, next) => {
  try {
    const { address } = req.params;
    const price = await jupiterService.getTokenPrice(address);

    res.json({
      success: true,
      data: price
    });
  } catch (error) {
    next(error);
  }
});

export default router;
