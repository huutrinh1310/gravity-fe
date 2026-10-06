import { DEFAULT_THEME, mergeMantineTheme, type MantineThemeOverride } from '@mantine/core';

const themeOverride: MantineThemeOverride = {
  colors: {
    primary: [
      'oklch(0.55 0.22 290)',
      'oklch(0.55 0.22 291)',
      'oklch(0.55 0.22 292)',
      'oklch(0.55 0.22 293)',
      'oklch(0.55 0.22 294)',
      'oklch(0.55 0.22 295)',
      'oklch(0.55 0.22 296)',
      'oklch(0.55 0.22 297)',
      'oklch(0.55 0.22 298)',
      'oklch(0.55 0.22 299)',
    ],
    secondary: [
      'oklch(0.92 0.02 275)',
      'oklch(0.92 0.02 276)',
      'oklch(0.92 0.02 277)',
      'oklch(0.92 0.02 278)',
      'oklch(0.92 0.02 279)',
      'oklch(0.92 0.02 270)',
      'oklch(0.92 0.02 280)',
      'oklch(0.92 0.02 281)',
      'oklch(0.92 0.02 282)',
      'oklch(0.92 0.02 283)',
    ],
  },
  primaryColor: 'primary',
  autoContrast: true,
  components: {
    AppShell: {
      defaultProps: {
        padding: 'md',
      },
      styles: {
        root: {
          backgroundColor: 'var(--background-gradient)',
        },
        navbar: {
          background: 'inherit',
        },
        header: {
          background: 'inherit',
        },
        footer: {
          background: 'var(--background)',
          display: 'flex',
          width: '100%',
        },
      },
    },
  },
};

export const theme: MantineThemeOverride = mergeMantineTheme(DEFAULT_THEME, themeOverride);
