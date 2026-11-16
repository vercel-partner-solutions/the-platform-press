import { SubscribeModal } from "@/components/paywall/subscribe-modal";
import ArticlePage, { generateMetadata, generateStaticParams } from "../page";

export { generateMetadata, generateStaticParams };

export default function PaywalledArticlePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  return (
    <div>
      <PaywallWrapper previewLength={500}>
        <ArticlePage params={params} previewOnly />
      </PaywallWrapper>
      <SubscribeModal />
    </div>
  );
}

function PaywallWrapper({
  children,
  previewLength,
}: {
  children: React.ReactNode;
  previewLength?: number;
}) {
  return (
    <div className="relative">
      <div
        className="overflow-hidden relative"
        style={{ maxHeight: `${previewLength}px` }}
      >
        {children}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}
