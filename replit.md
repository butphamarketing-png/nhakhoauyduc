# Nha Khoa HT - Dental Clinic Website

Vietnamese dental clinic website with public landing page and admin dashboard.

## Stack
- **Monorepo**: pnpm workspace
- **Web**: React + Vite + TailwindCSS (`artifacts/nha-khoa-ht`, served at `/`)
- **API**: Express + Drizzle ORM (`artifacts/api-server`, served at `/api`)
- **Database**: PostgreSQL (Replit-provisioned)
- **Auth**: Cookie-based session for admin (`nkht_admin` cookie)
- **API Codegen**: OpenAPI spec at `lib/api-spec/openapi.yaml` -> `@workspace/api-client-react` and `@workspace/api-zod`

## Brand
- Hotline: **0974166440**
- Address: Quận 12, TP.HCM
- Colors: Blue `hsl(215,80%,35%)`, Gold `hsl(45,90%,55%)`, white
- Fonts: Poppins, Roboto

## Public Page Sections (`/`)
Header with hotline -> hero slideshow -> quick contact bar -> about -> services slider ->
5 commitments -> animated stats -> promotions -> testimonials -> booking form -> blog -> footer.
Floating call/zalo/booking buttons.

## Admin (`/admin`)
- Login: `/admin/login` (default: `admin@nhakhoaht.vn` / `admin123`)
- Pages: dashboard overview (charts), banners, services, promotions, feedback, posts, bookings, settings
- Booking statuses: `"Chưa xử lý"`, `"Đã liên hệ"`, `"Hoàn tất"`, `"Hủy"`

## Database (Drizzle, `lib/db/src/schema/index.ts`)
Tables: `admins`, `banners`, `services`, `promotions`, `feedback`, `posts`, `bookings`, `settings`

## Seeding
Seed script at `artifacts/api-server/src/seed.ts`. Run via:
```bash
pnpm exec esbuild artifacts/api-server/src/seed.ts --bundle --platform=node --format=esm \
  --outfile=artifacts/api-server/dist/seed.mjs \
  --banner:js="import { createRequire as __cr } from 'node:module'; globalThis.require = __cr(import.meta.url);"
node artifacts/api-server/dist/seed.mjs
```
