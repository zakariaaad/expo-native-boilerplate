import { create } from 'zustand';
import { useColorScheme } from 'nativewind';

/**
 * Thin wrapper around NativeWind's useColorScheme so the rest of the app
 * can toggle dark mode through a single Zustand-like interface.
 *
 * NativeWind v4 handles applying the "dark" class on the root view automatically
 * when you call setColorScheme('dark' | 'light').
 */
type ThemeState = {
  isDark: boolean;
  toggle: () => void;
  setDark: (v: boolean) => void;
};

// Internal persisted preference store (no NativeWind calls here)
export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggle: () => set((s) => ({ isDark: !s.isDark })),
  setDark: (isDark) => set({ isDark }),
}));

/**
 * Use this hook in components that need to toggle dark mode.
 * It keeps Zustand state and NativeWind colorScheme in sync.
 */
export function useTheme() {
  const { isDark, toggle: _toggle, setDark: _setDark } = useThemeStore();
  const { setColorScheme } = useColorScheme();

  const toggle = () => {
    const next = !isDark;
    _setDark(next);
    setColorScheme(next ? 'dark' : 'light');
  };

  const setDark = (v: boolean) => {
    _setDark(v);
    setColorScheme(v ? 'dark' : 'light');
  };

  return { isDark, toggle, setDark };
}
