import { Suspense } from "react";
import ContinueReadingSection from "./continue-reading-section";
import ContinueReadingSkeleton from "./continue-reading-skeleton";

export default function ContinueReading({
  locale,
  fallbackCategory = "Science",
}: {
  locale: string;
  fallbackCategory?: string;
}) {
  return (
    <Suspense fallback={<ContinueReadingSkeleton />}>
      <ContinueReadingSection
        fallbackCategory={fallbackCategory}
        locale={locale}
      />
    </Suspense>
  );
}
