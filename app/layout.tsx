import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.className} ${poppins.variable}`}>
      <body className="bg-white text-black antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
