import { isSubscribed } from "@/app/actions/subscription";
import { SubscribeButton } from "./subscribe-button";

interface SubscribeSectionProps {
  subscribeText: string;
  unsubscribeText: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export async function Subscribe({
  subscribeText,
  unsubscribeText,
  size = "sm",
  className,
}: SubscribeSectionProps) {
  const subscribed = await isSubscribed();

  return (
    <SubscribeButton
      key={subscribed ? "subscribed" : "unsubscribed"}
      initialState={subscribed}
      subscribeText={subscribeText}
      unsubscribeText={unsubscribeText}
      size={size}
      className={className}
    />
  );
}
