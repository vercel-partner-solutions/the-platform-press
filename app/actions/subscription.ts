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

export async function toggleSubscription(): Promise<boolean> {
  const cookieStore = await cookies();
  const hasSubscription = cookieStore.has("platform-press-subscription");

  if (hasSubscription) {
    cookieStore.delete("platform-press-subscription");
    return false;
  } else {
    cookieStore.set("platform-press-subscription", "true", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
    return true;
  }
}

export async function isSubscribed(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has("platform-press-subscription");
}
