"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function subscribeUser(formData: FormData) {
  const currentPath = formData.get("currentPath") as string | null;

  const cookieStore = await cookies();
  cookieStore.set("platform-press-subscription", "true", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  let redirectPath = "/";

  if (currentPath) {
    // If on paywall route, redirect to equivalent articles route
    if (currentPath.includes("/paywall")) {
      redirectPath = currentPath.replace("/paywall", "");
    } else {
      redirectPath = currentPath;
    }
  }

  redirect(redirectPath);
}

export async function toggleSubscription(currentPath?: string): Promise<boolean> {
  const cookieStore = await cookies();
  const subscriptionCookie = cookieStore.get("platform-press-subscription");
  const hasSubscription = subscriptionCookie?.value === "true";

  if (hasSubscription) {
    // Unsubscribing
    cookieStore.delete("platform-press-subscription");

    // If on article page, redirect to trigger middleware (which will rewrite to paywall)
    if (currentPath && currentPath.includes('/articles/') && !currentPath.includes('/paywall')) {
      redirect(currentPath); // This will trigger middleware to rewrite to paywall
    }

    return false;
  } else {
    // Subscribing
    cookieStore.set("platform-press-subscription", "true", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });

    // If on paywall, redirect to article page
    if (currentPath && currentPath.includes('/paywall')) {
      redirect(currentPath.replace('/paywall', ''));
    }

    return true;
  }
}

export async function isSubscribed(): Promise<boolean> {
  const cookieStore = await cookies();
  const subscriptionCookie = cookieStore.get("platform-press-subscription");
  return subscriptionCookie?.value === "true";
}
