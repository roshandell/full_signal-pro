# مستندات Jupiter API برای PumpX

## نقاط پایانی (Endpoints)

### 1. Quote API - دریافت قیمت
**URL**: `GET https://lite-api.jup.ag/swap/v1/quote`

**پارامترهای ضروری:**
- `inputMint` (string): آدرس توکن ورودی
- `outputMint` (string): آدرس توکن خروجی
- `amount` (uint64): مقدار خام برای swap (قبل از اعشار)

**پارامترهای اختیاری:**
- `slippageBps` (uint16): میزان slippage به basis points (مثلاً 50 = 0.5%)
- `swapMode` (string): `ExactIn` یا `ExactOut` (پیش‌فرض: ExactIn)
- `dexes` (string[]): محدود کردن به DEX های خاص (مثال: `Raydium,Orca+V2`)
- `excludeDexes` (string[]): حذف DEX های خاص
- `restrictIntermediateTokens` (boolean): محدود کردن توکن‌های میانی (پیش‌فرض: true)
- `onlyDirectRoutes` (boolean): فقط مسیرهای مستقیم (پیش‌فرض: false)
- `platformFeeBps` (uint16): کارمزد پلتفرم به basis points
- `maxAccounts` (uint64): حداکثر اکانت‌ها (پیش‌فرض: 64)
- `dynamicSlippage` (boolean): استفاده از slippage پویا (پیش‌فرض: false)

**پاسخ موفق:**
```json
{
  "inputMint": "So11111111111111111111111111111111111111112",
  "inAmount": "1000000000",
  "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "outAmount": "25000000",
  "otherAmountThreshold": "24875000",
  "swapMode": "ExactIn",
  "slippageBps": 50,
  "platformFee": {...},
  "priceImpactPct": "0.01",
  "routePlan": [...],
  "contextSlot": 123456789,
  "timeTaken": 0.123
}
```

### 2. Swap API - انجام معامله
**URL**: `POST https://lite-api.jup.ag/swap/v1/swap`

این endpoint از نتیجه `/quote` استفاده می‌کند و یک تراکنش امضا نشده base64 برمی‌گرداند.

### 3. Swap Instructions API
**URL**: `POST https://lite-api.jup.ag/swap/v1/swap-instructions`

برای دریافت دستورالعمل‌های swap که می‌توانید در تراکنش خود استفاده کنید.

### 4. Program ID to Label
**URL**: `GET https://lite-api.jup.ag/swap/v1/program-id-to-label`

یک hash برمی‌گرداند که کلید آن program ID و مقدار آن label است.

## نحوه استفاده در PumpX

### مرحله 1: دریافت قیمت
```javascript
const getQuote = async (inputMint, outputMint, amount) => {
  const url = `https://lite-api.jup.ag/swap/v1/quote?` +
    `inputMint=${inputMint}&` +
    `outputMint=${outputMint}&` +
    `amount=${amount}&` +
    `slippageBps=50&` +
    `platformFeeBps=50`; // 0.5% کارمزد برای PumpX
  
  const response = await fetch(url);
  return await response.json();
};
```

### مرحله 2: انجام Swap
```javascript
const executeSwap = async (quoteResponse, userPublicKey) => {
  const swapRequest = {
    quoteResponse,
    userPublicKey: userPublicKey.toString(),
    wrapAndUnwrapSol: true,
    feeAccount: "YOUR_FEE_ACCOUNT_ADDRESS" // کیف پول دریافت کارمزد PumpX
  };
  
  const response = await fetch('https://lite-api.jup.ag/swap/v1/swap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(swapRequest)
  });
  
  const { swapTransaction } = await response.json();
  
  // Deserialize و امضای تراکنش
  const transaction = Transaction.from(
    Buffer.from(swapTransaction, 'base64')
  );
  
  // امضا توسط کاربر
  const signedTransaction = await wallet.signTransaction(transaction);
  
  // ارسال به شبکه
  const txid = await connection.sendRawTransaction(
    signedTransaction.serialize()
  );
  
  return txid;
};
```

## ویژگی‌های کلیدی برای پیاده‌سازی

### 1. سیستم کارمزد پلتفرم
Jupiter اجازه می‌دهد کارمزد پلتفرم را در زمان swap دریافت کنید:
- از `platformFeeBps` در quote استفاده کنید (مثلاً 50 = 0.5%)
- `feeAccount` را در swap مشخص کنید
- کارمزد به صورت خودکار به کیف پول شما واریز می‌شود

### 2. Slippage Protection
- `slippageBps`: محافظت از کاربر در برابر تغییرات قیمت
- `dynamicSlippage`: استفاده از slippage پویا بر اساس شرایط بازار
- `otherAmountThreshold`: حداقل مقدار خروجی پس از slippage

### 3. Price Impact
- `priceImpactPct`: تاثیر معامله روی قیمت بازار
- هشدار به کاربر اگر price impact بالا باشد (>5%)

### 4. Route Optimization
- Jupiter به صورت خودکار بهترین مسیر را پیدا می‌کند
- می‌توانید DEX های خاص را انتخاب یا حذف کنید
- `onlyDirectRoutes` برای معاملات ساده‌تر

## نمونه کد کامل برای PumpX

```javascript
import { Connection, PublicKey, Transaction } from '@solana/web3.js';

