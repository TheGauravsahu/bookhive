import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/bookhive/header";
import Footer from "@/components/bookhive/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCProvider } from "@/trpc/client";

export const metadata: Metadata = {
  title: "BookHive - Ultimate destination for book lovers",
  description:
    "Your ultimate destination for book lovers. Read reviews rate books and share recommendations with the community.",
};

const jakarta = Plus_Jakarta_Sans({ weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className}  antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider>
            <Header />
            <main className="min-h-screen w-full pt-16 md:pt-4">{children}</main>
            <Footer />
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
