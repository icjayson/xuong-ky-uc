import { signAccessToken, signRefreshToken } from "@/utils/jwt";
import supabase from "@/utils/supabase";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, password_hash, domain")
    .eq("email", email)
    .single();

  if (error || !user) {
    return NextResponse.json(
      { error: "Email không tồn tại." },
      { status: 401 }
    );
  }

  const { data: page, error: pageError } = await supabase
    .from("couple_pages")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (pageError || !page) {
    return NextResponse.json(
      { error: "Không tìm thấy trang của bạn." },
      { status: 401 }
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
    return NextResponse.json({ error: "Sai mật khẩu." }, { status: 401 });
  }

  const accessToken = signAccessToken({ userId: user.id });
  const refreshToken = signRefreshToken({ userId: user.id });

  const cookieOptions = {
    secure: process.env.NODE_ENV === "production",
    path: "/"
  };

  const cookieStore = await cookies();
  cookieStore.set("token", accessToken, { ...cookieOptions });
  cookieStore.set("refresh_token", refreshToken, {
    ...cookieOptions
  });
  cookieStore.set("domain", user.domain);
  cookieStore.set("pageId", page.id);

  return NextResponse.json({
    email: user.email,
    id: user.id,
    domain: user.domain
  });
}
