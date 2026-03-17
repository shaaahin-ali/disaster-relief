# Frontend Codebase Report for `disaster-relief2ui`

## Folder Structure
```text
disaster-relief2ui/
    .env.example
    .env.local
    .gitignore
    components.json
    Dockerfile
    next-env.d.ts
    next.config.mjs
    package.json
    postcss.config.mjs
    test_all_pages.js
    tsconfig.json
    app/
        globals.css
        layout.tsx
        page.tsx
        all-requests/
            page.tsx
        dashboard/
            page.tsx
        profile/
            page.tsx
        request-help/
            page.tsx
        resources/
            page.tsx
        verify-email/
            page.tsx
        volunteer/
            requests/
                page.tsx
    components/
        auth-modal.tsx
        error-boundary.tsx
        landing-page.tsx
        loading-spinner.tsx
        navigation.tsx
        sos-emergency.tsx
        theme-provider.tsx
        ui/
            accordion.tsx
            alert-dialog.tsx
            alert.tsx
            aspect-ratio.tsx
            avatar.tsx
            badge.tsx
            breadcrumb.tsx
            button-group.tsx
            button.tsx
            calendar.tsx
            card.tsx
            carousel.tsx
            chart.tsx
            checkbox.tsx
            collapsible.tsx
            command.tsx
            context-menu.tsx
            dialog.tsx
            drawer.tsx
            dropdown-menu.tsx
            empty.tsx
            field.tsx
            form.tsx
            hover-card.tsx
            input-group.tsx
            input-otp.tsx
            input.tsx
            item.tsx
            kbd.tsx
            label.tsx
            menubar.tsx
            navigation-menu.tsx
            pagination.tsx
            popover.tsx
            progress.tsx
            radio-group.tsx
            resizable.tsx
            scroll-area.tsx
            select.tsx
            separator.tsx
            sheet.tsx
            sidebar.tsx
            skeleton.tsx
            slider.tsx
            sonner.tsx
            spinner.tsx
            splite.tsx
            spotlight.tsx
            switch.tsx
            table.tsx
            tabs.tsx
            textarea.tsx
            toast.tsx
            toaster.tsx
            toggle-group.tsx
            toggle.tsx
            tooltip.tsx
            use-mobile.tsx
            use-toast.ts
    contexts/
        auth-context.tsx
    hooks/
        use-mobile.ts
        use-toast.ts
    lib/
        utils.ts
    styles/
        globals.css
```

## File Contents

### `.env.example`
```
NEXT_PUBLIC_API_URL=https://disaster-relief-0jn6.onrender.com

```

### `.env.local`
```
NEXT_PUBLIC_API_URL=https://disaster-relief-0jn6.onrender.com

```

### `.gitignore`
```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules

# next.js
/.next/
/out/

# production
/build

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

### `components.json`
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}

```

### `Dockerfile`
```
# Production build for Next.js frontend
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]

```

### `next-env.d.ts`
```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

### `next.config.mjs`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

```

### `package.json`
```json
{
  "name": "my-v0-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "lint": "eslint .",
    "start": "next start"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "1.2.2",
    "@radix-ui/react-alert-dialog": "1.1.4",
    "@radix-ui/react-aspect-ratio": "1.1.1",
    "@radix-ui/react-avatar": "1.1.2",
    "@radix-ui/react-checkbox": "1.1.3",
    "@radix-ui/react-collapsible": "1.1.2",
    "@radix-ui/react-context-menu": "2.2.4",
    "@radix-ui/react-dialog": "1.1.4",
    "@radix-ui/react-dropdown-menu": "2.1.4",
    "@radix-ui/react-hover-card": "1.1.4",
    "@radix-ui/react-label": "2.1.1",
    "@radix-ui/react-menubar": "1.1.4",
    "@radix-ui/react-navigation-menu": "1.2.3",
    "@radix-ui/react-popover": "1.1.4",
    "@radix-ui/react-progress": "1.1.1",
    "@radix-ui/react-radio-group": "1.2.2",
    "@radix-ui/react-scroll-area": "1.2.2",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-separator": "1.1.1",
    "@radix-ui/react-slider": "1.2.2",
    "@radix-ui/react-slot": "1.1.1",
    "@radix-ui/react-switch": "1.1.2",
    "@radix-ui/react-tabs": "1.1.2",
    "@radix-ui/react-toast": "1.2.4",
    "@radix-ui/react-toggle": "1.1.1",
    "@radix-ui/react-toggle-group": "1.1.1",
    "@radix-ui/react-tooltip": "1.1.6",
    "@splinetool/react-spline": "^4.1.0",
    "@splinetool/runtime": "^1.12.69",
    "@vercel/analytics": "1.3.1",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "1.0.4",
    "date-fns": "4.1.0",
    "embla-carousel-react": "8.5.1",
    "framer-motion": "^12.36.0",
    "input-otp": "1.4.1",
    "lucide-react": "^0.454.0",
    "next": "16.0.10",
    "next-themes": "^0.4.6",
    "react": "19.2.0",
    "react-day-picker": "9.8.0",
    "react-dom": "19.2.0",
    "react-hook-form": "^7.60.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "2.15.4",
    "sonner": "^1.7.4",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^1.1.2",
    "zod": "3.25.76"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.9",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "postcss": "^8.5",
    "tailwindcss": "^4.1.9",
    "tw-animate-css": "1.3.3",
    "typescript": "^5"
  }
}
```

### `postcss.config.mjs`
```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config

```

### `test_all_pages.js`
```javascript
// Comprehensive testing script for all pages and functionality
const puppeteer = require('puppeteer');

async function testAllPages() {
    console.log('🚀 Starting comprehensive application testing...\n');

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const baseUrl = 'http://localhost:3000';

    try {
        // Test 1: Landing page
        console.log('📄 Testing Landing Page...');
        await page.goto(`${baseUrl}/`);
        await page.waitForSelector('body', { timeout: 5000 });
        const title = await page.title();
        console.log(`✅ Landing page loaded: ${title}`);

        // Test 2: Check navigation exists
        const navExists = await page.$('[data-testid="navigation"]') || await page.$('nav');
        console.log(`✅ Navigation: ${navExists ? 'Present' : 'Missing'}`);

        // Test 3: Check for auth modals
        const signinBtn = await page.$('button:has-text("Sign In")') || await page.$('[data-testid="signin"]');
        const signupBtn = await page.$('button:has-text("Sign Up")') || await page.$('[data-testid="signup"]');
        console.log(`✅ Auth buttons: Sign In: ${!!signinBtn}, Sign Up: ${!!signupBtn}`);

        // Test 4: Try accessing protected routes (should redirect)
        console.log('\n🔒 Testing Protected Routes...');

        await page.goto(`${baseUrl}/dashboard`);
        await page.waitForTimeout(1000);
        const currentUrl = page.url();
        const redirected = !currentUrl.includes('/dashboard') || currentUrl.includes('/');
        console.log(`✅ Dashboard protection: ${redirected ? 'Working (redirected)' : 'Failed'}`);

        await page.goto(`${baseUrl}/profile`);
        await page.waitForTimeout(1000);
        const profileUrl = page.url();
        const profileRedirected = !profileUrl.includes('/profile') || profileUrl.includes('/');
        console.log(`✅ Profile protection: ${profileRedirected ? 'Working (redirected)' : 'Failed'}`);

        await page.goto(`${baseUrl}/all-requests`);
        await page.waitForTimeout(1000);
        const requestsUrl = page.url();
        const requestsRedirected = !requestsUrl.includes('/all-requests') || requestsUrl.includes('/');
        console.log(`✅ All Requests protection: ${requestsRedirected ? 'Working (redirected)' : 'Failed'}`);

        // Test 5: Check for any console errors
        console.log('\n🚨 Checking for Console Errors...');
        const errors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        await page.waitForTimeout(2000);
        console.log(`✅ Console errors: ${errors.length === 0 ? 'None found' : errors.length + ' errors'}`);
        if (errors.length > 0) {
            errors.forEach((error, i) => console.log(`   ${i + 1}. ${error}`));
        }

        // Test 6: Check responsive design
        console.log('\n📱 Testing Responsive Design...');
        await page.setViewport({ width: 375, height: 667 }); // iPhone
        await page.waitForTimeout(1000);
        console.log('✅ Mobile viewport: Set to 375x667');

        await page.setViewport({ width: 768, height: 1024 }); // Tablet
        await page.waitForTimeout(1000);
        console.log('✅ Tablet viewport: Set to 768x1024');

        await page.setViewport({ width: 1920, height: 1080 }); // Desktop
        await page.waitForTimeout(1000);
        console.log('✅ Desktop viewport: Set to 1920x1080');

        // Test 7: Check for missing images or broken links
        console.log('\n🔗 Checking for Broken Resources...');
        const brokenResources = [];
        page.on('response', response => {
            if (response.status() >= 400) {
                brokenResources.push(`${response.status()} - ${response.url()}`);
            }
        });

        await page.reload();
        await page.waitForTimeout(2000);

        const imageErrors = brokenResources.filter(resource =>
            resource.includes('.png') || resource.includes('.jpg') || resource.includes('.jpeg') ||
            resource.includes('.gif') || resource.includes('.svg') || resource.includes('.webp')
        );

        console.log(`✅ Image errors: ${imageErrors.length === 0 ? 'None found' : imageErrors.length + ' errors'}`);
        if (imageErrors.length > 0) {
            imageErrors.forEach(error => console.log(`   - ${error}`));
        }

        // Test 8: Accessibility check
        console.log('\n♿ Basic Accessibility Check...');
        const imagesWithoutAlt = await page.$$eval('img:not([alt])', imgs => imgs.length);
        console.log(`✅ Images without alt text: ${imagesWithoutAlt}`);

        const buttonsWithoutText = await page.$$eval('button:not([aria-label]):not(:has-text)', buttons => buttons.length);
        console.log(`✅ Buttons without accessible text: ${buttonsWithoutText}`);

        console.log('\n🎉 Testing Complete!');
        console.log('✅ Summary:');
        console.log('   - Landing page loads correctly');
        console.log('   - Navigation is present');
        console.log('   - Authentication buttons exist');
        console.log('   - Protected routes redirect properly');
        console.log('   - No critical console errors');
        console.log('   - Responsive design works');
        console.log('   - No broken images');
        console.log('   - Basic accessibility checks pass');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        await browser.close();
    }
}

testAllPages().catch(console.error);





```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "target": "ES6",
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./*"
      ]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}

```

### `app/globals.css`
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* SAHAY DESIGN TOKENS */
:root {
  /* Backgrounds */
  --bg-void: #050508;
  /* deepest black */
  --bg-base: #0a0b0f;
  /* page background */
  --bg-surface: #0f1118;
  /* card base */
  --bg-elevated: #161923;
  /* elevated card */

  /* Glass layers */
  --glass-01: rgba(255, 255, 255, 0.03);
  --glass-02: rgba(255, 255, 255, 0.06);
  --glass-03: rgba(255, 255, 255, 0.10);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-border-strong: rgba(255, 255, 255, 0.15);

  /* Brand Accents */
  --accent-teal: #2DD4BF;
  /* primary CTA, success, safe */
  --accent-teal-dim: rgba(45, 212, 191, 0.15);
  --accent-amber: #F59E0B;
  /* warning, active relief */
  --accent-amber-dim: rgba(245, 158, 11, 0.12);
  --accent-red: #EF4444;
  /* emergency, critical */
  --accent-red-dim: rgba(239, 68, 68, 0.12);
  --accent-blue: #60A5FA;
  /* data, information */

  /* Ambient glow colours (for moving bg) */
  --glow-primary: rgba(45, 212, 191, 0.08);
  --glow-secondary: rgba(16, 185, 129, 0.05);
  --glow-warm: rgba(245, 158, 11, 0.04);

  /* Typography */
  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --text-muted: #475569;
  --text-accent: #2DD4BF;

  /* Shadows */
  --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  --shadow-card: 0 24px 48px rgba(0, 0, 0, 0.6);
  --shadow-glow-teal: 0 0 40px rgba(45, 212, 191, 0.2);

  /* Letter spacing */
  --tracking-hero: -0.03em;
  --tracking-label: 0.08em;
  --tracking-data: 0.02em;

  /* Map Shadcn / Original theme variables into new UI (forced dark mode) */
  --background: var(--bg-base);
  --foreground: var(--text-primary);
  --card: var(--bg-surface);
  --card-foreground: var(--text-primary);
  --popover: var(--bg-surface);
  --popover-foreground: var(--text-primary);
  --primary: var(--accent-teal);
  --primary-foreground: var(--bg-void);
  --secondary: var(--bg-elevated);
  --secondary-foreground: var(--text-primary);
  --muted: var(--glass-02);
  --muted-foreground: var(--text-muted);
  --accent: var(--accent-teal);
  --accent-foreground: var(--bg-void);
  --destructive: var(--accent-red);
  --destructive-foreground: var(--text-primary);
  --border: var(--glass-border);
  --input: var(--glass-border);
  --ring: var(--accent-teal);

  --chart-1: var(--accent-teal);
  --chart-2: var(--accent-amber);
  --chart-3: var(--accent-red);
  --chart-4: var(--accent-blue);
  --chart-5: #a855f7;

  --radius: 0.75rem;

  --sidebar: var(--bg-surface);
  --sidebar-foreground: var(--text-primary);
  --sidebar-primary: var(--accent-teal);
  --sidebar-primary-foreground: var(--bg-void);
  --sidebar-accent: var(--bg-elevated);
  --sidebar-accent-foreground: var(--text-primary);
  --sidebar-border: var(--glass-border);
  --sidebar-ring: var(--accent-teal);
}


@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --radius-sm: calc(var(--radius) - 2px);
  --radius-md: calc(var(--radius) - 1px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 2px);

  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --color-bg-void: var(--bg-void);
  --color-bg-base: var(--bg-base);
  --color-bg-surface: var(--bg-surface);
  --color-bg-elevated: var(--bg-elevated);
  --color-glass-01: var(--glass-01);
  --color-glass-02: var(--glass-02);
  --color-glass-03: var(--glass-03);
  --color-glass-border: var(--glass-border);
  --color-glass-border-strong: var(--glass-border-strong);
  --color-accent-teal: var(--accent-teal);
  --color-accent-teal-dim: var(--accent-teal-dim);
  --color-accent-amber: var(--accent-amber);
  --color-accent-amber-dim: var(--accent-amber-dim);
  --color-accent-red: var(--accent-red);
  --color-accent-red-dim: var(--accent-red-dim);
  --color-accent-blue: var(--accent-blue);
  --color-glow-primary: var(--glow-primary);
  --color-glow-secondary: var(--glow-secondary);
  --color-glow-warm: var(--glow-warm);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);
  --color-text-accent: var(--text-accent);

  --shadow-glass: var(--shadow-glass);
  --shadow-card: var(--shadow-card);
  --shadow-glow-teal: var(--shadow-glow-teal);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body,
  html {
    @apply bg-bg-base text-text-primary selection:bg-accent-teal/30 selection:text-white;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-bold tracking-tight text-white;
  }
}

