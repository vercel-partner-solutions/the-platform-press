import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import type React from "react";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

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

export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'de' }]
}

export default async function RootLayout({
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
      <body className="bg-white text-black antialiased flex flex-col min-h-screen">
        <Header locale={locale} />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
