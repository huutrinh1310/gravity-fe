import { MantineProvider } from '@mantine/core'
import * as React from 'react'

export interface ThemeProviderProps {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <MantineProvider>{children}</MantineProvider>
}
