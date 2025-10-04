# راهنمای استقرار PumpX

## پیش‌نیازها

### سرور
- VPS با Ubuntu 22.04+
- حداقل 2GB RAM
- 20GB فضای دیسک
- IP: 194.62.43.193

### نرم‌افزارها
- Node.js 20+
- Nginx
- PostgreSQL 14+
- Redis
- PM2 (برای مدیریت process)
- Certbot (برای SSL)

---

## مرحله 1: آماده‌سازی سرور

### اتصال به سرور
```bash
ssh root@194.62.43.193
```

### نصب Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### نصب PM2
```bash
sudo npm install -g pm2
```

### نصب Nginx
```bash
sudo apt update
sudo apt install nginx -y
```

### نصب PostgreSQL
```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### نصب Redis
```bash
sudo apt install redis-server -y
sudo systemctl start redis
sudo systemctl enable redis
```

---

## مرحله 2: تنظیم پایگاه داده

### ایجاد دیتابیس PostgreSQL
```bash
sudo -u postgres psql

CREATE DATABASE pumpx;
CREATE USER pumpx_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE pumpx TO pumpx_user;
\q
```

### اجرای Schema
```sql
-- در فایل schema.sql
-- (محتوای schema از معماری)
```

---

## مرحله 3: آپلود کد

### با Git
```bash
cd /var/www
git clone https://github.com/roshandell/full_signal-pro.git pumpx
cd pumpx
```

### یا با SCP
```bash
# از کامپیوتر محلی
scp -r pumpx-complete root@194.62.43.193:/var/www/pumpx
```

---

## مرحله 4: تنظیم Backend

```bash
cd /var/www/pumpx/pumpx-backend

# نصب dependencies
npm install --production

# کپی و ویرایش .env
cp .env.example .env
nano .env
```

### محتوای .env
```env
PORT=3001
NODE_ENV=production
DATABASE_URL=postgresql://pumpx_user:your_password@localhost:5432/pumpx
REDIS_HOST=localhost
REDIS_PORT=6379
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
OPENAI_API_KEY=your_openai_key
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=https://pumpx.info
```

### راه‌اندازی با PM2
```bash
pm2 start src/server.js --name pumpx-backend
pm2 save
pm2 startup
```

---

## مرحله 5: تنظیم Frontend

```bash
cd /var/www/pumpx/pumpx-platform

# نصب dependencies
npm install

# Build برای production
npm run build
```

---

## مرحله 6: تنظیم Nginx

### ایجاد فایل تنظیمات
```bash
sudo nano /etc/nginx/sites-available/pumpx.info
```

### محتوای فایل
```nginx
# Backend API
upstream backend {
    server localhost:3001;
}

# Frontend
server {
    listen 80;
    server_name pumpx.info www.pumpx.info;

    # Frontend static files
    root /var/www/pumpx/pumpx-platform/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Frontend routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket proxy
    location /ws {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }

    # Health check
    location /health {
        proxy_pass http://backend;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### فعال‌سازی سایت
```bash
sudo ln -s /etc/nginx/sites-available/pumpx.info /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## مرحله 7: تنظیم SSL با Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d pumpx.info -d www.pumpx.info
```

### تمدید خودکار
```bash
sudo certbot renew --dry-run
```

---

## مرحله 8: تنظیم Firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## مرحله 9: Monitoring و Logs

### مشاهده logs
```bash
# Backend logs
pm2 logs pumpx-backend

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### مانیتورینگ PM2
```bash
pm2 monit
```

---

## مرحله 10: Backup

### Backup دیتابیس
```bash
# ایجاد backup
pg_dump -U pumpx_user pumpx > backup_$(date +%Y%m%d).sql

# بازیابی backup
psql -U pumpx_user pumpx < backup_20251004.sql
```

### Backup کد
```bash
tar -czf pumpx_backup_$(date +%Y%m%d).tar.gz /var/www/pumpx
```

---

## به‌روزرسانی

### Backend
```bash
cd /var/www/pumpx/pumpx-backend
git pull
npm install
pm2 restart pumpx-backend
```

### Frontend
```bash
cd /var/www/pumpx/pumpx-platform
git pull
npm install
npm run build
sudo systemctl reload nginx
```

---

## عیب‌یابی

### Backend در حال اجرا نیست
```bash
pm2 status
pm2 logs pumpx-backend
pm2 restart pumpx-backend
```

### خطای دیتابیس
```bash
sudo systemctl status postgresql
sudo -u postgres psql -c "SELECT version();"
```

### خطای Nginx
```bash
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

### خطای SSL
```bash
sudo certbot certificates
sudo certbot renew
```

---

## بهینه‌سازی Performance

### PM2 Cluster Mode
```bash
pm2 start src/server.js -i max --name pumpx-backend
```

### Redis Caching
- فعال‌سازی caching برای API responses
- TTL مناسب برای هر endpoint

### CDN
- استفاده از Cloudflare برای static assets
- فعال‌سازی caching و minification

### Database Optimization
```sql
-- Indexes
CREATE INDEX idx_tokens_creator ON tokens(creator_id);
CREATE INDEX idx_tokens_graduated ON tokens(graduated);
CREATE INDEX idx_transactions_user ON transactions(user_id);
```

---

## امنیت

### تنظیمات اضافی
```bash
# محدود کردن دسترسی SSH
sudo nano /etc/ssh/sshd_config
# PermitRootLogin no
# PasswordAuthentication no

# Fail2ban
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
```

### Environment Variables
- هرگز API keys را commit نکنید
- از .env برای تمام secrets استفاده کنید
- دسترسی به .env را محدود کنید

---

## پشتیبانی

در صورت بروز مشکل:
1. Logs را بررسی کنید
2. Status سرویس‌ها را چک کنید
3. به تیم پشتیبانی مراجعه کنید

---

**موفق باشید! 🚀**
