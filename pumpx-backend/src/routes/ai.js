import express from 'express';
import aiService from '../services/aiService.js';
import { ValidationError } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * POST /api/v1/ai/suggest-name
 * Generate token name suggestions
 */
router.post('/suggest-name', async (req, res, next) => {
  try {
    const { description, category } = req.body;

    if (!description) {
      throw new ValidationError('Description is required');
    }

    const suggestions = await aiService.suggestTokenName(description, category);

    res.json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/ai/suggest-symbol
 * Generate token symbol suggestions
 */
router.post('/suggest-symbol', async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new ValidationError('Token name is required');
    }

    const suggestions = await aiService.suggestTokenSymbol(name);

    res.json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/ai/generate-description
 * Generate token description
 */
router.post('/generate-description', async (req, res, next) => {
  try {
    const { name, symbol, purpose } = req.body;

    if (!name || !symbol) {
      throw new ValidationError('Name and symbol are required');
    }

    const description = await aiService.generateDescription(name, symbol, purpose);

    res.json({
      success: true,
      data: description
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/ai/analyze-token
 * Analyze token for investment insights
 */
router.post('/analyze-token', async (req, res, next) => {
  try {
    const { tokenData } = req.body;

    if (!tokenData) {
      throw new ValidationError('Token data is required');
    }

    const analysis = await aiService.analyzeToken(tokenData);

    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/ai/viral-strategy
 * Generate viral marketing strategy
 */
router.post('/viral-strategy', async (req, res, next) => {
  try {
    const { tokenData } = req.body;

    if (!tokenData) {
      throw new ValidationError('Token data is required');
    }

    const strategy = await aiService.generateViralStrategy(tokenData);

    res.json({
      success: true,
      data: strategy
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/ai/predict-trend
 * Predict price trend
 */
router.post('/predict-trend', async (req, res, next) => {
  try {
    const { historicalData } = req.body;

    if (!historicalData || !Array.isArray(historicalData)) {
      throw new ValidationError('Historical data array is required');
    }

    const prediction = await aiService.predictTrend(historicalData);

    res.json({
      success: true,
      data: prediction
    });
  } catch (error) {
    next(error);
  }
});

export default router;
