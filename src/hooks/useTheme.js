/**
 * useTheme — Architectural Portfolio Theme Management
 * 
 * Light is the default visual surface (warm paper editorial).
 * Dark mode can be toggled by the user and is persisted in localStorage.
 * Falls back to prefers-color-scheme only when no saved preference exists.
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'saravana-arch-theme';

function getInitialTheme() {
  // 1. Check localStorage first
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch (_) {
    // localStorage not available (SSR guard)
  }

  // 2. Fall back to OS preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }

  // 3. Default: light (warm paper)
  return 'light';
}

export function useTheme() {
  const [theme, setThemeState] = useState('light'); // SSR-safe default

  // Apply theme to <html> element
  const applyTheme = useCallback((newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch (_) {}
  }, []);

  // On mount, read actual persisted / OS preference
  useEffect(() => {
    const resolved = getInitialTheme();
    setThemeState(resolved);
    applyTheme(resolved);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  }, [applyTheme]);

  return { theme, toggleTheme, setTheme, isDark: theme === 'dark' };
}
