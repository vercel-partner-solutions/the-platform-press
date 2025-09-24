import { Suspense } from "react";
import ContinueReadingSkeleton from "./continue-reading-skeleton";
import ContinueReadingSection from "./continue-reading-section";

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