class JupiterSwapService {
  constructor(connection, feeAccount) {
    this.connection = connection;
    this.feeAccount = feeAccount; // کیف پول دریافت کارمزد PumpX
    this.baseUrl = 'https://lite-api.jup.ag/swap/v1';
  }

  async getQuote(inputMint, outputMint, amount, slippageBps = 50) {
    const params = new URLSearchParams({
      inputMint,
      outputMint,
      amount: amount.toString(),
      slippageBps: slippageBps.toString(),
      platformFeeBps: '50', // 0.5% کارمزد PumpX
      restrictIntermediateTokens: 'true'
    });

    const response = await fetch(`${this.baseUrl}/quote?${params}`);
    if (!response.ok) {
      throw new Error('Failed to get quote');
    }
    return await response.json();
  }

  async swap(quoteResponse, userPublicKey, wallet) {
    const swapRequest = {
      quoteResponse,
      userPublicKey: userPublicKey.toString(),
      wrapAndUnwrapSol: true,
      feeAccount: this.feeAccount,
      dynamicComputeUnitLimit: true,
      prioritizationFeeLamports: 'auto'
    };

    const response = await fetch(`${this.baseUrl}/swap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(swapRequest)
    });

    if (!response.ok) {
      throw new Error('Swap failed');
    }

    const { swapTransaction } = await response.json();
    
    // Deserialize transaction
    const transaction = Transaction.from(
      Buffer.from(swapTransaction, 'base64')
    );

    // امضا توسط کاربر
    const signedTransaction = await wallet.signTransaction(transaction);

    // ارسال به شبکه
    const txid = await this.connection.sendRawTransaction(
      signedTransaction.serialize(),
      { skipPreflight: false, maxRetries: 3 }
    );

    // تایید تراکنش
    await this.connection.confirmTransaction(txid, 'confirmed');

    return txid;
  }

  async getPrice(inputMint, outputMint) {
    try {
      const quote = await this.getQuote(
        inputMint,
        outputMint,
        1000000000 // 1 token (با 9 اعشار)
      );
      
      const price = parseFloat(quote.outAmount) / parseFloat(quote.inAmount);
      return {
        price,
        priceImpact: parseFloat(quote.priceImpactPct),
        route: quote.routePlan
      };
    } catch (error) {
      console.error('Failed to get price:', error);
      return null;
    }
  }
}

// استفاده
const jupiterService = new JupiterSwapService(
  connection,
  'YOUR_FEE_WALLET_ADDRESS'
);

// دریافت قیمت
const priceInfo = await jupiterService.getPrice(
  'So11111111111111111111111111111111111111112', // SOL
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' // USDC
);

// انجام swap
const quote = await jupiterService.getQuote(
  inputMint,
  outputMint,
  amount
);

const txid = await jupiterService.swap(
  quote,
  userPublicKey,
  wallet
);
```

## نکات مهم

### 1. مدیریت خطا
- همیشه خطاهای API را handle کنید
- به کاربر پیام‌های واضح نمایش دهید
- retry logic برای تراکنش‌های ناموفق

### 2. UX بهتر
- نمایش loading state در حین دریافت quote
- نمایش estimated output قبل از تایید
- هشدار برای price impact بالا
- نمایش کارمزدهای مختلف (network + platform)

### 3. امنیت
- تایید تراکنش توسط کاربر قبل از امضا
- بررسی slippage قبل از ارسال
- محدودیت مقدار معامله برای جلوگیری از خطاهای بزرگ

### 4. بهینه‌سازی
- Cache کردن قیمت‌ها برای مدت کوتاه
- استفاده از WebSocket برای قیمت‌های real-time
- Batch processing برای چندین quote

## آدرس‌های توکن‌های محبوب Solana

```javascript
const TOKENS = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  RAY: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
  SRM: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt',
  // توکن PXP خود را اینجا اضافه کنید
  PXP: 'YOUR_PXP_TOKEN_ADDRESS'
};
```

---

**منبع**: Jupiter Developer Docs - https://dev.jup.ag/docs/api
