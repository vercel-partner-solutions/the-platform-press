import { DesktopHeader } from "@/components/ui/desktop-header";
import { MobileHeader } from "@/components/ui/mobile-header";
import { getCategories } from "@/lib/cms";
import { StickyCategories } from "../ui/sticky-categories";

export async function Header({ locale }: { locale: string }) {
  const categories = await getCategories();
  return (
    <div>
      <div className="border-b border-neutral-200">
        <DesktopHeader locale={locale} />
        <MobileHeader locale={locale} />
      </div>
      <StickyCategories categories={categories} locale={locale} />
    </div>
  );
}
