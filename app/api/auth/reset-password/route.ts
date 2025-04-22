import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import supabase from "@/utils/supabase";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json(
      { error: "Yêu cầu không hợp lệ" },
      { status: 400 }
    );
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("id, reset_token, reset_token_expiry")
    .eq("reset_token", token)
    .single();

  if (!user || error) {
    return NextResponse.json(
      { error: "Mã khôi phục không hợp lệ hoặc đã hết hạn" },
      { status: 400 }
    );
  }

  const now = new Date();
  if (new Date(user.reset_token_expiry) < now) {
    return NextResponse.json(
      { error: "Mã khôi phục đã hết hạn" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { error: updateError } = await supabase
    .from("users")
    .update({
      password_hash: hashedPassword,
      reset_token: null,
      reset_token_expiry: null
    })
    .eq("id", user.id);

  if (updateError) {
    return NextResponse.json(
      { error: "Không thể khôi phục mật khẩu" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Mật khẩu đã được khôi phục" });
}
