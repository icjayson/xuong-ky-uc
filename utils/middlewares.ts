import { cookies } from "next/headers";
import { verifyAccessToken } from "./jwt";
import supabase from "./supabase";

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const payload = verifyAccessToken(token);
    if (
      typeof payload === "object" &&
      payload !== null &&
      "userId" in payload
    ) {
      const user = await supabase
        .from("users")
        .select("id")
        .eq("id", payload.userId)
        .single();

      return user.data?.id;
    }
    return null;
  } catch {
    return null;
  }
}
