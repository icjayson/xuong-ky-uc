import { cookies } from "next/headers";
import { verifyRefreshToken, signAccessToken } from "@/utils/jwt";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken)
    return new Response("Missing refresh token", { status: 401 });

  try {
    const payload = verifyRefreshToken(refreshToken) as { userId: string };

    const newAccessToken = signAccessToken({ userId: payload.userId });

    cookieStore.set("token", newAccessToken, {
      secure: process.env.NODE_ENV === "production",
      path: "/"
    });

    return new Response("Token refreshed");
  } catch {
    return new Response("Invalid refresh token", { status: 401 });
  }
}
