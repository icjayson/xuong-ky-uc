import { signAccessToken, signRefreshToken } from "@/utils/jwt";
import supabase from "@/utils/supabase";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, invitationCode } = await req.json();

  if (!invitationCode || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { data: codeEntry } = await supabase
    .from("invitation_codes")
    .select("*")
    .eq("code", invitationCode)
    .eq("is_used", false)
    .single();

  if (!codeEntry) {
    return NextResponse.json(
      { error: "Invalid or used invitation code" },
      { status: 400 }
    );
  }

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Mật khẩu phải có ít nhất 6 ký tự." },
      { status: 400 }
    );
  }

  if (existing) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 400 }
    );
  }

  const password_hash = await bcrypt.hash(password, 10);

  const { data: user, error: insertError } = await supabase
    .from("users")
    .insert({ email, password_hash, code: invitationCode, domain: email })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  const { data: page, error: pageError } = await supabase
    .from("couple_pages")
    .insert({ user_id: user.id, is_sharing: true })
    .select()
    .single();

  if (pageError) {
    return NextResponse.json({ error: pageError.message }, { status: 500 });
  }

  const accessToken = signAccessToken({
    userId: user.id
  });
  const refreshToken = signRefreshToken({
    userId: user.id
  });

  const cookieStore = await cookies();
  const cookieOptions = {
    secure: process.env.NODE_ENV === "production",
    path: "/"
  };

  cookieStore.set("token", accessToken, { ...cookieOptions });
  cookieStore.set("refresh_token", refreshToken, {
    ...cookieOptions
  });
  cookieStore.set("domain", email);
  cookieStore.set("pageId", page.id);
  await supabase
    .from("invitation_codes")
    .update({ is_used: true })
    .eq("code", invitationCode);

  return NextResponse.json({
    token: accessToken,
    user: { id: user.id, email: user.email, domain: user.email }
  });
}
