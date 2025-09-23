import type React from "react";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { StickyDesktopNavigation } from "@/components/ui/desktop-header";
import { i18n } from "@/i18n.config";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Platform Press",
    template: "%s | The Platform Press",
  },
  description:
    "Your source for the latest news, analysis, and insights from around the world.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const generateStaticParams = async () => {
  return i18n.locales.map((locale) => ({ locale }));
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html
      className={`${GeistSans.className} ${poppins.variable}`}
      lang={locale}
    >
      <body className="bg-white text-black antialiased min-h-screen flex flex-col">
        <Header locale={locale} />
        <StickyDesktopNavigation locale={locale} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex-grow">
          {/* {children} */}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
