import * as React from 'react';

import { MantineProvider } from '@mantine/core';

export interface ThemeProviderProperties {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: Readonly<ThemeProviderProperties>) {
  return (
    <MantineProvider
      theme={{
        breakpoints: { lg: '80em', md: '64em', sm: '48em', xl: '96em', xs: '40em' },
        fontFamily: 'var(--font-grotesk)',
        fontFamilyMonospace: 'var(--font-mono)',
        headings: { fontFamily: 'var(--font-grotesk)' },
      }}
    >
      {children}
    </MantineProvider>
  );
}
