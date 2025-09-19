import type React from "react";
import "@/app/globals.css";
import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Header locale={locale} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {children}
      </main>
      <Footer />
    </>
  );
}
