// src/context/AppSettingsContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Language = 'es' | 'en';

interface AppSettingsContextValue {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLanguage: (language: Language) => void;
}

const AppSettingsContext = createContext<AppSettingsContextValue | undefined>(
  undefined
);

export const AppSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';

    const saved = window.localStorage.getItem('laptelligence-theme');
    if (saved === 'light' || saved === 'dark') return saved;

    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    return prefersDark ? 'dark' : 'light';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'es';

    const saved = window.localStorage.getItem('laptelligence-language');
    return saved === 'en' ? 'en' : 'es';
  });

  useEffect(() => {
    // <html data-theme="dark|light"> para manejar variables CSS
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('laptelligence-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem('laptelligence-language', language);
  }, [language]);

  const setTheme = (next: Theme) => setThemeState(next);
  const toggleTheme = () =>
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const setLanguage = (next: Language) => setLanguageState(next);

  return (
    <AppSettingsContext.Provider
      value={{ theme, language, setTheme, toggleTheme, setLanguage }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = (): AppSettingsContextValue => {
  const ctx = useContext(AppSettingsContext);
  if (!ctx) {
    throw new Error('useAppSettings must be used within AppSettingsProvider');
  }
  return ctx;
};
