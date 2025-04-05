import MessengerWidget from "@/components/pages/admin/messenger-widget";
import Sidebar from "@/components/pages/admin/sidebar";
import Header from "@/components/pages/main/header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

  if (!accessToken || !refreshToken) {
    redirect("/login");
  }

  return (
    <div className={cn("bg-background flex min-h-screen", "max-lg:flex-col")}>
      <Sidebar className="max-lg:hidden" />
      <Header forceEditMode className="hidden max-lg:flex" />

      <div className="flex-1">{children}</div>
      <MessengerWidget />
    </div>
  );
}
