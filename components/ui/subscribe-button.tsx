"use client";

import { useActionState, startTransition } from "react";
import { usePathname } from "next/navigation";
import { toggleSubscription } from "@/app/actions/subscription";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscribeButtonProps {
  initialState: boolean;
  subscribeText: string;
  unsubscribeText: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function SubscribeButton({
  initialState,
  subscribeText,
  unsubscribeText,
  size = "sm",
  className,
}: SubscribeButtonProps) {
  const pathname = usePathname();

  const [isSubscribed, action, pending] = useActionState(
    () => toggleSubscription(pathname),
    initialState
  );

  return (
    <Button
      onClick={() => startTransition(action)}
      variant={isSubscribed ? "outline" : "default"}
      size={size}
      className={cn(
        className,
        isSubscribed
          ? "hover:bg-gray-200 hover:text-black"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      )}
      disabled={pending}
    >
      <div className="flex w-full justify-center gap-2">
        {pending && <Loader2 className="w-3 h-3 animate-spin" />}
        {isSubscribed ? unsubscribeText : subscribeText}
      </div>
    </Button>
  );
}
