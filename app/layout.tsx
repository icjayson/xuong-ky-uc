import { verifyAccessToken, verifyRefreshToken } from "@/utils/jwt";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Nhật ký tình yêu - Xưởng Ký Ức",
  description: "Nhật ký tình yêu - Xưởng Ký Ức"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (accessToken && refreshToken) {
    try {
      verifyAccessToken(accessToken || "");
    } catch {
      try {
        if (refreshToken) {
          verifyRefreshToken(refreshToken || "");
        }
      } catch {
        cookieStore.delete("token");
        cookieStore.delete("refresh_token");
      }
    }
  }

  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
