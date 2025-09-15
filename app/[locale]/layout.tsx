import React, { Suspense } from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Poppins } from "next/font/google";
import "../globals.css";
import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

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
  generator: "v0.dev",
};

export function generateStaticParams() {
  // Only generate static params for the default locale for balance between SSG and build times
  return routing.locales
    .filter((locale) => locale === "en-US")
    .map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html className={`${GeistSans.className} ${poppins.variable}`}>
      <body className="bg-white text-black antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
