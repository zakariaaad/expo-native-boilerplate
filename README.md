# Expo Boilerplate 🚀

A production-ready Expo (React Native) starter with a clean, scalable architecture and **NativeWind v4** for styling.

## Stack

| Layer | Library |
|---|---|
| Navigation | Expo Router v3 (file-based) |
| Styling | NativeWind v4 (Tailwind CSS) |
| State | Zustand |
| Server state / caching | TanStack React Query v5 |
| HTTP client | Axios (with interceptors) |
| Auth persistence | expo-secure-store |
| Dark mode | NativeWind `darkMode: 'class'` + Zustand |
| Class merging | tailwind-merge + clsx (`cn()`) |
| Types | TypeScript strict mode |

## Project Structure

```
app/                      # Expo Router file-based routes
├── _layout.tsx           # Root layout — imports global.css, applies dark class
├── index.tsx             # Redirect guard
├── (auth)/
│   ├── login.tsx
│   └── register.tsx
└── (tabs)/
    ├── index.tsx         # Home — posts list with pull-to-refresh
    ├── explore.tsx       # Search bar
    └── profile.tsx       # Dark mode toggle + logout

src/
├── components/
│   ├── ui/               # Button, Card — accept className prop
│   └── layout/           # Header
├── constants/
│   └── env.ts            # API base URL
├── hooks/
│   ├── useAuth.ts        # Login / register / logout actions
│   └── usePosts.ts       # React Query data fetching example
├── lib/
│   ├── apiClient.ts      # Axios + auth interceptors
│   ├── queryClient.ts    # React Query defaults
│   └── cn.ts             # tailwind-merge helper
├── services/
│   └── authService.ts    # Auth API calls
├── store/
│   ├── authStore.ts      # Token + user (SecureStore persistence)
│   └── themeStore.ts     # isDark state + useTheme() hook (syncs NativeWind)
└── types/
    └── index.ts
```

## How Dark Mode Works

NativeWind v4 uses `darkMode: 'class'`. The root `GestureHandlerRootView` in `app/_layout.tsx` receives `className="dark flex-1"` when dark mode is active. Every `dark:` variant across the whole tree responds automatically.

Toggle dark mode anywhere with:

```tsx
import { useTheme } from '@/store/themeStore';

const { isDark, toggle } = useTheme();
// toggle() flips Zustand state AND calls NativeWind's setColorScheme()
```

## Writing Styles

Always use `className` — no `StyleSheet` needed:

```tsx
// ✅ Semantic tokens that respond to dark mode automatically
<View className="bg-background dark:bg-background-dark p-4 rounded-xl">
  <Text className="text-foreground dark:text-foreground-dark font-semibold">
    Hello
  </Text>
</View>

// ✅ Compose classes conditionally with cn()
import { cn } from '@/lib/cn';
<View className={cn('p-4 rounded-xl', isActive && 'bg-primary dark:bg-primary-dark')} />

// ✅ Pass className to extend components
<Card className="p-6 mb-4">...</Card>
```

## Getting Started

```bash
npm install
npx expo start
```

### Configure your API URL

Edit `src/constants/env.ts` or add to `app.json > extra`:

```json
"extra": { "apiUrl": "https://api.yourdomain.com" }
```

### Auth endpoints

Update `src/services/authService.ts` — expected shape:
- `POST /auth/login` → `{ token: string, user: { id, name, email } }`
- `POST /auth/register` → same

---

## EAS (Expo Application Services)

### First-time setup

```bash
# 1. Install EAS CLI globally (or use the one in devDependencies)
npm install -g eas-cli

# 2. Log in to your Expo account
eas login

# 3. Link this project to EAS (creates / updates projectId in app.config.ts)
eas init

# 4. Configure credentials (certs, keystores) — EAS manages them for you
eas credentials
```

> After `eas init`, replace `YOUR_EAS_PROJECT_ID` in `app.config.ts` and `YOUR_PROJECT_ID` in the `updates.url` field with the values Expo printed.

---

### Build profiles

| Profile | Command | Output | Use for |
|---|---|---|---|
| `development` | `npm run build:dev` | Dev client APK / Simulator build | Local device testing with hot reload |
| `preview` | `npm run build:preview` | Internal APK / IPA | Testers via QR code link |
| `production` | `npm run build:prod` | AAB + IPA | App Store / Play Store |

```bash
# Build for a single platform
npm run build:dev:ios
npm run build:preview:android
npm run build:prod:ios
```

---

### OTA updates (EAS Update)

Push JS-only updates instantly — no store review required for logic/UI changes.

```bash
# Push to production channel
npm run update -- "fix: crash on login screen"

# Push to preview channel
npm run update:preview -- "feat: new onboarding flow"
```

`runtimeVersion` is set to `appVersion` in `app.config.ts`, meaning an OTA update is only delivered to devices running the **same app version**. Bump the version in `app.config.ts` when you change native code.

---

### Submit to stores

```bash
# After a production build completes:
npm run submit:ios       # → TestFlight / App Store
npm run submit:android   # → Play Store internal track
```

Fill in your Apple credentials in `eas.json > submit.production.ios` before running.

---

### Environment variants

The project uses a single `app.config.ts` instead of a static `app.json`. Each EAS build profile sets `APP_ENV` which selects the right:

- App name (e.g. `MyApp (Dev)` vs `MyApp`)
- Bundle ID / package name (separate installs per environment)
- API base URL
- App icon

| `APP_ENV` | Bundle ID suffix | API |
|---|---|---|
| `development` | `.dev` | `api-dev.yourcompany.com` |
| `preview` | `.preview` | `api-staging.yourcompany.com` |
| `production` | _(none)_ | `api.yourcompany.com` |

---

### GitHub Actions CI/CD

Add your `EXPO_TOKEN` secret to GitHub → Settings → Secrets:

```
EXPO_TOKEN = <token from expo.dev/accounts/[user]/settings/access-tokens>
```

| Branch | Trigger | Jobs run |
|---|---|---|
| PR → `main` or `develop` | Pull request | Lint + type-check |
| Push → `develop` | Merge | Quality → Preview build + Preview OTA update |
| Push → `main` | Merge | Quality → Production build → Production OTA update |
