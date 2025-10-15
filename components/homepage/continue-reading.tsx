import { Suspense } from "react";
import ContinueReadingSection from "./continue-reading-section";
import ContinueReadingSkeleton from "./continue-reading-skeleton";

export default function ContinueReading({
  locale,
  fallbackCategoryId,
  draft = false,
}: {
  locale: string;
  fallbackCategoryId: string;
  draft?: boolean;
}) {
  return (
    <Suspense fallback={<ContinueReadingSkeleton />}>
      <ContinueReadingSection
        fallbackCategoryId={fallbackCategoryId}
        locale={locale}
        draft={draft}
      />
    </Suspense>
  );
}
