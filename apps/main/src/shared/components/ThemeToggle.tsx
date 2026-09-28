import { useEffect, useState } from 'react';

import { ActionIcon } from '@mantine/core';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'kv-theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as 'dark' | 'light' | null;

    return stored ?? (globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <ActionIcon
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="theme-toggle chromebtn"
      size={32}
      type="button"
      variant="unstyled"
      onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
    >
      {theme === 'dark' ? <Sun aria-hidden="true" size={16} /> : <Moon aria-hidden="true" size={16} />}
    </ActionIcon>
  );
}
