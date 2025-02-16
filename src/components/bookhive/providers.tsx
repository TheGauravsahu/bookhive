import React from "react";
import { TRPCProvider } from "@/trpc/client";
import { ThemeProvider } from "../theme-provider";

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
