import { Suspense } from "react";
import ContinueReadingSection from "./continue-reading-section";
import ContinueReadingSkeleton from "./continue-reading-skeleton";

export default function ContinueReading({
  locale,
  fallbackCategoryId,
}: {
  locale: string;
  fallbackCategoryId: string;
}) {
  return (
    <Suspense fallback={<ContinueReadingSkeleton />}>
      <ContinueReadingSection
        fallbackCategoryId={fallbackCategoryId}
        locale={locale}
      />
    </Suspense>
  );
}