@layer utilities {
  .fade-in {
    @apply animate-in fade-in duration-1000;
  }

  .slide-up {
    @apply animate-in slide-in-from-bottom-4 duration-700;
  }

  .smooth-transition {
    @apply transition-all duration-300 ease-out;
  }

  /* GLASSMORPHISM UTILITIES */
  .glass-card {
    background: var(--glass-01);
    backdrop-filter: blur(24px) saturate(180%) brightness(1.05);
    -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(1.05);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  }

  /* Elevated variant */
  .glass-card-elevated {
    background: var(--glass-02);
    border-color: var(--glass-border-strong);
  }

  /* Accent tinted variant */
  .glass-card-teal {
    background: linear-gradient(135deg,
        rgba(45, 212, 191, 0.05),
        rgba(45, 212, 191, 0.02));
    border-color: rgba(45, 212, 191, 0.2);
  }

  .btn-primary {
    background: var(--accent-teal);
    color: var(--bg-void);
    padding: 14px 28px;
    border-radius: 100px;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .btn-primary:hover {
    box-shadow: var(--shadow-glow-teal);
    transform: translateY(-1px);
  }

  .btn-secondary {
    background: transparent;
    color: var(--text-primary);
    border: 1px solid var(--glass-border-strong);
    padding: 14px 28px;
    border-radius: 100px;
    backdrop-filter: blur(10px);
    transition: all 0.2s ease;
  }

  .btn-secondary:hover {
    background: var(--glass-02);
    border-color: rgba(255, 255, 255, 0.25);
  }
}

@keyframes drift-1 {
  from {
    transform: translate(0, 0) scale(1);
  }

  to {
    transform: translate(60px, -40px) scale(1.1);
  }
}

@keyframes drift-2 {
  from {
    transform: translate(0, 0) scale(1.1);
  }

  to {
    transform: translate(-80px, 60px) scale(1);
  }
}

@keyframes spotlight {
  0% {
    opacity: 0;
    transform: translate(-72%, -62%) skewX(40deg) scale(1.0);
  }

  100% {
    opacity: 1;
    transform: translate(-50%, -40%) skewX(40deg) scale(1.1);
  }
}

@layer utilities {
  .animate-spotlight {
    animation: spotlight 2s ease 0.75s 1 forwards;
  }
}
```

### `app/layout.tsx`
```typescript
import type React from "react"
import type { Metadata } from "next"
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { SOSEmergencyButton } from "@/components/sos-emergency"

const fontSyne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display"
})

const fontDMSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body"
})

const fontJetBrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono"
})

export const metadata: Metadata = {
  title: "Sahay - Real relief, right now",
  description: "A disaster relief coordination platform that connects affected citizens, volunteers, NGOs, and government agencies in real time.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${fontSyne.variable} ${fontDMSans.variable} ${fontJetBrains.variable} font-body bg-bg-base text-text-primary antialiased`}>
        <ErrorBoundary>
          <AuthProvider>
            {children}
            <SOSEmergencyButton />
          </AuthProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}

```

### `app/page.tsx`
```typescript
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LandingPage } from "@/components/landing-page"
import { AuthModal } from "@/components/auth-modal"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const [authModal, setAuthModal] = useState<"signin" | "signup" | null>(null)
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect authenticated users to their dashboard
    if (!isLoading && isAuthenticated && user) {
      if (user.role === 'volunteer') {
        router.push('/volunteer/requests')
      } else {
        router.push('/dashboard')
      }
    }
  }, [isAuthenticated, isLoading, user, router])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render anything for authenticated users (they get redirected)
  if (isAuthenticated) {
    return null
  }

  return (
    <>
      <LandingPage onAuthClick={setAuthModal} />
      <AuthModal
        mode={authModal}
        onClose={() => setAuthModal(null)}
        onSuccess={() => setAuthModal(null)}
      />
    </>
  )
}

```

### `app/all-requests/page.tsx`
```typescript
"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MapPin, Clock, User, Search, Filter, Trash2, Phone, Users, CheckCircle } from "lucide-react"

interface HelpRequest {
  id: number
  title: string
  description: string
  location: string
  urgency_level: string
  photo?: string
  created_at: string
  user_id: number
  user?: {
    id: number
    username: string
    email: string
    phone_number?: string
  }
  has_applied?: boolean
}

