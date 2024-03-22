import { ThemeProvider } from 'next-themes';
import { type ReactNode } from 'react';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      enableColorScheme
      defaultTheme="system" // default "light"
    >
      {children}
    </ThemeProvider>
  );
}
