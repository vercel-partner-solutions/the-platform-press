import { DesktopHeader } from "@/components/ui/desktop-header";
import { MobileHeader } from "@/components/ui/mobile-header";

export function Header({ locale }: { locale: string }) {
  return (
    <div className="border-b border-neutral-200">
      <DesktopHeader locale={locale} />
      <MobileHeader locale={locale} />
    </div>
  );
}
