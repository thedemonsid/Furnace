"use server";

import { auth } from "@/auth";
import { headers } from "next/headers";
/**
 * Verifies if a user is authenticated and returns the session
 * @returns User session if authenticated, null otherwise
 */
export const getUserSession = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return null;
    }

    return session;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
};
