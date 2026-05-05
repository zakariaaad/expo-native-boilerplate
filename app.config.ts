import { ExpoConfig, ConfigContext } from 'expo/config';

/**
 * Dynamic app config driven by APP_ENV.
 * EAS sets APP_ENV via the `env` field in each build profile in eas.json.
 * Locally you can export it: `APP_ENV=preview npx expo start`
 */
const ENV = (process.env.APP_ENV ?? 'development') as
  | 'development'
  | 'preview'
  | 'production';

const variants = {
  development: {
    name: 'MyApp (Dev)',
    bundleId: 'com.yourcompany.myapp.dev',
    apiUrl: 'https://api-dev.yourcompany.com',
    icon: './assets/icon-dev.png',
  },
  preview: {
    name: 'MyApp (Preview)',
    bundleId: 'com.yourcompany.myapp.preview',
    apiUrl: 'https://api-staging.yourcompany.com',
    icon: './assets/icon-preview.png',
  },
  production: {
    name: 'MyApp',
    bundleId: 'com.yourcompany.myapp',
    apiUrl: 'https://api.yourcompany.com',
    icon: './assets/icon.png',
  },
} satisfies Record<string, { name: string; bundleId: string; apiUrl: string; icon: string }>;

const variant = variants[ENV];

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: variant.name,
  slug: 'my-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: variant.icon,
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: variant.bundleId,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: variant.bundleId,
  },
  web: {
    bundler: 'metro',
    favicon: './assets/favicon.png',
  },
  plugins: ['expo-router', 'expo-secure-store', 'expo-font'],
  scheme: 'my-app',
  experiments: { typedRoutes: true },
  updates: {
    url: 'https://u.expo.dev/YOUR_PROJECT_ID',
    enabled: true,
    fallbackToCacheTimeout: 0,
    checkAutomatically: 'ON_LOAD',
  },
  runtimeVersion: { policy: 'appVersion' },
  extra: {
    appEnv: ENV,
    apiUrl: variant.apiUrl,
    eas: {
      projectId: 'YOUR_EAS_PROJECT_ID',
    },
  },
});
