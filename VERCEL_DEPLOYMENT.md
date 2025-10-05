# PumpX Vercel Deployment Guide

## Project Structure

This is a full-stack application with:
- **Frontend**: React app in `pumpx-platform/` directory
- **Backend**: Node.js/Express API in `pumpx-backend/` directory  
- **Static Files**: HTML/CSS/JS in root directory

## Deployment Options

### Option 1: Deploy Full Stack (Recommended)

Deploy both frontend and backend together:

```bash
# From root directory
vercel --prod
```

This will:
- Build the React frontend automatically
- Deploy the backend as serverless functions
- Serve the static HTML files from root

### Option 2: Deploy Components Separately

#### Deploy Frontend Only
```bash
cd pumpx-platform
vercel --prod
```

#### Deploy Backend Only  
```bash
cd pumpx-backend
vercel --prod
```

#### Deploy Static Site Only
```bash
# From root directory (excluding subdirectories)
vercel --prod
```

## Environment Variables

Set these in Vercel dashboard or via CLI:

### Backend Variables
```
NODE_ENV=production
CORS_ORIGIN=*
DATABASE_URL=your-database-url
REDIS_URL=your-redis-url
JWT_SECRET=your-jwt-secret
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_PRIVATE_KEY=your-solana-private-key
OPENAI_API_KEY=your-openai-api-key
```

### Frontend Variables (if needed)
```
VITE_API_URL=your-backend-api-url
VITE_SOLANA_NETWORK=mainnet-beta
```

## Configuration Files

- `vercel.json` - Root deployment config
- `pumpx-platform/vercel.json` - Frontend-specific config
- `pumpx-backend/vercel.json` - Backend-specific config

## Build Commands

- **Frontend**: `npm run build` (outputs to `dist/`)
- **Backend**: No build needed (serverless functions)
- **Static**: No build needed (served directly)

## API Endpoints

After deployment, the backend will be available at:
- `/api/v1/auth` - Authentication
- `/api/v1/tokens` - Token management
- `/api/v1/swap` - Token swapping
- `/api/v1/ai` - AI services
- `/api/v1/user` - User management
- `/api/v1/stats` - Statistics

## Troubleshooting

1. **Build Failures**: Check package.json dependencies
2. **Route Issues**: Verify vercel.json routing configuration
3. **CORS Errors**: Update CORS_ORIGIN environment variable
4. **Database**: Ensure DATABASE_URL is set correctly

## Local Development

```bash
# Frontend
cd pumpx-platform
npm install
npm run dev

# Backend  
cd pumpx-backend
npm install
npm run dev

# Static site
# Serve index.html directly or use a local server
```

## Production URLs

After deployment, you'll get URLs like:
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-project.vercel.app/api`
- Static: `https://your-project.vercel.app` (if deployed from root)
