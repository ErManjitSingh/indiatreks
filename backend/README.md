# India Holiday Destinations — Backend API

Separate Express + TypeScript + MongoDB API for the treks platform.

**Base URL (production):** `https://api.treks.indiaholidaydestination.com/api/v1`  
**Swagger:** `/api/v1/docs`

## Stack

Node.js 20+, Express, MongoDB/Mongoose, JWT, Zod, Helmet, Redis-ready, Cloudinary, Socket.io, Nodemailer, Swagger, PM2.

## Quick start (local)

```bash
cd backend
cp .env.example .env
# edit MONGODB_URI + JWT secrets
npm install
npm run seed
npm run seed:treks   # after exporting treks.json
npm run dev
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | TSX watch server |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run compiled server |
| `npm run seed` | Admin + destinations |
| `npm run seed:admin` | Super admin only |
| `npm run seed:treks` | Upsert treks from `seed-data/treks.json` |

## API modules (`/api/v1`)

`/health` `/auth` `/users` `/treks` `/destinations` `/categories` `/blogs` `/bookings` `/payments` `/coupons` `/reviews` `/testimonials` `/media` `/faqs` `/newsletter` `/contacts` `/enquiries` `/seo` `/analytics` `/settings` `/notifications` `/search`

## Roles

`super_admin` `admin` `seo_manager` `booking_manager` `content_manager` `operations_manager` `sales_manager` `support_executive` `viewer` `customer`

## VPS deploy

```bash
# 1) MongoDB
bash /var/www/api.treks.indiaholidaydestination.com/app/backend/scripts/setup-mongodb.sh 'YOUR_STRONG_PASSWORD'

# 2) Env
cp backend/.env.example /var/www/api.treks.indiaholidaydestination.com/.env
# fill secrets

# 3) Deploy
bash /var/www/api.treks.indiaholidaydestination.com/app/backend/deploy.sh
```

Nginx reverse-proxy sample is in `nginx/api.treks.indiaholidaydestination.com.conf`.

## Frontend

Set in Next.js `.env`:

```
NEXT_PUBLIC_API_URL=https://api.treks.indiaholidaydestination.com/api/v1
```

Frontend API clients live in `src/lib/api/*` and `src/services/treks.service.ts`.
