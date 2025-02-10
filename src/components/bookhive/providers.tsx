import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCProvider } from "@/trpc/client";

interface ProviderInterface {
  children: React.ReactNode;
}
export default function Provider({ children }: ProviderInterface) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TRPCProvider>{children}</TRPCProvider>
    </ThemeProvider>
  );
}