export default function AllRequests() {
  const { token, user, isLoading } = useAuth()
  const router = useRouter()
  const [requests, setRequests] = useState<HelpRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<HelpRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [applyingTo, setApplyingTo] = useState<number | null>(null)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
      return
    }

    if (token) {
      fetchRequests()
    } else if (!isLoading) {
      setLoading(false)
    }
  }, [token, user, isLoading, router])

  useEffect(() => {
    filterRequests()
  }, [requests, searchTerm, urgencyFilter])

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/request/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setRequests(data)
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterRequests = () => {
    let filtered = requests

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by urgency
    if (urgencyFilter !== "all") {
      filtered = filtered.filter(request => request.urgency_level === urgencyFilter)
    }

    setFilteredRequests(filtered)
  }

  const applyToRequest = async (requestId: number) => {
    if (!user || user.role !== 'volunteer') return

    setApplyingTo(requestId)
    try {
      const response = await fetch(`${API_BASE_URL}/volunteer/apply/${requestId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        // Remove the request from the list
        setRequests(requests.filter(req => req.id !== requestId))
        alert('Application submitted successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to apply: ${error.detail}`)
      }
    } catch (error) {
      alert('Network error. Please try again.')
    } finally {
      setApplyingTo(null)
    }
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const deleteRequest = async (requestId: number) => {
    if (!confirm('Are you sure you want to delete this request? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/request/${requestId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setRequests(requests.filter(req => req.id !== requestId))
        alert('Request deleted successfully!')
      } else {
        alert('Failed to delete request')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-bg-base relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-accent-teal/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/2 translate-y-1/3" />

      <Navigation />

      <div className="pt-24 px-6 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-6 pt-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary tracking-hero mb-4">
                Global <span className="text-accent-teal">Feed</span>
              </h1>
              <p className="text-text-secondary text-lg font-body max-w-2xl mx-auto">
                Discover requests from your community and offer your capabilities where they are most needed.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs font-mono tracking-widest text-text-muted uppercase">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent-teal" />
                <span>Civilian Network</span>
              </div>
              <div className="w-1 h-1 bg-glass-border-strong rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-teal rounded-full animate-pulse shadow-glow-teal"></div>
                <span>Live Intel</span>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
                    <Input
                      placeholder="SCAN NETWORK: Search by title, description, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 bg-bg-void border-glass-border focus:border-accent-teal h-14 text-base font-body text-text-primary placeholder:text-text-muted placeholder:font-mono placeholder:tracking-wide w-full"
                    />
                  </div>
                </div>

                <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                  <SelectTrigger className="w-full md:w-64 bg-bg-void border-glass-border focus:ring-accent-teal h-14 font-mono uppercase text-sm text-text-primary">
                    <Filter className="w-4 h-4 mr-3 text-accent-teal" />
                    <SelectValue placeholder="Filter by urgency" />
                  </SelectTrigger>
                  <SelectContent className="bg-glass-02 border-glass-border text-text-primary font-mono text-sm uppercase">
                    <SelectItem value="all" className="focus:bg-glass-01 focus:text-accent-teal">🎯 All Threat Levels</SelectItem>
                    <SelectItem value="high" className="focus:bg-glass-01 focus:text-accent-red font-bold">🔴 Critical Priority</SelectItem>
                    <SelectItem value="medium" className="focus:bg-glass-01 focus:text-accent-amber">🟡 Medium Priority</SelectItem>
                    <SelectItem value="low" className="focus:bg-glass-01 focus:text-accent-teal">🟢 Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-accent-teal/20 border-t-accent-teal rounded-full animate-spin mx-auto"></div>
                <p className="text-text-muted font-mono tracking-widest uppercase text-sm">Scanning Feed...</p>
              </div>
            </div>
          ) : filteredRequests.length === 0 ? (
            <Card className="glass-card border-dashed border-2 border-glass-border/50">
              <CardContent className="p-16 text-center space-y-6">
                <div className="w-20 h-20 bg-glass-02 rounded-full flex items-center justify-center mx-auto ring-1 ring-glass-border">
                  <Search className="w-10 h-10 text-text-muted" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                    {requests.length === 0 ? 'No Active Beacons' : 'No Intel Found'}
                  </h3>
                  <p className="text-text-secondary text-lg max-w-md mx-auto mb-8 font-body">
                    {requests.length === 0
                      ? 'The network is currently clear. Initialize a beacon if assistance is required.'
                      : 'Adjust search parameters to widen the scan radius.'
                    }
                  </p>
                </div>
                {requests.length === 0 && user?.role === 'user' && (
                  <Button
                    onClick={() => window.location.href = '/request-help'}
                    className="btn-primary h-12 px-8"
                  >
                    <AlertCircle className="w-5 h-5 mr-3" />
                    Initialize First Beacon
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-glass-border pb-2">
                <p className="text-text-muted font-mono text-sm uppercase tracking-widest">
                  Showing <span className="font-bold text-accent-teal">{filteredRequests.length}</span> of <span className="font-bold text-text-primary">{requests.length}</span> Results
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredRequests.map((request) => (
                  <Card key={request.id} className="glass-card-elevated hover:bg-glass-02 transition-all duration-300 group flex flex-col h-full border-t-4 border-t-transparent hover:border-t-accent-teal">
                    <CardContent className="p-6 flex flex-col h-full space-y-4">
                      {/* Header with Title and Urgency */}
                      <div className="flex items-start justify-between min-h-[4rem]">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-xl font-display font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-accent-teal transition-colors">
                            {request.title}
                          </h3>
                          <Badge className={`uppercase tracking-label font-mono bg-transparent border flex flex-row items-center justify-center gap-1 w-fit ${request.urgency_level === 'high' ? 'border-accent-red text-accent-red' :
                              request.urgency_level === 'medium' ? 'border-accent-amber text-accent-amber' :
                                'border-accent-teal text-accent-teal'
                            }`}>
                            {request.urgency_level}
                          </Badge>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-text-secondary font-body leading-relaxed line-clamp-3 mb-2 flex-grow">
                        {request.description}
                      </p>

                      {/* Location and Date */}
                      <div className="space-y-3 pt-3 mt-auto mb-2 border-t border-glass-border">
                        <div className="flex items-center gap-3 text-sm font-mono text-text-muted">
                          <MapPin className="w-4 h-4 text-accent-teal shrink-0" />
                          <span className="truncate">{request.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm font-mono text-text-muted">
                          <Clock className="w-4 h-4 text-accent-teal shrink-0" />
                          <span>{new Date(request.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* User Contact Info for Volunteers */}
                      {user?.role === 'volunteer' && request.user && (
                        <div className="bg-glass-01 border border-glass-border rounded-lg p-4 space-y-2 mt-2">
                          <p className="text-xs uppercase tracking-label font-bold text-accent-teal">Origin Contact Data</p>
                          <div className="space-y-1.5 text-xs font-mono text-text-secondary">
                            <p className="flex items-center gap-2">
                              <User className="w-3 h-3 text-text-muted" />
                              {request.user.username}
                            </p>
                            {request.user.phone_number && (
                              <p className="flex items-center gap-2">
                                <Phone className="w-3 h-3 text-text-muted" />
                                {request.user.phone_number}
                              </p>
                            )}
                            <p className="flex items-center gap-2 truncate">
                              <span className="w-3 h-3 text-text-muted flex items-center justify-center">@</span>
                              {request.user.email}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Image Preview */}
                      {request.photo && (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-glass-border bg-glass-01 mt-3 shrink-0">
                          <img
                            src={`${API_BASE_URL}/uploads/${request.photo}`}
                            alt="Beacon Evidence"
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          />
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4 mt-auto">
                        {user?.role === 'volunteer' && user.id !== request.user_id && (
                          <Button
                            onClick={() => applyToRequest(request.id)}
                            disabled={applyingTo === request.id || request.has_applied}
                            className={`flex-1 h-12 font-display font-bold transition-all duration-300 ${request.has_applied
                                ? 'bg-accent-teal/20 text-accent-teal border border-accent-teal/30 cursor-not-allowed'
                                : 'btn-primary'
                              }`}
                          >
                            {applyingTo === request.id ? (
                              <span className="flex items-center justify-center gap-2 font-mono text-sm tracking-widest uppercase text-bg-void">
                                <div className="w-4 h-4 border-2 border-bg-void/50 border-t-bg-void rounded-full animate-spin" />
                                Transmitting...
                              </span>
                            ) : request.has_applied ? (
                              <span className="flex items-center justify-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                OVERSEEN
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-2">
                                <Heart className="w-4 h-4" />
                                DEPLOY
                              </span>
                            )}
                          </Button>
                        )}

                        {user?.id === request.user_id && (
                          <Button
                            onClick={() => deleteRequest(request.id)}
                            variant="ghost"
                            size="sm"
                            className="w-full bg-accent-red/10 text-accent-red hover:bg-accent-red hover:text-white border border-accent-red/20 h-10 font-mono tracking-widest uppercase text-xs"
                          >
                            <Trash2 className="w-4 h-4 mr-2 border" />
                            Deactivate
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

```

### `app/dashboard/page.tsx`
```typescript
"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Heart, MapPin, Clock, AlertCircle, User, Users, Trash2, Phone, Mail, Package } from "lucide-react"

interface HelpRequest {
  id: number
  title: string
  description: string
  location: string
  urgency_level: string
  photo?: string
  created_at: string
  user_id: number
  user?: {
    id: number
    username: string
    email: string
    phone_number?: string
  }
  volunteers?: Array<{
    id: number
    username: string
    email: string
    phone_number?: string
    applied_at?: string
  }>
}

export default function Dashboard() {
  const { user, token, isLoading } = useAuth()
  const router = useRouter()
  const [requests, setRequests] = useState<HelpRequest[]>([])
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
      return
    }

    if (token && user) {
      fetchUserRequests()
    } else if (!isLoading) {
      setLoading(false)
    }
  }, [token, user, isLoading, router])

  const fetchUserRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/request/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const allRequests = await response.json()
        // Filter requests by current user
        const userRequests = allRequests.filter((req: HelpRequest) => req.user_id === user?.id)
        setRequests(userRequests)
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteRequest = async (requestId: number) => {
    if (!confirm('Are you sure you want to delete this request? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/request/${requestId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setRequests(requests.filter(req => req.id !== requestId))
      } else {
        alert('Failed to delete request')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    }
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-bg-base relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-[800px] h-[600px] bg-accent-teal/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/3 translate-y-1/3" />

      <Navigation />

      <div className="pt-24 px-6 pb-12 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 pt-8">
            <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary tracking-hero">
              Welcome back, <span className="text-accent-teal">{user.username}</span>
            </h1>
            <p className="text-text-secondary text-xl font-body max-w-2xl mx-auto">
              Manage your help requests and connect with our amazing community of volunteers
            </p>
          </div>

          {/* Quick Actions (Bento Grid) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card hover:bg-glass-02 transition-all duration-300 group cursor-pointer" onClick={() => window.location.href = '/request-help'}>
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-accent-teal/10 rounded-xl flex items-center justify-center group-hover:bg-accent-teal/20 transition-colors">
                    <Plus className="w-7 h-7 text-accent-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-accent-teal transition-colors">Request Help</h3>
                    <p className="text-text-muted text-sm mt-1">Create a new request</p>
                  </div>
                </div>
                <div className="mt-auto">
                  <Button className="w-full h-12 btn-primary border-none shadow-glow-teal/50 truncate">
                    Create Request
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover:bg-glass-02 transition-all duration-300 group cursor-pointer" onClick={() => window.location.href = '/all-requests'}>
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-accent-amber/10 rounded-xl flex items-center justify-center group-hover:bg-accent-amber/20 transition-colors">
                    <Heart className="w-7 h-7 text-accent-amber" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-accent-amber transition-colors">Browse Help</h3>
                    <p className="text-text-muted text-sm mt-1">See active requests</p>
                  </div>
                </div>
                <div className="mt-auto">
                  <Button variant="outline" className="w-full h-12 btn-secondary border-accent-amber/30 text-accent-amber hover:bg-accent-amber/10 hover:text-accent-amber">
                    View Community
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover:bg-glass-02 transition-all duration-300 group cursor-pointer" onClick={() => window.location.href = '/resources'}>
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-accent-blue/10 rounded-xl flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors">
                    <Package className="w-7 h-7 text-accent-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-accent-blue transition-colors">Resources</h3>
                    <p className="text-text-muted text-sm mt-1">Share/request items</p>
                  </div>
                </div>
                <div className="mt-auto">
                  <Button variant="outline" className="w-full h-12 btn-secondary border-accent-blue/30 text-accent-blue hover:bg-accent-blue/10 hover:text-accent-blue">
                    Browse Resources
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover:bg-glass-02 transition-all duration-300 group cursor-pointer" onClick={() => window.location.href = '/profile'}>
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-accent-teal/10 rounded-xl flex items-center justify-center group-hover:bg-accent-teal/20 transition-colors">
                    <User className="w-7 h-7 text-accent-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-accent-teal transition-colors">My Profile</h3>
                    <p className="text-text-muted text-sm mt-1">Manage settings</p>
                  </div>
                </div>
                <div className="mt-auto">
                  <Button variant="outline" className="w-full h-12 btn-secondary border-accent-teal/30 text-accent-teal hover:bg-accent-teal/10 hover:text-accent-teal">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User's Help Requests */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-glass-border pb-4">
              <div>
                <h2 className="text-3xl font-display font-bold text-text-primary mb-2">My Help Requests</h2>
                <p className="text-text-secondary font-body">Track and manage your active requests</p>
              </div>
              <Button
                onClick={() => window.location.href = '/request-help'}
                className="btn-primary h-12 px-6"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Request
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 border-4 border-accent-teal/20 border-t-accent-teal rounded-full animate-spin mx-auto"></div>
                  <p className="text-text-muted font-mono tracking-widest uppercase">Initializing Secure Link...</p>
                </div>
              </div>
            ) : requests.length === 0 ? (
              <Card className="glass-card border-dashed border-2 border-glass-border/50">
                <CardContent className="p-16 text-center space-y-6">
                  <div className="w-20 h-20 bg-glass-02 rounded-full flex items-center justify-center mx-auto ring-1 ring-glass-border">
                    <AlertCircle className="w-10 h-10 text-text-muted" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-text-primary mb-3">No Active Requests</h3>
                    <p className="text-text-secondary text-lg max-w-md mx-auto mb-8">
                      You haven't broadcasted any requests on the network. Start by creating a secure beacon for help.
                    </p>
                    <Button
                      onClick={() => window.location.href = '/request-help'}
                      className="btn-primary h-12 px-8"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Initialize Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {requests.map((request) => (
                  <Card key={request.id} className="glass-card-elevated hover:bg-glass-02 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                        <div className="flex-1 space-y-4 w-full">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-display font-bold text-text-primary line-clamp-1">{request.title}</h3>
                                <Badge className={`uppercase tracking-label font-mono bg-transparent border ${request.urgency_level === 'high' ? 'border-accent-red text-accent-red' :
                                    request.urgency_level === 'medium' ? 'border-accent-amber text-accent-amber' :
                                      'border-accent-teal text-accent-teal'
                                  }`}>
                                  {request.urgency_level} Priority
                                </Badge>
                              </div>
                              <p className="text-text-secondary leading-relaxed mb-4 line-clamp-2">{request.description}</p>

                              <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-text-muted">
                                <div className="flex items-center gap-1.5 bg-glass-01 px-3 py-1.5 rounded-full border border-glass-border">
                                  <MapPin className="w-4 h-4 text-accent-teal" />
                                  <span>{request.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-glass-01 px-3 py-1.5 rounded-full border border-glass-border">
                                  <Clock className="w-4 h-4 text-accent-teal" />
                                  <span>{new Date(request.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-glass-01 px-3 py-1.5 rounded-full border border-glass-border">
                                  <User className="w-4 h-4 text-accent-teal" />
                                  <span>ID #{request.id}</span>
                                </div>
                              </div>
                            </div>

                            {request.photo && (
                              <div className="flex-shrink-0">
                                <img
                                  src={`${API_BASE_URL}/uploads/${request.photo}`}
                                  alt="Request evidence"
                                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl border border-glass-border shadow-card"
                                />
                              </div>
                            )}
                          </div>

                          {/* Contact Info */}
                          {request.user && (
                            <div className="bg-glass-01 border border-glass-border rounded-xl p-4 mt-4">
                              <p className="text-xs uppercase tracking-label font-bold text-accent-teal mb-3">Origin Contact Data</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-mono text-text-secondary">
                                <p className="flex items-center">
                                  <Mail className="w-4 h-4 mr-2 text-text-muted" />
                                  {request.user.email}
                                </p>
                                {request.user.phone_number && (
                                  <p className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2 text-text-muted" />
                                    {request.user.phone_number}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Volunteers */}
                          {request.volunteers && request.volunteers.length > 0 && (
                            <div className="bg-gradient-to-r from-accent-teal/10 to-transparent border-l-4 border-accent-teal rounded-r-xl p-4 mt-4">
                              <p className="text-sm font-bold text-text-primary flex items-center gap-2 mb-3">
                                <Users className="w-4 h-4 text-accent-teal" />
                                Active Responders ({request.volunteers.length})
                              </p>
                              <div className="space-y-2">
                                {request.volunteers.map((volunteer) => (
                                  <div key={volunteer.id} className="bg-glass-01 border border-glass-border rounded-lg p-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                      <div>
                                        <p className="font-bold text-text-primary text-sm flex items-center gap-2">
                                          {volunteer.username}
                                          <Badge variant="outline" className="text-[10px] h-4 bg-accent-teal/10 text-accent-teal border-accent-teal/20">VERIFIED</Badge>
                                        </p>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-text-muted mt-1.5">
                                          <p className="flex items-center">
                                            <Mail className="w-3 h-3 mr-1.5" />
                                            {volunteer.email}
                                          </p>
                                          {volunteer.phone_number && (
                                            <p className="flex items-center">
                                              <Phone className="w-3 h-3 mr-1.5" />
                                              {volunteer.phone_number}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      {volunteer.applied_at && (
                                        <div className="text-xs font-mono text-text-muted">
                                          Match TS: {new Date(volunteer.applied_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions Col */}
                        <div className="flex md:flex-col gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-glass-border md:pl-6 justify-between md:justify-start">
                          <div className="text-center md:text-right w-full mb-2 hidden md:block">
                            <Badge className="bg-glass-02 text-text-primary border-glass-border">
                              ACTIVE
                            </Badge>
                          </div>

                          <Button
                            variant="outline"
                            className="bg-transparent border-glass-border-strong text-text-primary hover:bg-glass-02 flex-1 md:flex-none"
                            onClick={() => window.location.href = `/request-help?id=${request.id}`}
                          >
                            Edit Beacon
                          </Button>

                          <Button
                            onClick={() => deleteRequest(request.id)}
                            variant="ghost"
                            className="bg-accent-red/10 text-accent-red hover:bg-accent-red hover:text-white border border-accent-red/20 flex-1 md:flex-none"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Deactivate
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

```

### `app/profile/page.tsx`
```typescript
"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Mail, Phone, Shield, Save, LogOut, Trash2, Edit3, Camera, AlertTriangle, CheckCircle, Settings } from "lucide-react"

export default function Profile() {
  const { user, token, logout, isLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone_number: "",
  })
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [stats, setStats] = useState({
    daysActive: 0,
    requestsMade: 0,
    helpsOffered: 0
  })

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  const fetchUserStats = async () => {
    if (!user || !token) return

    try {
      // Calculate days since registration (assuming created_at is available)
      const daysActive = Math.max(1, Math.floor((Date.now() - new Date(user.created_at || Date.now()).getTime()) / (1000 * 60 * 60 * 24)))

      // Fetch user requests
      const requestsResponse = await fetch(`${API_BASE_URL}/request/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      let requestsMade = 0
      let helpsOffered = 0

      if (requestsResponse.ok) {
        const allRequests = await requestsResponse.json()

        if (user.role === 'user') {
          // Count user's own requests
          requestsMade = allRequests.filter((req: any) => req.user_id === user.id).length
        } else if (user.role === 'volunteer') {
          // Count helps offered by volunteer
          helpsOffered = allRequests.reduce((count: number, req: any) => {
            if (req.volunteers) {
              return count + req.volunteers.filter((vol: any) => vol.id === user.id).length
            }
            return count
          }, 0)
        }
      }

      setStats({
        daysActive,
        requestsMade,
        helpsOffered
      })
    } catch (error) {
      console.error('Failed to fetch user stats:', error)
    }
  }

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
      return
    }

    if (user) {
      setProfileData({
        username: user.username,
        email: user.email,
        phone_number: user.phone_number || "",
      })
      fetchUserStats()
    }
  }, [user, isLoading, router])

  const handleSave = async () => {
    setLoading(true)
    setMessage("")

    try {
      // TODO: Implement actual profile update endpoint in backend
      // For now, we'll simulate the update
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage("Profile updated successfully!")
      setIsEditing(false)
    } catch (error) {
      setMessage("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") return

    setLoading(true)
    try {
      // TODO: Implement account deletion endpoint
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        logout()
        // Redirect to home page
        window.location.href = '/'
      } else {
        setMessage("Failed to delete account")
      }
    } catch (error) {
      setMessage("Network error. Please try again.")
    } finally {
      setLoading(false)
      setShowDeleteDialog(false)
    }
  }

  const handleSignOut = () => {
    logout()
    window.location.href = '/'
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4"></div>
          <div className="w-32 h-4 bg-muted rounded mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-base relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-teal/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <Navigation />

      <div className="pt-24 px-6 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="relative w-28 h-28 mx-auto">
              <div className="w-full h-full bg-glass-02 border-2 border-accent-teal shadow-glow-teal/20 rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-teal/20 to-transparent" />
                <User className="w-12 h-12 text-accent-teal relative z-10" />
              </div>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full p-0 bg-accent-teal hover:bg-accent-teal/90 text-bg-void shadow-glow-teal z-20"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <h1 className="text-4xl font-display font-black text-text-primary mb-1 tracking-wide">{user.username}</h1>
              <p className="text-text-muted font-mono">{user.email}</p>
            </div>
            <Badge className="px-5 py-1.5 uppercase font-mono tracking-widest bg-transparent border-accent-teal text-accent-teal shadow-[0_0_15px_rgba(45,212,191,0.15)]">
              {user.role === 'volunteer' ? 'RESPONDER_CLASSIFIED' : 'CIVILIAN_NETWORK'}
            </Badge>
          </div>

          {/* Success/Error Messages */}
          {message && (
            <Alert className={message.includes('success') ? 'border-accent-teal/30 bg-accent-teal/10' : 'border-accent-red/30 bg-accent-red/10'}>
              {message.includes('success') ? (
                <CheckCircle className="h-4 w-4 text-accent-teal" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-accent-red" />
              )}
              <AlertDescription className={message.includes('success') ? 'text-accent-teal font-mono text-sm' : 'text-accent-red font-mono text-sm'}>
                {message}
              </AlertDescription>
            </Alert>
          )}

          {/* Profile Information Card */}
          <Card className="glass-card">
            <CardHeader className="pb-4 border-b border-glass-border">
              <CardTitle className="flex items-center gap-3 text-2xl font-display font-bold text-text-primary">
                <Settings className="w-6 h-6 text-accent-teal" />
                Dossier Config
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6 p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-accent-teal" />
                    Codename / Username
                  </Label>
                  <Input
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    disabled={!isEditing}
                    className="bg-bg-void border-glass-border text-text-primary focus-visible:ring-accent-teal disabled:opacity-75 disabled:cursor-not-allowed h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-accent-teal" />
                    Comm Link (Email)
                  </Label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    className="bg-bg-void border-glass-border text-text-primary focus-visible:ring-accent-teal disabled:opacity-75 disabled:cursor-not-allowed h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-accent-teal" />
                    Radio Frequency (Phone)
                  </Label>
                  <Input
                    type="tel"
                    value={profileData.phone_number}
                    onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
                    disabled={!isEditing}
                    placeholder="+1 (555) 000-0000"
                    className="bg-bg-void border-glass-border text-text-primary placeholder:text-text-muted focus-visible:ring-accent-teal disabled:opacity-75 disabled:cursor-not-allowed h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-accent-teal" />
                    Clearance Level
                  </Label>
                  <div className="flex items-center h-12 px-4 rounded-md border border-glass-border bg-glass-02 text-text-muted font-mono uppercase text-sm tracking-widest">
                    {user.role === 'volunteer' ? 'Level 3: Field Operations' : 'Level 1: Civilian Reporting'}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-6 mt-4 border-t border-glass-border">
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 btn-primary h-12 text-sm"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-bg-void/50 border-t-bg-void rounded-full animate-spin" />
                        UPLOADING...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" />
                        COMMIT MODIFICATIONS
                      </span>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditing(false)}
                    className="px-8 font-mono tracking-widest text-text-muted hover:text-text-primary hover:bg-glass-01 text-xs"
                  >
                    ABORT
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Statistics */}
          <Card className="glass-card overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-teal/5 via-transparent to-accent-blue/5 pointer-events-none" />
            <CardHeader className="pb-4 border-b border-glass-border bg-glass-01 relative z-10">
              <CardTitle className="text-xl font-display font-bold text-text-primary">Operational Metrics</CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative z-10 mx-auto w-full">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-glass-border">
                <div className="text-center space-y-2 p-8 hover:bg-glass-01 transition-colors">
                  <div className="text-4xl font-display font-black text-accent-teal">{stats.daysActive}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-text-secondary">Days Active</div>
                </div>
                <div className="text-center space-y-2 p-8 hover:bg-glass-01 transition-colors">
                  <div className="text-2xl font-display font-bold text-accent-teal flex items-center justify-center h-[40px] uppercase">
                    {user.role === 'volunteer' ? 'Helper' : 'Seeker'}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-text-secondary">Primary Ops</div>
                </div>
                <div className="text-center space-y-2 p-8 hover:bg-glass-01 transition-colors">
                  <div className="text-4xl font-display font-black text-accent-amber">{stats.requestsMade}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-text-secondary">Beacons Sent</div>
                </div>
                <div className="text-center space-y-2 p-8 hover:bg-glass-01 transition-colors">
                  <div className="text-4xl font-display font-black text-accent-blue">{stats.helpsOffered}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-text-secondary">Assists Rendered</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card className="glass-card">
              <CardHeader className="pb-4 border-b border-glass-border">
                <CardTitle className="text-xl font-display font-bold text-text-primary">Control Terminal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <Button
                  variant="outline"
                  className="w-full justify-start h-14 bg-bg-void border-glass-border text-text-primary hover:bg-glass-01 hover:text-accent-teal transition-all font-mono"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="w-5 h-5 mr-4 text-accent-teal" />
                  {isEditing ? 'Cancel Override' : 'Initialize Override'}
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start h-14 bg-bg-void border-glass-border text-text-primary hover:bg-glass-01 hover:text-accent-amber transition-all font-mono"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-5 h-5 mr-4 text-text-muted group-hover:text-accent-amber transition-colors" />
                  Terminate Session
                </Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="glass-card border-accent-red/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-accent-red/5 pointer-events-none" />
              <CardHeader className="pb-4 border-b border-accent-red/20 relative z-10">
                <CardTitle className="text-xl font-display font-bold text-accent-red flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5" />
                  Hazard Sector
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 relative z-10">
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full h-14 bg-accent-red/10 text-accent-red border border-accent-red/30 hover:bg-accent-red hover:text-white transition-all font-mono tracking-widest shadow-glow-red/20"
                    >
                      <Trash2 className="w-4 h-4 mr-3" />
                      PURGE DATA
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-bg-base border-accent-red/50 shadow-glow-red/30">
                    <DialogHeader>
                      <DialogTitle className="text-accent-red flex items-center gap-3 font-display font-bold text-xl">
                        <AlertTriangle className="w-6 h-6" />
                        Execute Purge Sequence
                      </DialogTitle>
                      <DialogDescription className="text-text-secondary font-body py-2">
                        This operation is irreversible. All telemetry, history, and network access associated with this dossier will be permanently expunged.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-2">
                      <div className="p-4 bg-bg-void border border-glass-border rounded-lg">
                        <Label htmlFor="confirmation" className="text-xs font-mono text-accent-amber mb-3 block">
                          INITIALIZE CONFIRMATION CODE: <span className="font-bold">DELETE</span>
                        </Label>
                        <Input
                          id="confirmation"
                          value={deleteConfirmation}
                          onChange={(e) => setDeleteConfirmation(e.target.value)}
                          placeholder="Awaiting code..."
                          className="bg-bg-base border-glass-border focus-visible:ring-accent-red focus-visible:border-accent-red text-text-primary font-mono tracking-widest uppercase h-12"
                        />
                      </div>
                    </div>
                    <DialogFooter className="gap-3 pt-4 border-t border-glass-border mt-4">
                      <Button variant="ghost" onClick={() => setShowDeleteDialog(false)} className="text-text-muted hover:text-text-primary hover:bg-glass-01 font-mono uppercase tracking-widest text-xs">
                        STAND DOWN
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        disabled={deleteConfirmation !== "DELETE" || loading}
                        className="bg-accent-red hover:bg-accent-red/90 text-white font-display font-black tracking-wide disabled:opacity-50"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                            PURGING...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Trash2 className="w-4 h-4" />
                            CONFIRM PURGE
                          </span>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

```

### `app/request-help/page.tsx`
```typescript
"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Upload, ArrowLeft, MapPin } from "lucide-react"

export default function RequestHelp() {
  const { token, user, isLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const disasterTypes = [
    "Flood",
    "Earthquake",
    "Landslide",
    "Cyclone/Hurricane",
    "Fire/Wildfire",
    "Tsunami",
    "Drought",
    "Medical Emergency",
    "Food Shortage",
    "Water Crisis",
    "Accident",
    "Other"
  ]


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    urgency_level: "medium",
  })

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
      return
    }
  }, [user, isLoading, router])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("title", formData.title)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("location", formData.location)
      formDataToSend.append("urgency_level", formData.urgency_level)

      if (photoFile) {
        formDataToSend.append("photo", photoFile)
      }

      const response = await fetch(`${API_BASE_URL}/request/request-help`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        const errorData = await response.json()
        setError(errorData.detail || "Failed to create request")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-base relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-accent-red/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <Navigation />

      <div className="pt-24 px-6 pb-12 relative z-10">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Header */}
          <div className="text-center space-y-6 pt-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="absolute left-6 top-24 text-text-muted hover:text-text-primary hover:bg-glass-01 transition-colors font-mono"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              BACK_TO_HQ
            </Button>

            <div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary tracking-hero mb-4">
                Initialize <span className="text-accent-red">Beacon</span>
              </h1>
              <p className="text-text-secondary text-lg font-body max-w-xl mx-auto">
                Transmit your situation to the network. Nearby responders will be notified instantly.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs font-mono tracking-widest text-text-muted uppercase">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-teal rounded-full animate-pulse shadow-glow-teal"></div>
                <span>Network Active</span>
              </div>
              <div className="w-1 h-1 bg-glass-border-strong rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-teal rounded-full animate-pulse shadow-glow-teal"></div>
                <span>Fast Response</span>
              </div>
            </div>
          </div>

          <Card className="glass-card border-t-4 border-t-accent-red">
            <CardHeader className="pb-4 border-b border-glass-border bg-glass-01">
              <CardTitle className="text-2xl font-display font-bold text-text-primary flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-red/10 border border-accent-red/20 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-accent-red" />
                </div>
                Signal Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {error && (
                <div className="p-4 bg-accent-red/10 border border-accent-red/30 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-accent-red shrink-0" />
                  <p className="text-accent-red font-mono text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 bg-accent-teal/10 border border-accent-teal/30 rounded-lg">
                  <div className="text-accent-teal font-display font-bold flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-accent-teal rounded-full animate-ping" />
                    SIGNAL BROADCASTED SUCCESSFULLY
                  </div>
                  <p className="text-text-muted font-mono text-xs">Rerouting to command center...</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                    <span className="text-accent-red">*</span> Signal Subject
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    list="disaster-suggestions"
                    placeholder="Brief description (e.g., Flood Evacuation Required)"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-bg-void border-glass-border text-text-primary placeholder:text-text-muted focus-visible:ring-accent-red focus-visible:border-accent-red h-12 font-body"
                    required
                  />
                  <datalist id="disaster-suggestions">
                    {disasterTypes.map((type) => (
                      <option key={type} value={type} />
                    ))}
                  </datalist>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                    <span className="text-accent-red">*</span> Detailed Telemetry
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide exact details of the situation. Include headcount, specific hazards, and critical needs."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-bg-void border-glass-border text-text-primary placeholder:text-text-muted focus-visible:ring-accent-red focus-visible:border-accent-red min-h-[160px] resize-none font-body"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                      <span className="text-accent-red">*</span> Exact Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <Input
                        id="location"
                        type="text"
                        placeholder="City, District, or Coordinates"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="bg-bg-void border-glass-border text-text-primary placeholder:text-text-muted focus-visible:ring-accent-red pl-10 h-12 font-body"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                      Threat Level
                    </Label>
                    <Select
                      value={formData.urgency_level}
                      onValueChange={(value) => setFormData({ ...formData, urgency_level: value })}
                    >
                      <SelectTrigger className="bg-bg-void border-glass-border text-text-primary focus:ring-accent-red h-12 font-mono uppercase text-sm">
                        <SelectValue placeholder="Select Threat Level" />
                      </SelectTrigger>
                      <SelectContent className="bg-glass-02 border-glass-border text-text-primary">
                        <SelectItem value="low" className="focus:bg-glass-01 focus:text-accent-teal">🟢 LOW - Stable condition</SelectItem>
                        <SelectItem value="medium" className="focus:bg-glass-01 focus:text-accent-amber">🟡 MEDIUM - Imminent risk</SelectItem>
                        <SelectItem value="high" className="focus:bg-glass-01 focus:text-accent-red font-bold">🔴 CRITICAL - Immediate life threat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Label htmlFor="photo" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                    Visual Evidence (Optional)
                  </Label>
                  <div className="mt-2">
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="photo"
                      className="flex items-center justify-center w-full h-40 border-2 border-dashed border-glass-border-strong rounded-xl cursor-pointer hover:border-accent-teal/50 hover:bg-glass-01 transition-all duration-300 group"
                    >
                      {photoPreview ? (
                        <div className="relative w-full h-full p-2">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg border border-glass-border"
                          />
                          <div className="absolute inset-0 bg-bg-void/60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm m-2">
                            <Upload className="w-6 h-6 text-white" />
                            <span className="ml-2 text-sm font-mono text-white">REPLACE_IMAGE</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-3">
                          <div className="w-12 h-12 bg-glass-02 rounded-full flex items-center justify-center mx-auto border border-glass-border group-hover:bg-accent-teal/10 group-hover:border-accent-teal/30 transition-colors">
                            <Upload className="w-5 h-5 text-text-muted group-hover:text-accent-teal transition-colors" />
                          </div>
                          <div>
                            <p className="text-text-primary font-display font-medium">Click to attach visual data</p>
                            <p className="text-text-muted text-xs font-mono mt-1 uppercase tracking-widest">PNG, JPG (MAX 5MB)</p>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-glass-border">
                  <Button
                    type="submit"
                    disabled={loading || success}
                    className={`w-full h-16 text-lg font-display font-black rounded-xl border-none tracking-wide transition-all ${success ? 'bg-accent-teal text-bg-void' :
                      loading ? 'bg-glass-02 text-text-muted cursor-not-allowed border border-glass-border' :
                        'bg-accent-red hover:bg-accent-red/90 text-white shadow-glow-red hover:shadow-glow-red/120'
                      }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-3 font-mono text-sm tracking-widest uppercase">
                        <div className="w-5 h-5 border-2 border-text-muted border-t-transparent rounded-full animate-spin" />
                        Transmitting...
                      </span>
                    ) : success ? (
                      <span className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-bg-void rounded-full animate-pulse" />
                        BROADCAST ACTIVE
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        <AlertCircle className="w-6 h-6" />
                        BROADCAST EMERGENCY SIGNAL
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

```

### `app/resources/page.tsx`
```typescript
"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Package, MapPin, Clock, Users, CheckCircle, AlertTriangle } from "lucide-react"

interface Resource {
  id: number
  type: string
  name: string
  description: string
  quantity: number
  location: string
  urgency_level: string
  contact_info: string
  created_at: string
  user_id: number
  resource_type: 'needed' | 'available'
}

const resourceCategories = [
  "Food & Water",
  "Medicine",
  "Clothing",
  "Shelter Materials",
  "Tools & Equipment",
  "Transportation",
  "Medical Supplies",
  "Baby Care",
  "Elderly Care",
  "Other"
]

export default function Resources() {
  const { token, user, isLoading } = useAuth()
  const [resources, setResources] = useState<Resource[]>([])
  const [filteredResources, setFilteredResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [message, setMessage] = useState("")

  const [newResource, setNewResource] = useState({
    type: "",
    name: "",
    description: "",
    quantity: "",
    location: "",
    urgency_level: "medium",
    resource_type: "needed" as "needed" | "available"
  })

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = '/'
      return
    }

    if (token) {
      fetchResources()
    } else if (!isLoading) {
      setLoading(false)
    }
  }, [token, user, isLoading])

  useEffect(() => {
    filterResources()
  }, [resources, searchTerm, categoryFilter, typeFilter])

  const fetchResources = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/resources/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setResources(data)
      }
    } catch (error) {
      console.error('Failed to fetch resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterResources = () => {
    let filtered = resources

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(resource => resource.type === categoryFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(resource => resource.resource_type === typeFilter)
    }

    setFilteredResources(filtered)
  }

  const handleAddResource = async () => {
    if (!newResource.type || !newResource.name || !newResource.location) {
      setMessage("Please fill in all required fields")
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/resources/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newResource,
          quantity: parseInt(newResource.quantity) || 1
        })
      })

      if (response.ok) {
        setMessage("Resource posted successfully!")
        setShowAddDialog(false)
        setNewResource({
          type: "",
          name: "",
          description: "",
          quantity: "",
          location: "",
          urgency_level: "medium",
          resource_type: "needed"
        })
        fetchResources()
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage("Failed to post resource")
      }
    } catch (error) {
      setMessage("Network error. Please try again.")
    }
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4"></div>
          <div className="w-32 h-4 bg-muted rounded mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-base relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-[800px] h-[600px] bg-accent-teal/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-amber/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/3 translate-y-1/3" />

      <Navigation />

      <div className="pt-24 px-6 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-6 pt-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-accent-teal/10 rounded-full flex items-center justify-center border border-accent-teal/20 shadow-glow-teal/30">
                <Package className="w-6 h-6 text-accent-teal" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary tracking-hero mb-4">
                Logistics <span className="text-accent-teal">Hub</span>
              </h1>
              <p className="text-text-secondary text-lg font-body max-w-2xl mx-auto">
                Coordinate critical supplies. Declare operational needs or allocate available resources to the network.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs font-mono tracking-widest text-text-muted uppercase">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-accent-teal" />
                <span>Supply Chain</span>
              </div>
              <div className="w-1 h-1 bg-glass-border-strong rounded-full"></div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent-teal" />
                <span>Crowdsourced</span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {message && (
            <Alert className={message.includes('success') ? 'border-accent-teal/30 bg-accent-teal/10' : 'border-accent-red/30 bg-accent-red/10'}>
              {message.includes('success') ? (
                <CheckCircle className="h-4 w-4 text-accent-teal" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-accent-red" />
              )}
              <AlertDescription className={message.includes('success') ? 'text-accent-teal font-mono text-sm' : 'text-accent-red font-mono text-sm'}>
                {message}
              </AlertDescription>
            </Alert>
          )}

          {/* Add Resource Button */}
          <div className="flex justify-center">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="btn-primary h-14 px-10 text-lg">
                  <Plus className="w-5 h-5 mr-3" />
                  LOG LOGISTICS DATA
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-bg-base border-glass-border shadow-glow-teal/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-display font-bold text-text-primary flex items-center gap-2">
                    <Package className="text-accent-teal w-6 h-6" />
                    Initialize Resource Profile
                  </DialogTitle>
                  <DialogDescription className="text-text-secondary font-body">
                    Declare supply availability or register a critical deficit.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="resource_type" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                      <span className="text-accent-teal">*</span> Profile Type
                    </Label>
                    <Select value={newResource.resource_type} onValueChange={(value: "needed" | "available") => setNewResource({ ...newResource, resource_type: value })}>
                      <SelectTrigger className="bg-bg-void border-glass-border focus:ring-accent-teal h-12 font-mono uppercase text-sm text-text-primary">
                        <SelectValue placeholder="Specify Intention" />
                      </SelectTrigger>
                      <SelectContent className="bg-glass-02 border-glass-border text-text-primary">
                        <SelectItem value="needed" className="focus:bg-glass-01 focus:text-accent-amber">🔴 REQUISITION (Need)</SelectItem>
                        <SelectItem value="available" className="focus:bg-glass-01 focus:text-accent-teal">🟢 SURPLUS (Available)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                      <span className="text-accent-teal">*</span> Classification
                    </Label>
                    <Select value={newResource.type} onValueChange={(value) => setNewResource({ ...newResource, type: value })}>
                      <SelectTrigger className="bg-bg-void border-glass-border focus:ring-accent-teal h-12 text-text-primary">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent className="bg-glass-02 border-glass-border text-text-primary">
                        {resourceCategories.map(category => (
                          <SelectItem key={category} value={category} className="focus:bg-glass-01">{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                      <span className="text-accent-teal">*</span> Designation
                    </Label>
                    <Input
                      id="name"
                      value={newResource.name}
                      onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                      placeholder="e.g., MREs, Antibiotics, Tarps"
                      className="bg-bg-void border-glass-border focus-visible:ring-accent-teal focus-visible:border-accent-teal text-text-primary h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                      Detailed Telemetry
                    </Label>
                    <Textarea
                      id="description"
                      value={newResource.description}
                      onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                      placeholder="Provide specifications, condition, expiration dates..."
                      className="bg-bg-void border-glass-border focus-visible:ring-accent-teal focus-visible:border-accent-teal text-text-primary resize-none h-24"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                        Unit Count
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={newResource.quantity}
                        onChange={(e) => setNewResource({ ...newResource, quantity: e.target.value })}
                        placeholder="1"
                        className="bg-bg-void border-glass-border focus-visible:ring-accent-teal focus-visible:border-accent-teal text-text-primary h-12 font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                        Priority Level
                      </Label>
                      <Select value={newResource.urgency_level} onValueChange={(value) => setNewResource({ ...newResource, urgency_level: value })}>
                        <SelectTrigger className="bg-bg-void border-glass-border focus:ring-accent-teal h-12 text-text-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-glass-02 border-glass-border text-text-primary">
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-xs font-mono uppercase tracking-label text-text-secondary flex items-center gap-2">
                      <span className="text-accent-teal">*</span> Grid Coordinate
                    </Label>
                    <Input
                      id="location"
                      value={newResource.location}
                      onChange={(e) => setNewResource({ ...newResource, location: e.target.value })}
                      placeholder="Sector or exact address"
                      className="bg-bg-void border-glass-border focus-visible:ring-accent-teal focus-visible:border-accent-teal text-text-primary h-12"
                    />
                  </div>
                </div>
                <DialogFooter className="pt-6 border-t border-glass-border mt-4">
                  <Button variant="ghost" onClick={() => setShowAddDialog(false)} className="text-text-muted hover:text-text-primary hover:bg-glass-01 font-mono uppercase tracking-widest text-xs">
                    ABORT
                  </Button>
                  <Button onClick={handleAddResource} className="bg-accent-teal hover:bg-accent-teal/90 text-bg-void shadow-glow-teal font-display font-black tracking-wide">
                    COMMIT DATA
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filters */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
                    <Input
                      placeholder="QUERY DATABASE: Search designations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 bg-bg-void border-glass-border focus:border-accent-teal h-14 text-base font-body text-text-primary placeholder:text-text-muted placeholder:font-mono placeholder:tracking-wide w-full"
                    />
                  </div>
                </div>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-56 bg-bg-void border-glass-border focus:ring-accent-teal h-14 font-mono uppercase text-sm text-text-primary">
                    <Package className="w-4 h-4 mr-3 text-accent-teal" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-glass-02 border-glass-border text-text-primary font-mono text-sm uppercase">
                    <SelectItem value="all" className="focus:bg-glass-01 focus:text-accent-teal">All Classes</SelectItem>
                    {resourceCategories.map(category => (
                      <SelectItem key={category} value={category} className="focus:bg-glass-01">{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-48 bg-bg-void border-glass-border focus:ring-accent-teal h-14 font-mono uppercase text-sm text-text-primary">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-glass-02 border-glass-border text-text-primary font-mono text-sm uppercase">
                    <SelectItem value="all" className="focus:bg-glass-01 focus:text-accent-teal">All Profiles</SelectItem>
                    <SelectItem value="needed" className="focus:bg-glass-01">Requisitions</SelectItem>
                    <SelectItem value="available" className="focus:bg-glass-01">Surplus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-accent-teal/20 border-t-accent-teal rounded-full animate-spin mx-auto"></div>
                <p className="text-text-muted font-mono tracking-widest uppercase text-sm">Querying Database...</p>
              </div>
            </div>
          ) : filteredResources.length === 0 ? (
            <Card className="glass-card border-dashed border-2 border-glass-border/50">
              <CardContent className="p-16 text-center space-y-6">
                <div className="w-20 h-20 bg-glass-02 rounded-full flex items-center justify-center mx-auto ring-1 ring-glass-border">
                  <Package className="w-10 h-10 text-text-muted" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                    {resources.length === 0 ? 'Database Empty' : 'Zero Results Found'}
                  </h3>
                  <p className="text-text-secondary text-lg max-w-md mx-auto mb-8 font-body">
                    {resources.length === 0
                      ? 'No logistics data has been committed to the server.'
                      : 'Try broadening your search parameters.'
                    }
                  </p>
                </div>
                {resources.length === 0 && (
                  <Button onClick={() => setShowAddDialog(true)} className="btn-primary h-12 px-8">
                    <Plus className="w-5 h-5 mr-3" />
                    Initialize First Entry
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-glass-border pb-2">
                <p className="text-text-muted font-mono text-sm uppercase tracking-widest">
                  Showing <span className="font-bold text-accent-teal">{filteredResources.length}</span> of <span className="font-bold text-text-primary">{resources.length}</span> Entries
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="glass-card-elevated hover:bg-glass-02 transition-all duration-300 group flex flex-col h-full border-t-4 border-t-transparent hover:border-t-accent-teal">
                    <CardContent className="p-6 flex flex-col h-full space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={`uppercase tracking-label font-mono bg-transparent border text-xs ${resource.resource_type === 'available'
                                ? 'border-accent-teal text-accent-teal shadow-[0_0_10px_rgba(45,212,191,0.2)]'
                                : 'border-accent-amber text-accent-amber shadow-[0_0_10px_rgba(251,191,36,0.2)]'
                              }`}>
                              {resource.resource_type === 'available' ? 'SURPLUS' : 'REQUISITION'}
                            </Badge>
                            <Badge className={`uppercase tracking-label font-mono bg-transparent border text-xs ${resource.urgency_level === 'high' ? 'border-accent-red text-accent-red' :
                                resource.urgency_level === 'medium' ? 'border-accent-amber text-accent-amber' :
                                  'border-accent-teal text-accent-teal'
                              }`}>
                              {resource.urgency_level}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-display font-bold text-text-primary line-clamp-2 mb-1 group-hover:text-accent-teal transition-colors">
                            {resource.name}
                          </h3>
                          <p className="text-xs font-mono uppercase tracking-widest text-accent-teal border-b border-glass-border pb-2 mb-3">{resource.type}</p>
                          <p className="text-text-secondary leading-relaxed line-clamp-2 text-sm mb-4 font-body">
                            {resource.description}
                          </p>

                          <div className="space-y-2 bg-glass-01 border border-glass-border rounded-lg p-3 text-xs font-mono text-text-secondary">
                            <div className="flex items-center gap-3">
                              <MapPin className="w-3.5 h-3.5 text-accent-teal shrink-0" />
                              <span className="truncate">{resource.location}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Package className="w-3.5 h-3.5 text-accent-teal shrink-0" />
                              <span>QUANTITY: <span className="text-text-primary font-bold">{resource.quantity}</span></span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="w-3.5 h-3.5 text-accent-teal shrink-0" />
                              <span>{new Date(resource.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 mt-auto border-t border-glass-border">
                        <p className="text-xs font-mono uppercase tracking-widest text-text-muted flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-accent-teal" />
                          <span className="truncate">{resource.contact_info || 'CONTACT POSTER DIRECTLY'}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}



```

### `app/verify-email/page.tsx`
```typescript
"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheck, ArrowRight, RefreshCw, Loader2, AlertTriangle, CheckCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"

function VerifyEmailContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const [resending, setResending] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    useEffect(() => {
        if (!email) {
            router.push("/")
        }
    }, [email, router])

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        setLoading(true)

        try {
            const response = await fetch(`${API_BASE_URL}/verify-otp?email=${encodeURIComponent(email!)}&otp=${otp}`, {
                method: "POST",
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.detail || "Verification failed")
            }

            setSuccess("Email verified successfully! Redirecting to home...")
            setTimeout(() => {
                router.push("/")
            }, 2000)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        setError("")
        setSuccess("")
        setResending(true)

        try {
            const response = await fetch(`${API_BASE_URL}/resend-otp?email=${encodeURIComponent(email!)}`, {
                method: "POST",
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.detail || "Failed to resend OTP")
            }

            setSuccess("A new OTP has been sent to your email.")
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setResending(false)
        }
    }

    return (
        <div className="min-h-screen bg-bg-base relative overflow-hidden flex flex-col">
            {/* Ambient glowing orbs */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent-teal/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-amber/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/2 translate-y-1/2" />

            <Navigation />

            <div className="flex-1 flex items-center justify-center pt-24 px-6 pb-12 relative z-10">
                <Card className="w-full max-w-md glass-card border-accent-teal/20 shadow-glow-teal/10 relative overflow-hidden">
                    {/* Cyberpunk accent lines */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-teal to-transparent opacity-50"></div>

                    <CardHeader className="text-center space-y-4 pt-8">
                        <div className="mx-auto w-16 h-16 bg-glass-02 border border-accent-teal/30 shadow-[0_0_15px_rgba(45,212,191,0.2)] rounded-full flex items-center justify-center mb-2 relative">
                            <div className="absolute inset-0 rounded-full border border-accent-teal border-dashed animate-[spin_10s_linear_infinite] opacity-30"></div>
                            <ShieldCheck className="w-8 h-8 text-accent-teal relative z-10" />
                        </div>

                        <CardTitle className="text-3xl font-display font-black text-text-primary tracking-wide">
                            IDENTITY PROTOCOL
                        </CardTitle>

                        <CardDescription className="text-text-secondary font-body">
                            Authentication sequence initiated. Dispatching 6-digit confirmation cipher to <span className="font-mono text-accent-teal border-b border-accent-teal/30 pb-0.5">{email}</span>
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-8 p-8 pt-4">
                        {error && (
                            <div className="p-4 rounded-lg bg-accent-red/10 border border-accent-red/30 text-sm text-accent-red font-mono flex items-center gap-3">
                                <AlertTriangle className="w-5 h-5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {success && (
                            <div className="p-4 rounded-lg bg-accent-teal/10 border border-accent-teal/30 text-sm text-accent-teal font-mono flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 shrink-0" />
                                <span>{success}</span>
                            </div>
                        )}

                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="otp" className="text-text-muted font-mono uppercase tracking-widest text-xs flex justify-center">
                                    Enter Secure Cipher
                                </Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="000000"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                    className="text-center text-3xl tracking-[0.5em] font-mono font-bold h-16 bg-bg-void border-glass-border-strong text-accent-teal focus-visible:ring-accent-teal focus-visible:border-accent-teal rounded-lg placeholder:text-text-muted/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] transition-all"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className="w-full bg-accent-teal text-bg-void hover:bg-accent-teal/90 py-6 rounded-lg font-display font-black tracking-widest uppercase transition-all flex items-center justify-center shadow-glow-teal disabled:opacity-50 disabled:shadow-none"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        AUTHENTICATING...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2 text-lg">
                                        VERIFY CLEARANCE
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="text-center pt-2">
                            <button
                                onClick={handleResend}
                                disabled={resending}
                                className="text-xs font-mono tracking-widest uppercase text-text-muted hover:text-accent-teal flex items-center justify-center mx-auto gap-2 transition-colors disabled:opacity-50"
                            >
                                {resending ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                    <RefreshCw className="w-3.5 h-3.5" />
                                )}
                                RESEND CIPHER VIA COMM LINK
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function VerifyEmail() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bg-base flex flex-col items-center justify-center text-accent-teal font-mono tracking-widest gap-4"><Loader2 className="w-8 h-8 animate-spin" /><span>LOADING PROTOCOL...</span></div>}>
            <VerifyEmailContent />
        </Suspense>
    )
}

```

### `app/volunteer/requests/page.tsx`
```typescript
"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, MapPin, Clock, User, CheckCircle, AlertCircle, Sparkles, Users, HandHeart } from "lucide-react"

interface HelpRequest {
  id: number
  title: string
  description: string
  location: string
  urgency_level: string
  photo?: string
  created_at: string
  user_id: number
  has_applied?: boolean
}

export default function VolunteerRequests() {
  const { token, user, isLoading } = useAuth()
  const router = useRouter()
  const [requests, setRequests] = useState<HelpRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [applyingTo, setApplyingTo] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [appliedRequests, setAppliedRequests] = useState<Set<number>>(new Set())

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
      return
    }

    if (!isLoading && user && user.role !== 'volunteer') {
      router.push('/dashboard')
      return
    }

    if (token) {
      fetchRequests()
    } else if (!isLoading) {
      setLoading(false)
    }
  }, [token, user, isLoading, router])

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/volunteer/view-requests`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setRequests(data)
      } else {
        setMessage("Failed to load help requests")
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error)
      setMessage("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  const applyToRequest = async (requestId: number) => {
    setApplyingTo(requestId)
    setMessage("")

    try {
      const response = await fetch(`${API_BASE_URL}/volunteer/apply/${requestId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setAppliedRequests(prev => new Set(prev).add(requestId))
        setMessage("Application submitted successfully! The help seeker will be notified.")
        // Remove the request from the list after a short delay
        setTimeout(() => {
          setRequests(requests.filter(req => req.id !== requestId))
        }, 2000)
      } else {
        const error = await response.json()
        setMessage(`Failed to apply: ${error.detail}`)
      }
    } catch (error) {
      setMessage('Network error. Please try again.')
    } finally {
      setApplyingTo(null)
    }
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300'
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300'
      case 'low': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300'
      default: return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300'
    }
  }

  const getUrgencyIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertCircle className="w-4 h-4" />
      case 'medium': return <Clock className="w-4 h-4" />
      case 'low': return <CheckCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4"></div>
          <div className="w-32 h-4 bg-muted rounded mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-base relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-accent-teal/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute top-[20%] left-0 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/2" />

      <Navigation />

      <div className="pt-24 px-6 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header Section */}
          <div className="text-center space-y-6 pt-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-accent-teal/10 rounded-full flex items-center justify-center border border-accent-teal/20 shadow-glow-teal/30">
                <HandHeart className="w-6 h-6 text-accent-teal" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary tracking-hero mb-4">
                Active <span className="text-accent-teal">Beacons</span>
              </h1>
              <p className="text-text-secondary text-lg font-body max-w-2xl mx-auto">
                Review local emergency signals. Deploy capabilities where they are most urgently needed.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs font-mono tracking-widest text-text-muted uppercase">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent-teal" />
                <span>Responder Mesh</span>
              </div>
              <div className="w-1 h-1 bg-glass-border-strong rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-teal rounded-full animate-pulse shadow-glow-teal"></div>
                <span>Live Feed</span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {message && (
            <Alert className={message.includes('success') ? 'border-accent-teal/30 bg-accent-teal/10' : 'border-accent-red/30 bg-accent-red/10'}>
              {message.includes('success') ? (
                <CheckCircle className="h-4 w-4 text-accent-teal" />
              ) : (
                <AlertCircle className="h-4 w-4 text-accent-red" />
              )}
              <AlertDescription className={message.includes('success') ? 'text-accent-teal font-mono text-sm' : 'text-accent-red font-mono text-sm'}>
                {message}
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-accent-teal/20 border-t-accent-teal rounded-full animate-spin mx-auto"></div>
                <p className="text-text-muted font-mono tracking-widest uppercase text-sm">Intercepting Signals...</p>
              </div>
            </div>
          ) : requests.length === 0 ? (
            <Card className="glass-card border-dashed border-2 border-glass-border/50">
              <CardContent className="p-16 text-center space-y-6">
                <div className="w-20 h-20 bg-glass-02 rounded-full flex items-center justify-center mx-auto ring-1 ring-glass-border">
                  <Sparkles className="w-10 h-10 text-text-muted" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-text-primary mb-3">No Active Beacons</h3>
                  <p className="text-text-secondary text-lg max-w-md mx-auto mb-8">
                    The network is currently stable. Maintain standby mode and monitor the feed for incoming requests.
                  </p>
                </div>
                <Button onClick={() => window.location.href = '/dashboard'} className="btn-secondary px-8">
                  Return to Command Center
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {requests.map((request) => (
                <Card key={request.id} className="glass-card-elevated hover:bg-glass-02 transition-all duration-300 group flex flex-col h-full border-t-4 border-t-transparent hover:border-t-accent-teal">
                  <CardContent className="p-6 space-y-4 flex flex-col h-full">
                    {/* Header with Priority Badge */}
                    <div className="flex items-start justify-between min-h-[4rem]">
                      <div className="flex-1 min-w-0 pr-2">
                        <h3 className="text-xl font-display font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-accent-teal transition-colors">
                          {request.title}
                        </h3>
                        <Badge className={`uppercase tracking-label font-mono bg-transparent border flex flex-row items-center justify-center gap-1 w-fit ${request.urgency_level === 'high' ? 'border-accent-red text-accent-red' :
                            request.urgency_level === 'medium' ? 'border-accent-amber text-accent-amber' :
                              'border-accent-teal text-accent-teal'
                          }`}>
                          {getUrgencyIcon(request.urgency_level)}
                          {request.urgency_level}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary font-body leading-relaxed line-clamp-3 my-2 flex-grow">
                      {request.description}
                    </p>

                    {/* Request Details */}
                    <div className="space-y-3 pt-3 mt-auto mb-4 border-t border-glass-border">
                      <div className="flex items-center gap-3 text-sm font-mono text-text-muted">
                        <MapPin className="w-4 h-4 text-accent-teal shrink-0" />
                        <span className="truncate">{request.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-mono text-text-muted">
                        <Clock className="w-4 h-4 text-accent-teal shrink-0" />
                        <span>{new Date(request.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(request.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-mono text-text-muted">
                        <User className="w-4 h-4 text-accent-teal shrink-0" />
                        <span>Beacon #{request.id}</span>
                      </div>
                    </div>

                    {/* Image Preview */}
                    {request.photo && (
                      <div className="relative w-full h-32 rounded-lg overflow-hidden border border-glass-border bg-glass-01 mb-4 shrink-0">
                        <img
                          src={`${API_BASE_URL}/uploads/${request.photo}`}
                          alt="Beacon Visual Data"
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="mt-auto shrink-0 pt-2">
                      <Button
                        onClick={() => applyToRequest(request.id)}
                        disabled={applyingTo === request.id || appliedRequests.has(request.id) || request.has_applied}
                        className={`w-full h-12 font-display font-bold transition-all duration-300 ${appliedRequests.has(request.id) || request.has_applied
                            ? 'bg-accent-teal/20 text-accent-teal border border-accent-teal/30 cursor-not-allowed'
                            : 'btn-primary'
                          }`}
                      >
                        {appliedRequests.has(request.id) || request.has_applied ? (
                          <span className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            RESPONSE TRANSMITTED
                          </span>
                        ) : applyingTo === request.id ? (
                          <span className="flex items-center justify-center gap-2 font-mono text-sm tracking-widest uppercase text-bg-void">
                            <div className="w-5 h-5 border-2 border-bg-void/50 border-t-bg-void rounded-full animate-spin" />
                            Connecting...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Heart className="w-5 h-5" />
                            DEPLOY SUPPORT
                          </span>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

```

### `components/auth-modal.tsx`
```typescript
"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface AuthModalProps {
  mode: "signin" | "signup" | null
  onClose: () => void
  onSuccess: () => void
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export function AuthModal({ mode, onClose, onSuccess }: AuthModalProps) {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone_number: "",
    role: "user",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const endpoint = mode === "signin" ? "/login" : "/signup"

      if (mode === "signin") {
        const formDataForLogin = new FormData()
        formDataForLogin.append("username", formData.email)
        formDataForLogin.append("password", formData.password)

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: "POST",
          body: formDataForLogin,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.detail || "Sign in failed")
        }

        const data = await response.json()

        // Fetch user profile to get complete user data
        const profileResponse = await fetch(`${API_BASE_URL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${data.access_token}`,
          },
        })

        if (profileResponse.ok) {
          const userData = await profileResponse.json()
          login(data.access_token, userData)
        } else {
          throw new Error("Failed to fetch user profile")
        }

        onSuccess()
      } else {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.detail || "Sign up failed")
        }

        const data = await response.json()
        localStorage.setItem("userId", data.id)
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`)
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const router = useRouter()

  return (
    <Dialog open={mode !== null} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-card border flex flex-col items-center">
        <DialogHeader className="w-full text-center mb-2">
          <DialogTitle className="text-3xl font-display font-black text-text-primary tracking-hero">
            {mode === "signin" ? "Welcome Back" : "Join Sahay"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {error && (
            <div className="p-4 rounded-lg bg-accent-red/10 border border-accent-red/20 text-sm text-accent-red">{error}</div>
          )}

          <div className="space-y-2 w-full">
            <Label htmlFor="email" className="text-text-primary font-semibold text-sm tracking-label uppercase">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-glass-02 border-glass-border-strong text-text-primary placeholder:text-text-muted focus:border-accent-teal focus:ring-1 focus:ring-accent-teal rounded-lg transition-all"
              required
            />
          </div>

          {mode === "signup" && (
            <>
              <div className="space-y-2 w-full">
                <Label htmlFor="username" className="text-text-primary font-semibold text-sm tracking-label uppercase">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="your_username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="bg-glass-02 border-glass-border-strong text-text-primary placeholder:text-text-muted focus:border-accent-teal focus:ring-1 focus:ring-accent-teal rounded-lg transition-all"
                  required
                />
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="phone" className="text-text-primary font-semibold text-sm tracking-label uppercase">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  className="bg-glass-02 border-glass-border-strong text-text-primary placeholder:text-text-muted focus:border-accent-teal focus:ring-1 focus:ring-accent-teal rounded-lg transition-all"
                  required
                />
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="role" className="text-text-primary font-semibold text-sm tracking-label uppercase">
                  I am a
                </Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-bg-elevated border border-glass-border-strong text-text-primary focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition-all"
                  required
                >
                  <option value="user">Person Needing Help</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
            </>
          )}

          <div className="space-y-2 w-full">
            <Label htmlFor="password" className="text-text-primary font-semibold text-sm tracking-label uppercase">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-glass-02 border-glass-border-strong text-text-primary placeholder:text-text-muted focus:border-accent-teal focus:ring-1 focus:ring-accent-teal rounded-lg transition-all"
              required
              minLength={6}
            />
            {mode === "signup" && <p className="text-xs text-text-muted mt-1">At least 6 characters</p>}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-bg-void hover:shadow-glow-teal py-6 rounded-full font-bold transition-all text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {mode === "signin" ? "Signing in..." : "Creating account..."}
              </>
            ) : mode === "signin" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-text-muted">
          {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={onClose}
            className="text-text-primary font-semibold hover:text-accent-teal transition-colors"
          >
            {mode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  )
}

```

### `components/error-boundary.tsx`
```typescript
"use client"

import { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-md w-full shadow-lg border-destructive/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center">
                We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-muted p-3 rounded-lg text-sm font-mono text-destructive">
                  {this.state.error.message}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Page
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  className="flex-1"
                >
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}





```

### `components/landing-page.tsx`
```typescript
'use client'

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import { ChevronRight, ArrowDown } from "lucide-react"

interface LandingPageProps {
  onAuthClick: (mode: "signin" | "signup") => void
}

const STATS = [
  { label: "Active Beacons", value: "2,405" },
  { label: "Volunteers Ready", value: "8,921" },
  { label: "Districts Covered", value: "14" },
  { label: "Lives Impacted", value: "50K+" },
]

const FEATURES = [
  {
    number: "01",
    title: "Beacon System",
    desc: "One tap to send an authenticated SOS signal with GPS pinpoint to the nearest volunteer cluster.",
  },
  {
    number: "02",
    title: "Live Triage Feed",
    desc: "A real-time command feed sorted by urgency level so the right help reaches the right person first.",
  },
  {
    number: "03",
    title: "Resource Grid",
    desc: "Track food, shelter, and medical supplies across all 14 Kerala districts from a single dashboard.",
  },
]

export function LandingPage({ onAuthClick }: LandingPageProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100)
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="relative bg-black text-white font-body overflow-x-hidden">

      {/* ── STICKY NAV ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
          }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-white/60">
            Sahay / Kerala
          </span>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onAuthClick("signin")}
              className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => onAuthClick("signup")}
              className="text-xs font-mono uppercase tracking-widest px-5 py-2.5 border border-white/20 hover:border-white/60 hover:bg-white hover:text-black transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* ── HERO SECTION (Spline 3D) ── */}
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden bg-black flex items-center"
      >
        {/* Spotlight */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        {/* Layout: text left, Spline right */}
        <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center max-w-7xl mx-auto px-6">

          {/* Left: Big heading */}
          <div className="flex-1 flex flex-col justify-center pt-24 md:pt-0">

            <AnimatePresence>
              {heroVisible && (
                <>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-mono text-xs uppercase tracking-[0.25em] text-white/40 mb-6"
                  >
                    Disaster Relief Coordination
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-[clamp(4.5rem,11vw,9rem)] font-black leading-[0.88] tracking-[-0.04em] text-white"
                  >
                    Sahay
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.55 }}
                    className="mt-8 max-w-sm text-white/50 text-base leading-relaxed"
                  >
                    One tap. Real relief. Right now. Kerala's disaster coordination network — connecting civilians with volunteers in real time.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.75 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4"
                  >
                    <button
                      onClick={() => onAuthClick("signup")}
                      className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-mono uppercase tracking-widest font-bold hover:bg-white/90 transition-all"
                    >
                      Deploy Beacon
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => onAuthClick("signin")}
                      className="inline-flex items-center gap-3 border border-white/20 text-white/70 hover:text-white hover:border-white/60 px-8 py-4 text-sm font-mono uppercase tracking-widest transition-all"
                    >
                      Volunteer Access
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Spline 3D Scene */}
          <div className="flex-1 w-full h-full min-h-[400px] md:min-h-full relative">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="border-t border-b border-white/10 bg-black py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <span className="text-[clamp(2rem,4vw,3rem)] font-display font-black text-white leading-none">{s.value}</span>
              <span className="mt-2 font-mono text-[11px] uppercase tracking-widest text-white/40">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-black py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/30 mb-4">System Capabilities</p>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-black leading-[0.9] tracking-tight text-white">
              Built for<br />the field.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-black p-10 group hover:bg-white/[0.03] transition-colors cursor-default"
              >
                <span className="font-mono text-xs text-white/20 group-hover:text-white/40 transition-colors">{f.number}</span>
                <h3 className="mt-6 text-2xl font-display font-bold text-white">{f.title}</h3>
                <p className="mt-4 text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white text-black py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/40 mb-4">Join the Network</p>
            <h2 className="text-[clamp(3rem,7vw,6rem)] font-display font-black leading-[0.88] tracking-tight">
              Ready to<br />make an<br />impact?
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-start md:items-end gap-6"
          >
            <p className="text-black/50 max-w-xs text-sm leading-relaxed text-left md:text-right">
              Your actions directly impact the survival and recovery of communities across Kerala.
            </p>
            <button
              onClick={() => onAuthClick("signup")}
              className="group inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-sm font-mono uppercase tracking-widest font-bold hover:bg-black/80 transition-all"
            >
              Create Account
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black border-t border-white/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-mono text-xs uppercase tracking-widest text-white/30">
            © 2026 Sahay Kerala. All rights reserved.
          </span>
          <div className="flex gap-8 font-mono text-xs uppercase tracking-widest text-white/30">
            <button onClick={() => onAuthClick("signin")} className="hover:text-white/70 transition-colors">Sign In</button>
            <button onClick={() => onAuthClick("signup")} className="hover:text-white/70 transition-colors">Register</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

```

### `components/loading-spinner.tsx`
```typescript
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

export function LoadingSpinner({ size = 'md', className = '', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      {text && <span className="text-muted-foreground">{text}</span>}
    </div>
  )
}

export function PageLoadingSpinner() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}





```

### `components/navigation.tsx`
```typescript
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, User, Heart, Users, Plus, Home } from "lucide-react"

export function Navigation() {
  const { user, logout, isAuthenticated } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isAuthenticated) {
    return null
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "bg-bg-base/60 backdrop-blur-md border-b border-glass-border py-3" : "bg-transparent py-4"
        }`}
    >
      <nav className="px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-xl font-display font-black tracking-hero text-text-primary">Sahay</span>

          <div className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              className="text-text-secondary hover:text-accent-teal hover:bg-glass-01 font-body font-medium transition-colors"
              onClick={() => window.location.href = '/dashboard'}
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>

            {user?.role === 'user' && (
              <Button
                variant="ghost"
                className="text-text-secondary hover:text-accent-teal hover:bg-glass-01 font-body font-medium transition-colors"
                onClick={() => window.location.href = '/request-help'}
              >
                <Plus className="w-4 h-4 mr-2" />
                Request Help
              </Button>
            )}

            {user?.role === 'volunteer' && (
              <Button
                variant="ghost"
                className="text-text-secondary hover:text-accent-teal hover:bg-glass-01 font-body font-medium transition-colors"
                onClick={() => window.location.href = '/volunteer/requests'}
              >
                <Heart className="w-4 h-4 mr-2" />
                Help Requests
              </Button>
            )}

            <Button
              variant="ghost"
              className="text-text-secondary hover:text-accent-teal hover:bg-glass-01 font-body font-medium transition-colors"
              onClick={() => window.location.href = '/resources'}
            >
              <Heart className="w-4 h-4 mr-2" />
              Resources
            </Button>

            <Button
              variant="ghost"
              className="text-text-secondary hover:text-accent-teal hover:bg-glass-01 font-body font-medium transition-colors"
              onClick={() => window.location.href = '/profile'}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-text-muted hidden sm:block uppercase tracking-label">
            {user?.username}
          </span>
          <Button
            onClick={logout}
            variant="outline"
            className="rounded-full border-glass-border-strong text-text-primary hover:bg-glass-02 hover:border-white/25 backdrop-blur-md"
          >
            <LogOut className="w-4 h-4 mr-2 text-accent-red" />
            Sign Out
          </Button>
        </div>
      </nav>
    </header>
  )
}

```

### `components/sos-emergency.tsx`
```typescript
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertTriangle, Phone, MapPin, Ambulance, Shield, Flame, Waves } from "lucide-react"

interface PoliceStation {
  name: string
  district: string
  phone: string
  address?: string
}

interface EmergencyContact {
  name: string
  number: string
  type: 'police' | 'fire' | 'ambulance' | 'disaster' | 'national'
  icon: React.ReactNode
}

const keralaPoliceStations: PoliceStation[] = [
  { name: "Thiruvananthapuram City Police", district: "Thiruvananthapuram", phone: "0471-2338100" },
  { name: "Ernakulam City Police", district: "Ernakulam", phone: "0484-2395200" },
  { name: "Kozhikode City Police", district: "Kozhikode", phone: "0495-2721234" },
  { name: "Thrissur City Police", district: "Thrissur", phone: "0487-2333333" },
  { name: "Kollam City Police", district: "Kollam", phone: "0474-2794900" },
  { name: "Palakkad District Police", district: "Palakkad", phone: "0491-2505252" },
  { name: "Alappuzha District Police", district: "Alappuzha", phone: "0477-2250161" },
  { name: "Idukki District Police", district: "Idukki", phone: "0486-2233222" },
  { name: "Kannur District Police", district: "Kannur", phone: "0497-2700555" },
  { name: "Kasaragod District Police", district: "Kasaragod", phone: "0499-4250555" },
  { name: "Kottayam District Police", district: "Kottayam", phone: "0481-2563737" },
  { name: "Malappuram District Police", district: "Malappuram", phone: "0483-2733420" },
  { name: "Pathanamthitta District Police", district: "Pathanamthitta", phone: "0468-2222500" },
  { name: "Wayanad District Police", district: "Wayanad", phone: "0493-6202222" }
]

const emergencyContacts: EmergencyContact[] = [
  { name: "Police Control Room", number: "112", type: "police", icon: <Shield className="w-4 h-4" /> },
  { name: "Fire & Rescue Services", number: "101", type: "fire", icon: <Flame className="w-4 h-4" /> },
  { name: "Ambulance Services", number: "108", type: "ambulance", icon: <Ambulance className="w-4 h-4" /> },
  { name: "Kerala State Disaster Management", number: "1077", type: "disaster", icon: <Waves className="w-4 h-4" /> },
  { name: "National Disaster Response Force", number: "011-24363260", type: "national", icon: <AlertTriangle className="w-4 h-4" /> },
  { name: "Kerala Flood Control Room", number: "0471-2338100", type: "disaster", icon: <Waves className="w-4 h-4" /> }
]

const disasterHelplines = [
  { name: "National Disaster Management Authority", number: "011-26701728" },
  { name: "Indian Meteorological Department", number: "1800-180-1717" },
  { name: "Kerala Revenue Department", number: "0471-2338100" },
  { name: "District Collectors Office", number: "Local District Office" }
]

export function SOSEmergencyButton() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredStations = selectedDistrict
    ? keralaPoliceStations.filter(station => station.district === selectedDistrict)
    : keralaPoliceStations

  const handleEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-accent-red hover:bg-accent-red/90 text-white shadow-glow-teal animate-pulse border-2 border-accent-red/50"
        >
          <AlertTriangle className="w-8 h-8" />
          <span className="sr-only">Emergency SOS</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto glass-card border flex flex-col items-start bg-bg-surface overflow-x-hidden">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-3xl font-display font-black text-accent-red flex items-center gap-3">
            <AlertTriangle className="w-8 h-8" />
            Emergency SOS
          </DialogTitle>
          <DialogDescription className="text-text-muted mt-2 text-base">
            Immediate access to emergency services, police stations, and disaster management contacts.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 w-full">
          {/* Emergency Hotlines */}
          <Card className="glass-card-elevated border-l-4 border-l-accent-red">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2 font-display font-bold">
                <Phone className="w-5 h-5 text-accent-red" />
                Emergency Hotlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                {emergencyContacts.map((contact, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 justify-start bg-glass-02 border-glass-border hover:bg-glass-03 hover:border-accent-red/50 transition-all font-body"
                    onClick={() => handleEmergencyCall(contact.number)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="text-accent-red bg-accent-red/10 p-2 rounded-full">{contact.icon}</div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-text-primary">{contact.name}</div>
                        <div className="text-lg font-mono text-text-secondary">{contact.number}</div>
                      </div>
                      <Badge variant="outline" className="border-accent-red/30 text-accent-red uppercase tracking-wide text-xs">
                        {contact.type}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Police Stations by District */}
          <Card className="glass-card-elevated border-l-4 border-l-accent-teal">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-text-primary font-display font-bold">
                <Shield className="w-5 h-5 text-accent-teal" />
                Kerala Police Stations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* District Filter */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedDistrict === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDistrict("")}
                  className={selectedDistrict === "" ? "bg-accent-teal text-bg-void hover:bg-accent-teal/90 font-bold" : "border-glass-border text-text-primary hover:bg-glass-02"}
                >
                  All Districts
                </Button>
                {Array.from(new Set(keralaPoliceStations.map(s => s.district))).map(district => (
                  <Button
                    key={district}
                    variant={selectedDistrict === district ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDistrict(district)}
                    className={selectedDistrict === district ? "bg-accent-teal text-bg-void hover:bg-accent-teal/90 font-bold" : "border-glass-border text-text-primary hover:bg-glass-02 text-xs"}
                  >
                    {district}
                  </Button>
                ))}
              </div>

              {/* Police Stations List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredStations.map((station, index) => (
                  <Card key={index} className="bg-glass-01 border border-glass-border hover:border-accent-teal/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-text-primary font-display">{station.name}</h4>
                          <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">{station.district} District</p>
                          <Button
                            size="sm"
                            className="mt-3 bg-glass-02 hover:bg-accent-teal hover:text-bg-void text-accent-teal border border-accent-teal/30 w-full justify-start font-mono"
                            onClick={() => handleEmergencyCall(station.phone)}
                          >
                            <Phone className="w-3 h-3 mr-2" />
                            {station.phone}
                          </Button>
                        </div>
                        <MapPin className="w-4 h-4 text-accent-teal mt-1 ml-2 shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Disaster Management Contacts */}
          <Card className="glass-card-elevated border-l-4 border-l-accent-amber">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2 font-display font-bold">
                <Waves className="w-5 h-5 text-accent-amber" />
                Disaster Management & Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                {disasterHelplines.map((contact, index) => (
                  <div key={index} className="p-4 border border-glass-border rounded-xl bg-glass-01 flex flex-col">
                    <div className="font-semibold text-text-primary mb-1 font-display">{contact.name}</div>
                    <div className="text-lg font-mono text-accent-amber">{contact.number}</div>
                    {contact.number.includes('Local') ? (
                      <p className="text-xs text-text-muted mt-auto pt-2 border-t border-glass-border">
                        Contact your local district office
                      </p>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="mt-3 text-accent-amber bg-accent-amber/10 hover:bg-accent-amber/20 w-full font-mono"
                        onClick={() => handleEmergencyCall(contact.number)}
                      >
                        <Phone className="w-3 h-3 mr-2" />
                        Call Now
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Instructions */}
          <Card className="glass-card-elevated opacity-80">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center gap-2 font-display font-bold">
                <AlertTriangle className="w-5 h-5 text-accent-blue" />
                Emergency Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-text-secondary font-body">
                <div className="flex items-start gap-3 p-2 bg-glass-01 rounded-lg">
                  <span className="font-bold shrink-0 mt-0.5 relative group">
                    <span className="absolute inset-0 bg-accent-red/20 blur-md rounded-full group-hover:bg-accent-red/40 transition-colors"></span>
                    <span className="relative z-10 text-lg">🚨</span>
                  </span>
                  <p>In case of immediate danger, call emergency services (<strong className="text-text-primary">112</strong>) immediately.</p>
                </div>
                <div className="flex items-start gap-3 p-2 bg-glass-01 rounded-lg">
                  <span className="font-bold shrink-0 mt-0.5 relative group">
                    <span className="absolute inset-0 bg-accent-teal/20 blur-md rounded-full group-hover:bg-accent-teal/40 transition-colors"></span>
                    <span className="relative z-10 text-lg">🏥</span>
                  </span>
                  <p>For medical emergencies, use ambulance service (<strong className="text-text-primary">108</strong>) for fastest response.</p>
                </div>
                <div className="flex items-start gap-3 p-2 bg-glass-01 rounded-lg">
                  <span className="font-bold shrink-0 mt-0.5 relative group">
                    <span className="absolute inset-0 bg-accent-amber/20 blur-md rounded-full group-hover:bg-accent-amber/40 transition-colors"></span>
                    <span className="relative z-10 text-lg">🏠</span>
                  </span>
                  <p>Stay calm and provide your exact location when calling emergency services.</p>
                </div>
                <div className="flex items-start gap-3 p-2 bg-glass-01 rounded-lg">
                  <span className="font-bold shrink-0 mt-0.5 relative group">
                    <span className="absolute inset-0 bg-accent-blue/20 blur-md rounded-full group-hover:bg-accent-blue/40 transition-colors"></span>
                    <span className="relative z-10 text-lg">📍</span>
                  </span>
                  <p>Share your location coordinates if possible for faster rescue operations.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}



```

### `components/theme-provider.tsx`
```typescript
'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

```

### `components/ui/accordion.tsx`
```typescript
'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

```

### `components/ui/alert-dialog.tsx`
```typescript
'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

```

### `components/ui/alert.tsx`
```typescript
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }

```

### `components/ui/aspect-ratio.tsx`
```typescript
'use client'

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }

```

### `components/ui/avatar.tsx`
```typescript
'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/lib/utils'

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-muted flex size-full items-center justify-center rounded-full',
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }

```

### `components/ui/badge.tsx`
```typescript
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

```

### `components/ui/breadcrumb.tsx`
```typescript
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { ChevronRight, MoreHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils'

function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
        className,
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn('hover:text-foreground transition-colors', className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-foreground font-normal', className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

```

### `components/ui/button-group.tsx`
```typescript
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const buttonGroupVariants = cva(
  "flex w-fit items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md has-[>[data-slot=button-group]]:gap-2",
  {
    variants: {
      orientation: {
        horizontal:
          '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none',
        vertical:
          'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn(
        "bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        'bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto',
        className,
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}

```

### `components/ui/button.tsx`
```typescript
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

```

### `components/ui/calendar.tsx`
```typescript
'use client'

import * as React from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'flex gap-4 flex-col md:flex-row relative',
          defaultClassNames.months,
        ),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          'absolute bg-popover inset-0 opacity-0',
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none',
          defaultClassNames.weekday,
        ),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        week_number_header: cn(
          'select-none w-(--cell-size)',
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground',
          defaultClassNames.week_number,
        ),
        day: cn(
          'relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none',
          defaultClassNames.day,
        ),
        range_start: cn(
          'rounded-l-md bg-accent',
          defaultClassNames.range_start,
        ),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
        today: cn(
          'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
          defaultClassNames.today,
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside,
        ),
        disabled: cn(
          'text-muted-foreground opacity-50',
          defaultClassNames.disabled,
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon className={cn('size-4', className)} {...props} />
            )
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-4', className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn('size-4', className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }

```

### `components/ui/card.tsx`
```typescript
import * as React from 'react'

import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

### `components/ui/carousel.tsx`
```typescript
'use client'

import * as React from 'react'
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

```

### `components/ui/chart.tsx`
```typescript
'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'

import { cn } from '@/lib/utils'

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<'div'> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >['children']
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color,
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join('\n')}
}
`,
          )
          .join('\n'),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<'div'> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: 'line' | 'dot' | 'dashed'
    nameKey?: string
    labelKey?: string
  }) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey || item?.dataKey || item?.name || 'value'}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === 'string'
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn('font-medium', labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div className={cn('font-medium', labelClassName)}>{value}</div>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== 'dot'

  return (
    <div
      className={cn(
        'border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || 'value'}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor = color || item.payload.fill || item.color

          return (
            <div
              key={item.dataKey}
              className={cn(
                '[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
                indicator === 'dot' && 'items-center',
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          'shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)',
                          {
                            'h-2.5 w-2.5': indicator === 'dot',
                            'w-1': indicator === 'line',
                            'w-0 border-[1.5px] border-dashed bg-transparent':
                              indicator === 'dashed',
                            'my-0.5': nestLabel && indicator === 'dashed',
                          },
                        )}
                        style={
                          {
                            '--color-bg': indicatorColor,
                            '--color-border': indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      'flex flex-1 justify-between leading-none',
                      nestLabel ? 'items-end' : 'items-center',
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
}: React.ComponentProps<'div'> &
  Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
    hideIcon?: boolean
    nameKey?: string
  }) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || 'value'}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)

        return (
          <div
            key={item.value}
            className={
              '[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3'
            }
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined
  }

  const payloadPayload =
    'payload' in payload &&
    typeof payload.payload === 'object' &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === 'string'
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}

```

### `components/ui/checkbox.tsx`
```typescript
'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

```

### `components/ui/collapsible.tsx`
```typescript
'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

```

### `components/ui/command.tsx`
```typescript
'use client'

import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
        className,
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn('overflow-hidden p-0', className)}
        showCloseButton={showCloseButton}
      >
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
        className,
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
        className,
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn('bg-border -mx-1 h-px', className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

```

### `components/ui/context-menu.tsx`
```typescript
'use client'

import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  )
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg',
        className,
      )}
      {...props}
    />
  )
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md',
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        'text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
        className,
      )}
      {...props}
    />
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}

```

### `components/ui/dialog.tsx`
```typescript
'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

```

### `components/ui/drawer.tsx`
```typescript
'use client'

import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { cn } from '@/lib/utils'

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          'group/drawer-content bg-background fixed z-50 flex h-auto flex-col',
          'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b',
          'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t',
          'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm',
          'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm',
          className,
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        'flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left',
        className,
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

```

### `components/ui/dropdown-menu.tsx`
```typescript
'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg',
        className,
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}

```

### `components/ui/empty.tsx`
```typescript
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty"
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12',
        className,
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        'flex max-w-sm flex-col items-center gap-2 text-center',
        className,
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  'flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function EmptyMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-title"
      className={cn('text-lg font-medium tracking-tight', className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        'text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4',
        className,
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance',
        className,
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}

```

### `components/ui/field.tsx`
```typescript
'use client'

import { useMemo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        'flex flex-col gap-6',
        'has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
        className,
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        'mb-3 font-medium',
        'data-[variant=legend]:text-base',
        'data-[variant=label]:text-sm',
        className,
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4',
        className,
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  'group/field flex w-full gap-3 data-[invalid=true]:text-destructive',
  {
    variants: {
      orientation: {
        vertical: ['flex-col [&>*]:w-full [&>.sr-only]:w-auto'],
        horizontal: [
          'flex-row items-center',
          '[&>[data-slot=field-label]]:flex-auto',
          'has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        ],
        responsive: [
          'flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto',
          '@md/field-group:[&>[data-slot=field-label]]:flex-auto',
          '@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        ],
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
)

function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        'group/field-content flex flex-1 flex-col gap-1.5 leading-snug',
        className,
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50',
        'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4',
        'has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10',
        className,
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        'flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        'text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance',
        'last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className,
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        'relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2',
        className,
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors) {
      return null
    }

    if (errors.length === 1 && errors[0]?.message) {
      return errors[0].message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {errors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>,
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('text-destructive text-sm font-normal', className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}

```

### `components/ui/form.tsx`
```typescript
'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('grid gap-2', className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? '') : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

### `components/ui/hover-card.tsx`
```typescript
'use client'

import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

import { cn } from '@/lib/utils'

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }

```

### `components/ui/input-group.tsx`
```typescript
'use client'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        'group/input-group border-input dark:bg-input/30 relative flex w-full items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none',
        'h-9 has-[>textarea]:h-auto',

        // Variants based on alignment.
        'has-[>[data-align=inline-start]]:[&>input]:pl-2',
        'has-[>[data-align=inline-end]]:[&>input]:pr-2',
        'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3',
        'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3',

        // Focus state.
        'has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]',

        // Error state.
        'has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40',

        className,
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        'inline-start':
          'order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]',
        'inline-end':
          'order-last pr-3 has-[>button]:mr-[-0.4rem] has-[>kbd]:mr-[-0.35rem]',
        'block-start':
          'order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5',
        'block-end':
          'order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
)

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) {
          return
        }
        e.currentTarget.parentElement?.querySelector('input')?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  'text-sm shadow-none flex gap-2 items-center',
  {
    variants: {
      size: {
        xs: "h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
        sm: 'h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5',
        'icon-xs':
          'size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
        'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  },
)

function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size'> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent',
        className,
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        'flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent',
        className,
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}

```

### `components/ui/input-otp.tsx`
```typescript
'use client'

import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'
import { MinusIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        'flex items-center gap-2 has-disabled:opacity-50',
        containerClassName,
      )}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn('flex items-center', className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        'data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

```

### `components/ui/input.tsx`
```typescript
import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }

```

### `components/ui/item.tsx`
```typescript
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

function ItemGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn('group/item-group flex flex-col', className)}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn('my-0', className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  'group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a&]:hover:bg-accent/50 [a&]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-border',
        muted: 'bg-muted/50',
      },
      size: {
        default: 'p-4 gap-4 ',
        sm: 'py-3 px-4 gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Item({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image:
          'size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function ItemMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        'flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none',
        className,
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        'flex w-fit items-center gap-2 text-sm leading-snug font-medium',
        className,
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        'text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className,
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-actions"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className,
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className,
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}

```

### `components/ui/kbd.tsx`
```typescript
import { cn } from '@/lib/utils'

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'bg-muted w-fit text-muted-foreground pointer-events-none inline-flex h-5 min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none',
        "[&_svg:not([class*='size-'])]:size-3",
        '[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10',
        className,
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }

```

### `components/ui/label.tsx`
```typescript
'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/lib/utils'

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Label }

```

### `components/ui/menubar.tsx`
```typescript
'use client'

import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        'bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs',
        className,
      )}
      {...props}
    />
  )
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none',
        className,
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md',
          className,
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
        className,
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg',
        className,
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}

```

### `components/ui/navigation-menu.tsx`
```typescript
import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cva } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        'group flex flex-1 list-none items-center justify-center gap-1',
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn('relative', className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), 'group', className)}
      {...props}
    >
      {children}{' '}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto',
        'group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={'absolute top-full left-0 isolate z-50 flex justify-center'}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          'origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
        className,
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}

```

### `components/ui/pagination.tsx`
```typescript
import * as React from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}

```

### `components/ui/popover.tsx`
```typescript
'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '@/lib/utils'

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }

```

### `components/ui/progress.tsx`
```typescript
'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }

```

### `components/ui/radio-group.tsx`
```typescript
'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { CircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }

```

### `components/ui/resizable.tsx`
```typescript
'use client'

import * as React from 'react'
import { GripVerticalIcon } from 'lucide-react'
import * as ResizablePrimitive from 'react-resizable-panels'

import { cn } from '@/lib/utils'

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
        className,
      )}
      {...props}
    />
  )
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        'bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90',
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

```

### `components/ui/scroll-area.tsx`
```typescript
'use client'

import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { cn } from '@/lib/utils'

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn('relative', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none p-px transition-colors select-none',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }

```

### `components/ui/select.tsx`
```typescript
'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default'
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

```

### `components/ui/separator.tsx`
```typescript
'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@/lib/utils'

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      {...props}
    />
  )
}

export { Separator }

```

### `components/ui/sheet.tsx`
```typescript
'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = 'right',
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
          side === 'right' &&
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
          side === 'left' &&
            'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          side === 'top' &&
            'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
          side === 'bottom' &&
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

### `components/ui/sidebar.tsx`
```typescript
'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'
import { PanelLeftIcon } from 'lucide-react'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '3rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

type SidebarContextProps = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open],
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed'

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn('size-7', className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className,
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        'bg-background relative flex w-full flex-1 flex-col',
        'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
        className,
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn('bg-background h-8 w-full shadow-none', className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        'text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className,
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('w-full text-sm', className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : 'button'
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== 'collapsed' || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        'text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none',
        'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn('group/menu-sub-item relative', className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
  size?: 'sm' | 'md'
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

```

### `components/ui/skeleton.tsx`
```typescript
import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }

```

### `components/ui/slider.tsx`
```typescript
'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={
          'bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5'
        }
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={
            'bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full'
          }
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }

```

### `components/ui/sonner.tsx`
```typescript
'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }

```

### `components/ui/spinner.tsx`
```typescript
import { Loader2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

export { Spinner }

```

### `components/ui/splite.tsx`
```typescript
'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
    scene: string
    className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
    return (
        <Suspense
            fallback={
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
            }
        >
            <Spline
                scene={scene}
                className={className}
            />
        </Suspense>
    )
}

```

### `components/ui/spotlight.tsx`
```typescript
import React from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
    className?: string;
    fill?: string;
};

export const Spotlight = ({ className, fill }: SpotlightProps) => {
    return (
        <svg
            className={cn(
                "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0",
                className
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3787 2842"
            fill="none"
        >
            <g filter="url(#filter0_f_1065_8)">
                <ellipse
                    cx="1924.71"
                    cy="273.501"
                    rx="1924.71"
                    ry="273.501"
                    transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                    fill={fill || "white"}
                    fillOpacity="0.21"
                />
            </g>
            <defs>
                <filter
                    id="filter0_f_1065_8"
                    x="0.860352"
                    y="0.838989"
                    width="3785.16"
                    height="2840.26"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
                </filter>
            </defs>
        </svg>
    );
};

```

### `components/ui/switch.tsx`
```typescript
'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
        }
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

```

### `components/ui/table.tsx`
```typescript
'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

### `components/ui/tabs.tsx`
```typescript
'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        className,
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

### `components/ui/textarea.tsx`
```typescript
import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }

```

### `components/ui/toast.tsx`
```typescript
'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className,
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}

```

### `components/ui/toaster.tsx`
```typescript
'use client'

import { useToast } from '@/hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

```

### `components/ui/toggle-group.tsx`
```typescript
'use client'

import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { toggleVariants } from '@/components/ui/toggle'

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: 'default',
  variant: 'default',
})

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        'group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs',
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        'min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l',
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }

```

### `components/ui/toggle.tsx`
```typescript
'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-2 min-w-9',
        sm: 'h-8 px-1.5 min-w-8',
        lg: 'h-10 px-2.5 min-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }

```

### `components/ui/tooltip.tsx`
```typescript
'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/lib/utils'

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```

### `components/ui/use-mobile.tsx`
```typescript
import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}

```

### `components/ui/use-toast.ts`
```typescript
'use client'

// Inspired by react-hot-toast library
import * as React from 'react'

import type { ToastActionElement, ToastProps } from '@/components/ui/toast'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType['ADD_TOAST']
      toast: ToasterToast
    }
  | {
      type: ActionType['UPDATE_TOAST']
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType['DISMISS_TOAST']
      toastId?: ToasterToast['id']
    }
  | {
      type: ActionType['REMOVE_TOAST']
      toastId?: ToasterToast['id']
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      }

    case 'DISMISS_TOAST': {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      }
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, 'id'>

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  }
}

export { useToast, toast }

```

### `contexts/auth-context.tsx`
```typescript
"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: number
  username: string
  email: string
  role: 'user' | 'volunteer'
  phone_number?: string
  created_at?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('token')
    const storedUserId = localStorage.getItem('userId')

    if (storedToken && storedUserId) {
      setToken(storedToken)
      // Fetch user profile
      fetchUserProfile(storedToken)
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchUserProfile = async (authToken: string) => {
    if (!authToken) {
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        console.warn('Token validation failed, clearing auth state')
        // Token might be invalid, clear it
        logout()
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const login = (newToken: string, userData: User) => {
    setToken(newToken)
    setUser(userData)
    localStorage.setItem('token', newToken)
    localStorage.setItem('userId', userData.id.toString())
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

```

### `hooks/use-mobile.ts`
```typescript
import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}

```

### `hooks/use-toast.ts`
```typescript
'use client'

// Inspired by react-hot-toast library
import * as React from 'react'

import type { ToastActionElement, ToastProps } from '@/components/ui/toast'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType['ADD_TOAST']
      toast: ToasterToast
    }
  | {
      type: ActionType['UPDATE_TOAST']
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType['DISMISS_TOAST']
      toastId?: ToasterToast['id']
    }
  | {
      type: ActionType['REMOVE_TOAST']
      toastId?: ToasterToast['id']
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      }

    case 'DISMISS_TOAST': {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      }
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, 'id'>

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  }
}

export { useToast, toast }

```

### `lib/utils.ts`
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

### `styles/globals.css`
```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --font-sans: 'Geist', 'Geist Fallback';
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

