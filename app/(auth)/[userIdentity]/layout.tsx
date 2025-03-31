"use client";

import React from "react";
import Header from "@/components/pages/main/header";
import Footer from "@/components/pages/unauth/footer";
import { ColorSchemeColors } from "@/components/ui/color-selector";
import { redirect, useParams } from "next/navigation";
import { useGetCookie } from "cookies-next";

export type Data = {
  title: string | null;
  avatar_1_url: string | null;
  avatar_2_url: string | null;
  clock_type: number | null;
  color_scheme: {
    [key: string]: ColorSchemeColors;
  } | null;
  created_at: string;
  font: string | null;
  id: string;
  is_sharing: boolean;
  user_id: string;
  person1_name: string | null;
  person1_nickname: string | null;
  person1_dob: string | null;
  person1_description: string | null;
  person1_zodiac: string | null;
  person2_name: string | null;
  person2_nickname: string | null;
  person2_dob: string | null;
  person2_description: string | null;
  person2_zodiac: string | null;
  start_date_of_love: string | null;
};

export type Memories = {
  id: number;
  image_url: string;
  location: string;
  memory_date: string;
  description: string;
};

type MainPageContextType = {
  data: Data;
  memories: Memories[];
  isLoading: boolean;
  isBelongsToUser: boolean;
  color: ColorSchemeColors;
};

export const MainPageContext = React.createContext<MainPageContextType>({
  data: {} as Data,
  memories: [] as Memories[],
  isLoading: false,
  isBelongsToUser: true,
  color: {} as ColorSchemeColors
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userIdentity: domain } = useParams();
  const getCookie = useGetCookie();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isBelongsToUser, setIsBelongsToUser] = React.useState(true);
  const [data, setData] = React.useState<Data>({} as Data);
  const [memories, setMemories] = React.useState<Memories[]>([]);
  const colorScheme = data.color_scheme;
  const color = Object.values(colorScheme || {})[0];

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

    if (!accessToken || !refreshToken) {
      redirect("/login");
    }
  }, [getCookie, isLoading]);

  return (
    <MainPageContext.Provider
      value={{ data, memories, isLoading, isBelongsToUser, color }}
    >
      <div className="bg-background flex flex-col min-h-screen">
        <Header isMainPage />
        <div
          className="flex-1 overflow-x-hidden"
          style={{ backgroundColor: color?.primary || undefined }}
        >
          {children}
        </div>
        <Footer />
      </div>
    </MainPageContext.Provider>
  );
}
