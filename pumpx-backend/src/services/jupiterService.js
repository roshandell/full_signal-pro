import axios from 'axios';

class JupiterService {
  constructor() {
    this.baseURL = 'https://quote-api.jup.ag/v6';
  }

  /**
   * Get swap quote from Jupiter
   */
  async getQuote(params) {
    const { inputMint, outputMint, amount, slippageBps = 50 } = params;

    try {
      const response = await axios.get(`${this.baseURL}/quote`, {
        params: {
          inputMint,
          outputMint,
          amount,
          slippageBps,
          onlyDirectRoutes: false,
          asLegacyTransaction: false
        }
      });

      const quote = response.data;

      return {
        inputMint: quote.inputMint,
        outputMint: quote.outputMint,
        inAmount: quote.inAmount,
        outAmount: quote.outAmount,
        otherAmountThreshold: quote.otherAmountThreshold,
        swapMode: quote.swapMode,
        slippageBps: quote.slippageBps,
        priceImpactPct: quote.priceImpactPct,
        routePlan: quote.routePlan,
        platformFee: this.calculatePlatformFee(quote.outAmount)
      };
    } catch (error) {
      console.error('Jupiter quote error:', error.message);
      
      // Return mock quote for development
      return {
        inputMint,
        outputMint,
        inAmount: amount,
        outAmount: Math.floor(amount * 0.95), // Mock 5% slippage
        priceImpactPct: 0.5,
        slippageBps,
        platformFee: Math.floor(amount * 0.005),
        mock: true
      };
    }
  }

  /**
   * Get swap transaction
   */
  async getSwapTransaction(params) {
    const { quoteResponse, userPublicKey, wrapUnwrapSOL = true } = params;

    try {
      const response = await axios.post(`${this.baseURL}/swap`, {
        quoteResponse,
        userPublicKey,
        wrapUnwrapSOL,
        computeUnitPriceMicroLamports: 'auto'
      });

      return {
        swapTransaction: response.data.swapTransaction,
        lastValidBlockHeight: response.data.lastValidBlockHeight
      };
    } catch (error) {
      console.error('Jupiter swap transaction error:', error.message);
      throw new Error('Failed to get swap transaction');
    }
  }

  /**
   * Get token price
   */
  async getTokenPrice(tokenAddress) {
    try {
      const response = await axios.get(`${this.baseURL}/price`, {
        params: {
          ids: tokenAddress
        }
      });

      return response.data.data[tokenAddress];
    } catch (error) {
      console.error('Get token price error:', error.message);
      return null;
    }
  }

  /**
   * Get supported tokens
   */
  async getSupportedTokens() {
    try {
      const response = await axios.get(`${this.baseURL}/tokens`);
      return response.data;
    } catch (error) {
      console.error('Get supported tokens error:', error.message);
      return [];
    }
  }

  /**
   * Calculate platform fee
   */
  calculatePlatformFee(amount) {
    const feeBps = parseInt(process.env.SWAP_FEE_BPS) || 50; // 0.5%
    return Math.floor((amount * feeBps) / 10000);
  }

  /**
   * Get route map for visualization
   */
  async getRouteMap(inputMint, outputMint) {
    try {
      const response = await axios.get(`${this.baseURL}/route-map`, {
        params: {
          inputMint,
          outputMint
        }
      });

      return response.data;
    } catch (error) {
      console.error('Get route map error:', error.message);
      return null;
    }
  }
}

export default new JupiterService();
