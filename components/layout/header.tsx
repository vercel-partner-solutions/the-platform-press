import { DesktopHeader } from "@/components/ui/desktop-header";
import { MobileHeader } from "@/components/ui/mobile-header";

export async function Header({ locale }: { locale: string }) {
  return (
    <>
      <MobileHeader />
      <DesktopHeader locale={locale} />
    </>
  );
}
