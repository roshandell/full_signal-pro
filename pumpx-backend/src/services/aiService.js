import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class AIService {
  /**
   * Generate token name suggestions
   */
  async suggestTokenName(description, category) {
    try {
      const prompt = `Generate 5 creative and catchy token names for a cryptocurrency with:
Description: ${description}
Category: ${category || 'General'}

Requirements:
- Short and memorable (1-2 words)
- Easy to pronounce
- Relevant to crypto culture
- High viral potential
- Unique and creative

Return ONLY a JSON array of strings, nothing else.
Example: ["MoonRocket", "SolPump", "CryptoGem", "DiamondHands", "ToTheMoon"]`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a creative crypto branding expert. Always return valid JSON arrays only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.9,
        max_tokens: 200,
      });

      const content = response.choices[0].message.content.trim();
      return JSON.parse(content);
    } catch (error) {
      console.error('AI Name Suggestion Error:', error);
      return ['CryptoToken', 'MoonShot', 'GemFinder', 'RocketFuel', 'DiamondDAO'];
    }
  }

  /**
   * Generate token symbol suggestions
   */
  async suggestTokenSymbol(name) {
    try {
      const prompt = `Generate 3-5 character ticker symbols for the token name: "${name}"

Requirements:
- 3-5 uppercase letters
- Easy to remember
- Not similar to existing major tokens (BTC, ETH, SOL, etc.)
- Relevant to the name

Return ONLY a JSON array of strings, nothing else.
Example: ["MOON", "ROCK", "PUMP"]`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a crypto ticker symbol expert. Always return valid JSON arrays only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 100,
      });

      const content = response.choices[0].message.content.trim();
      return JSON.parse(content);
    } catch (error) {
      console.error('AI Symbol Suggestion Error:', error);
      const firstLetters = name.substring(0, 4).toUpperCase();
      return [firstLetters, firstLetters + 'X', firstLetters.substring(0, 3)];
    }
  }

  /**
   * Generate token description
   */
  async generateDescription(name, symbol, purpose) {
    try {
      const prompt = `Write an engaging token description for:
Name: ${name}
Symbol: ${symbol}
Purpose: ${purpose || 'A revolutionary cryptocurrency'}

Requirements:
- 100-200 words
- Exciting and professional tone
- Highlight unique features
- Include call to action
- Generate in both English and Persian

Return as JSON with 'en' and 'fa' keys.
Example: {"en": "English text here", "fa": "متن فارسی اینجا"}`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional crypto content writer. Always return valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 500,
      });

      const content = response.choices[0].message.content.trim();
      return JSON.parse(content);
    } catch (error) {
      console.error('AI Description Generation Error:', error);
      return {
        en: `${name} (${symbol}) is a revolutionary cryptocurrency token built on Solana blockchain. Join our community and be part of the future of decentralized finance!`,
        fa: `${name} (${symbol}) یک توکن انقلابی کریپتوکارنسی است که بر روی بلاکچین سولانا ساخته شده است. به جامعه ما بپیوندید و بخشی از آینده مالی غیرمتمرکز باشید!`
      };
    }
  }

  /**
   * Analyze token for investment insights
   */
  async analyzeToken(tokenData) {
    try {
      const prompt = `Analyze this token and provide investment insights:
${JSON.stringify(tokenData, null, 2)}

Provide:
1. Risk assessment (Low/Medium/High)
2. Growth potential (1-10 score)
3. Key strengths (3 points)
4. Key risks (3 points)
5. Recommendation (Buy/Hold/Sell)
6. Confidence level (0-100%)

Return as JSON with keys: risk, growthPotential, strengths (array), risks (array), recommendation, confidence`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a crypto investment analyst. Always return valid JSON only. Be realistic and balanced.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 600,
      });

      const content = response.choices[0].message.content.trim();
      return JSON.parse(content);
    } catch (error) {
      console.error('AI Token Analysis Error:', error);
      return {
        risk: 'Medium',
        growthPotential: 5,
        strengths: ['Active community', 'Solana-based', 'Low fees'],
        risks: ['Market volatility', 'New token', 'Limited liquidity'],
        recommendation: 'Hold',
        confidence: 60
      };
    }
  }

  /**
   * Generate viral marketing strategy
   */
  async generateViralStrategy(tokenData) {
    try {
      const prompt = `Create a viral marketing strategy for this token:
${JSON.stringify(tokenData, null, 2)}

Provide:
1. Best hashtags (5-10)
2. Optimal launch time (timezone: UTC)
3. Target audience description
4. Content ideas (5 ideas)
5. Platform recommendations (Twitter, Telegram, etc.)

Return as JSON with keys: hashtags (array), launchTime, targetAudience, contentIdeas (array), platforms (array)`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a crypto marketing expert. Always return valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 700,
      });

      const content = response.choices[0].message.content.trim();
      return JSON.parse(content);
    } catch (error) {
      console.error('AI Viral Strategy Error:', error);
      return {
        hashtags: ['#Crypto', '#Solana', '#DeFi', '#NewToken', '#ToTheMoon'],
        launchTime: '14:00 UTC',
        targetAudience: 'Crypto enthusiasts aged 18-35 interested in DeFi',
        contentIdeas: [
          'Launch announcement with token features',
          'Community AMA session',
          'Meme content for viral spread',
          'Partnership announcements',
          'Giveaway campaigns'
        ],
        platforms: ['Twitter', 'Telegram', 'Discord', 'Reddit']
      };
    }
  }

  /**
   * Predict price trend
   */
  async predictTrend(historicalData) {
    try {
      const prompt = `Based on this historical price data, predict the trend:
${JSON.stringify(historicalData, null, 2)}

Provide:
1. Short-term trend (24h): Up/Down/Sideways
2. Medium-term trend (7d): Up/Down/Sideways
3. Confidence level (0-100%)
4. Key factors affecting the prediction (3-5 points)

Return as JSON with keys: shortTerm, mediumTerm, confidence, factors (array)`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a crypto market analyst. Always return valid JSON only. Base predictions on data patterns.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 400,
      });

      const content = response.choices[0].message.content.trim();
      return JSON.parse(content);
    } catch (error) {
      console.error('AI Trend Prediction Error:', error);
      return {
        shortTerm: 'Sideways',
        mediumTerm: 'Up',
        confidence: 50,
        factors: ['Market volatility', 'Trading volume', 'Community sentiment']
      };
    }
  }
}

export default new AIService();
