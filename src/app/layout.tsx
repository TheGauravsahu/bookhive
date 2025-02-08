import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/bookhive/header";
import Footer from "@/components/bookhive/footer";
import Providers from "@/components/providers/providers";

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
      <body
        className={`${jakarta.className}  antialiased dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white`}
      >
        <Header />
        <main>
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
