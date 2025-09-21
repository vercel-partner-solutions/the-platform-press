import { SubscribeModal } from "@/components/paywall/subscribe-modal";
import ArticlePage, { generateMetadata } from "../page";

export { generateMetadata };

export default function PaywalledArticlePage(props: any) {
  return (
    <div>
      <PaywallWrapper previewLength={300}>
        <ArticlePage {...props} />
      </PaywallWrapper>
      <SubscribeModal />
    </div>
  );
}

function PaywallWrapper({
  children,
  previewLength = 300,
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
