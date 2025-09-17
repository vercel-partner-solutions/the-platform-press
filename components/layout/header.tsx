import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { DesktopHeader } from "@/components/ui/desktop-header";
import { MobileHeader } from "@/components/ui/mobile-header";

export async function Header() {
  const locale = await getLocale();

  return (
    <NextIntlClientProvider locale={locale} messages={null}>
      <MobileHeader />
      <DesktopHeader />
    </NextIntlClientProvider>
  );
}
