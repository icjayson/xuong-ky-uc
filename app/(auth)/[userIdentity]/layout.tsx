"use client";

import Header from "@/components/pages/main/header";
import Footer from "@/components/pages/unauth/footer";
import { Data, MainPageContext, Memories } from "@/contexts/contexts";
import { useGetCookie } from "cookies-next";
import { redirect, useParams, usePathname } from "next/navigation";
import React from "react";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userIdentity: domain } = useParams();
  const pathname = usePathname();
  const isAdminPage = pathname.split("/").pop() === "edit";
  const getCookie = useGetCookie();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isBelongsToUser, setIsBelongsToUser] = React.useState(true);
  const [data, setData] = React.useState<Data>({} as Data);
  const [memories, setMemories] = React.useState<Memories[]>([]);
  const colorScheme = data.color_scheme;
  const color = Object.values(colorScheme || {})[0];
  const colorKey = Object.keys(colorScheme || {})[0];
  const checkDomain = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/couple-page/check-domain?domain=${domain}`);
    const { error } = await res.json();
    if (error) {
      setIsBelongsToUser(false);
    }

    setIsLoading(false);
  };

  const fetchDomain = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/couple-page/domain?domain=${domain}`);
    const { data, memories } = await res.json();
    if (data) {
      setData(data);
    }

    if (memories) {
      setMemories(memories);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    checkDomain();
    fetchDomain();
  }, [domain]);

  React.useEffect(() => {
    if (!getCookie || isLoading) return;

    const accessToken = getCookie("token");
    const refreshToken = getCookie("refresh_token");

    if ((!accessToken || !refreshToken) && isAdminPage) {
      redirect("/login");
    }
  }, [getCookie, isLoading, isAdminPage]);

  return (
    <MainPageContext.Provider
      value={{ data, memories, isLoading, isBelongsToUser, color, colorKey }}
    >
      <div className="bg-background flex flex-col min-h-screen">
        <Header isMainPage />
        <div
          className="flex-1 overflow-x-hidden"
          style={{
            backgroundColor:
              colorKey !== "custom"
                ? color?.primary
                : color?.secondary1 || undefined
          }}
        >
          {children}
        </div>
        <Footer />
      </div>
    </MainPageContext.Provider>
  );
}
