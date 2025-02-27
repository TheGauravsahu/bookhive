import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/bookhive/header";
import Footer from "@/components/bookhive/footer";
import { Toaster } from "@/components/ui/sonner";
import Provider from "@/components/bookhive/providers";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/bookhive/app-sidebar";

export const metadata: Metadata = {
  title: "BookHive - Ultimate destination for book lovers",
  description:
    "Your ultimate destination for book lovers. Read reviews rate books and share recommendations with the community.",
};

const jakarta = Plus_Jakarta_Sans({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.className}  antialiased`}>
        <Provider>
          <SidebarProvider defaultOpen={false}>
            <Header />
            <AppSidebar />
            <main className="min-h-screen w-full pt-20  pb-12">{children}</main>
          </SidebarProvider>
          <Toaster />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
