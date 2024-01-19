import { createContext } from 'react';

export const initialThemeState = {
  theme: `dark`,
  setTheme: (() => null)
};

export const ThemeContext = createContext(initialThemeState);