"use client";

import { usePathname } from "next/navigation";
import { useFormStatus } from "react-dom";
import Form from "next/form";
import { Button } from "@/components/ui/button";
import { Mail, Star, Zap, Shield, Loader2 } from "lucide-react";
import { subscribeUser } from "@/app/actions/subscription";

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

export function SubscribeModal() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden">
        <div className="absolute top-4 right-4 z-10"></div>

        <div className="p-8 pt-12">
          {/* Logo/Brand */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">
              Continue Reading
            </h2>
            <p className="text-gray-600 text-sm">
              Subscribe to The Platform Press for unlimited access to quality
              journalism
            </p>
          </div>

          {/* Features */}
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

          <Form action={subscribeUser}>
            <input type="hidden" name="currentPath" value={pathname} />
            <SubmitButton />
          </Form>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              Free for 7 days, then $9.99/month. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
