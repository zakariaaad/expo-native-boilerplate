import Constants from 'expo-constants';

type AppEnv = 'development' | 'preview' | 'production';

const extra = Constants.expoConfig?.extra ?? {};

export const APP_ENV: AppEnv = (extra.appEnv as AppEnv) ?? 'development';
export const API_BASE_URL: string = extra.apiUrl ?? 'https://api.yourcompany.com';

export const IS_DEV = APP_ENV === 'development';
export const IS_PREVIEW = APP_ENV === 'preview';
export const IS_PROD = APP_ENV === 'production';
