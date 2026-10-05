import { MantineProvider } from '@mantine/core';
import { theme } from '../../shared/constants/theme';

export interface ThemeProviderProperties {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: Readonly<ThemeProviderProperties>) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
