## English

**UniNote** is a sample Persian UI for a university notes sharing platform built with React + Vite. The app is UI-only and uses mock data (no backend).

### Features
- RTL-friendly layout with Vazirmatn Persian font
- Ready-made pages: Dashboard, Search, Upload, Messages, Profile, Leaderboard, etc.
- Mock data for users, notes, and notifications
- Responsive design via Tailwind CDN and Lucide icons

### Prerequisites
- Node.js 18+ (preferably 20+)
- npm (or compatible package manager)

### Setup
```bash
npm install
npm run dev
```
Then open `http://localhost:3000/` in your browser.

### Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build

### Project Structure
- `index.tsx` — React entry point
- `App.tsx` — routing and main layout (HashRouter)
- `pages/` — feature pages (Dashboard, Search, Upload, Profile, etc.)
- `constants.ts` — mock data and helpers
- `services/` — services (e.g., `geminiService.ts`)
- `index.html` — base template with Tailwind CDN and Persian font
- `vite.config.ts` — Vite config and alias

### Configuration
- Default port: `3000` (`vite.config.ts`)
- Uses HashRouter for easier static hosting
- Optional env: `GEMINI_API_KEY` for `services/geminiService.ts`

### Development Notes
- Data is static; wire up your own backend if needed.
- Styles load from Tailwind CDN; for production you can install Tailwind locally and enable purge.
- RTL by default; adjust `dir` and classes if you need LTR.

### License
Sample project with no specific license; review before production use.

---

## فارسی

**یونی‌نوت** یک رابط کاربری نمونه برای سامانه اشتراک جزوات دانشگاهی با React + Vite است. این پروژه فقط UI دارد و از داده‌های ماک استفاده می‌کند (بدون بک‌اند).

### ویژگی‌ها
- پشتیبانی کامل از راست‌به‌چپ و فونت فارسی Vazirmatn
- چندین صفحه آماده: داشبورد، جستجو، بارگذاری، پیام‌ها، پروفایل، لیدربورد و …
- داده‌های ماک برای کاربران، جزوات و اعلان‌ها
- طراحی واکنش‌گرا با Tailwind CDN و آیکون‌های Lucide

### پیش‌نیازها
- Node.js 18+ (ترجیحاً 20+)
- npm (یا هر مدیر بسته سازگار)

### راه‌اندازی
```bash
npm install
npm run dev
```
سپس مرورگر را روی `http://localhost:3000/` باز کنید.

### اسکریپت‌ها
- `npm run dev` — اجرای سرور توسعه Vite
- `npm run build` — ساخت خروجی تولید
- `npm run preview` — پیش‌نمایش خروجی ساخته‌شده

### ساختار پروژه
- `index.tsx` — نقطه ورود React
- `App.tsx` — مسیریابی و لایه‌بندی اصلی (HashRouter)
- `pages/` — صفحات مختلف (Dashboard، Search، Upload، Profile و …)
- `constants.ts` — داده‌های ماک و توابع کمکی
- `services/` — سرویس‌ها (مثلاً `geminiService.ts`)
- `index.html` — قالب پایه شامل Tailwind CDN و فونت فارسی
- `vite.config.ts` — پیکربندی Vite و alias

### پیکربندی
- پورت پیش‌فرض: `3000` (`vite.config.ts`)
- استفاده از HashRouter برای سازگاری با هاست‌های استاتیک
- متغیر محیطی اختیاری: `GEMINI_API_KEY` برای `services/geminiService.ts`

### نکات توسعه
- داده‌ها ثابت هستند؛ در صورت نیاز به API واقعی، به بک‌اند خود متصل شوید.
- استایل از Tailwind CDN بارگذاری می‌شود؛ برای تولید می‌توانید Tailwind را محلی نصب و purge را فعال کنید.
- UI راست‌به‌چپ است؛ در صورت نیاز به چپ‌به‌راست، مقدار `dir` و کلاس‌ها را تغییر دهید.

### لایسنس
پروژه نمونه است و لایسنس مشخصی ندارد؛ پیش از استفاده در محیط واقعی، بررسی‌های لازم را انجام دهید.

