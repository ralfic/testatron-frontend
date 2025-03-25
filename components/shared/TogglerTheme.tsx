'use client';

import { useTheme } from 'next-themes';
import { Switch } from '../ui/switch';

export function TogglerTheme() {
  const { setTheme, theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <Switch
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      checked={theme === 'dark'}
    />
  );
}
