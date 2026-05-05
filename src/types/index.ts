// ─── User ────────────────────────────────────────────────────────────────────
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

// ─── API ─────────────────────────────────────────────────────────────────────
export type ApiError = {
  message: string;
  statusCode: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

// ─── Navigation ──────────────────────────────────────────────────────────────
// Extend this as you add more routes
export type RootStackParamList = {
  '(tabs)': undefined;
  '(auth)/login': undefined;
  '(auth)/register': undefined;
};
