import Footer from "@/components/pages/unauth/footer";
import Header from "@/components/pages/unauth/header";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Nhật ký tình yêu - Xưởng Ký Ức",
  description: "Nhật ký tình yêu - Xưởng Ký Ức"
};

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const domain = cookieStore.get("domain")?.value;

  if (accessToken && refreshToken) {
    redirect(`/${domain}/edit`);
  }

  return (
    <div className="bg-background flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
