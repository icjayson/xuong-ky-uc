import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", { maxAge: 0 });
  cookieStore.set("refresh_token", "", { maxAge: 0 });
  cookieStore.set("domain", "", { maxAge: 0 });
  cookieStore.set("pageId", "", { maxAge: 0 });
  return new Response("Logged out");
}
