import React from "react";
import { GlobalContextProvider } from "../contexts/GlobalContextProvider.tsx";
import { ThemeProvider } from "@/components/ui/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalContextProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </GlobalContextProvider>
  );
}
