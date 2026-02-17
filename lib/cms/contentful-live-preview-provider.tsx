"use client";

import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import { ReactNode } from "react";

interface LivePreviewProviderProps {
  children: ReactNode;
  locale?: string;
  enabled?: boolean;
}

export function LivePreviewProvider({
  children,
  locale = "en",
  enabled = true,
}: LivePreviewProviderProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ContentfulLivePreviewProvider
      locale={locale}
      enableInspectorMode
      enableLiveUpdates
    >
      {children}
    </ContentfulLivePreviewProvider>
  );
}
