import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import supabase from "@/utils/supabase";

export async function POST(req: Request) {
  const { email } = await req.json();

  const { data: user, error } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (!user || error) {
    return NextResponse.json(
      { error: "Không tìm thấy tài khoản với email này" },
      { status: 400 }
    );
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 1);

  await supabase
    .from("users")
    .update({
      reset_token: resetToken,
      reset_token_expiry: expiryDate.toISOString()
    })
    .eq("id", user.id);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Khôi phục mật khẩu",
    html: `<p>Click vào link dưới đây để khôi phục mật khẩu:</p>
           <a href="${resetUrl}">${resetUrl}</a>`
  });

  return NextResponse.json({ message: "Email khôi phục mật khẩu đã được gửi" });
}
