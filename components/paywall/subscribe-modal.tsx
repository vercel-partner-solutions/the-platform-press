"use client";

import { Loader2, Mail, Shield, Star, Zap } from "lucide-react";
import Form from "next/form";
import { usePathname } from "next/navigation";
import type React from "react";
import { useFormStatus } from "react-dom";
import { subscribeUser } from "@/app/actions/subscription";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Button } from "../ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3"
      disabled={pending}
    >
      {pending && (
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      )}
      Subscribe Now
    </Button>
  );
}

function SubscribeTitle() {
  return (
    <div>
      <div className="flex w-full justify-center">
        <div className="flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
          <Mail className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black mb-2">Continue Reading</h2>
        <p className="text-gray-600 text-sm">
          Subscribe to The Platform Press for unlimited access to quality
          journalism
        </p>
      </div>
    </div>
  );
}

function SubscribeContent({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-sm">
          <div className="flex-shrink-0 w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center">
            <Star className="w-3 h-3 text-accent" />
          </div>
          <span className="text-gray-700">Unlimited article access</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex-shrink-0 w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center">
            <Zap className="w-3 h-3 text-accent" />
          </div>
          <span className="text-gray-700">Breaking news alerts</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex-shrink-0 w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center">
            <Shield className="w-3 h-3 text-accent" />
          </div>
          <span className="text-gray-700">Ad-free reading experience</span>
        </div>
      </div>
      {children}
      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          Free for 7 days, then $9.99/month. Cancel anytime.
        </p>
      </div>
    </div>
  );
}

function SubscribeForm() {
  const pathname = usePathname();
  return (
    <Form action={subscribeUser}>
      <input type="hidden" name="currentPath" value={pathname} />
      <SubmitButton />
    </Form>
  );
}

export function SubscribeModal() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <Drawer open={true} dismissible={false}>
        <DrawerContent className="p-8">
          <DrawerHeader>
            <DrawerTitle>
              <SubscribeTitle />
            </DrawerTitle>
          </DrawerHeader>
          <SubscribeContent>
            <SubscribeForm />
          </SubscribeContent>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={true}>
      <DialogContent
        className="p-8"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <SubscribeTitle />
          </DialogTitle>
        </DialogHeader>
        <SubscribeContent>
          <SubscribeForm />
        </SubscribeContent>
      </DialogContent>
    </Dialog>
  );
}
