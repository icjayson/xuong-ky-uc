"use client";

import LockIcon from "@/components/icons/lock";
import Header from "@/components/pages/main/header";
import Footer from "@/components/pages/unauth/footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import LoveIcon from "@/components/ui/love-icon";
import LoveItem from "@/components/ui/love-item";
import { Data, MainPageContext, Memories } from "@/contexts/contexts";
import { cn } from "@/lib/utils";
import { formatDurationFrom } from "@/utils/date";
import { useReminder } from "@/utils/use-reminder";
import { useGetCookie } from "cookies-next";
import { redirect, useParams, usePathname } from "next/navigation";
import React from "react";

export default function RootLayout({
  children,
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
  const isNotSharing = !isBelongsToUser && !data?.is_sharing;
  const { dismiss, show, setShow, milestone } = useReminder();

  const fromDate = new Date(
    data?.start_date_of_love || new Date().toISOString()
  ).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const { years, months, days } = formatDurationFrom(fromDate);

  const checkDomain = async () => {
    const res = await fetch(`/api/couple-page/check-domain?domain=${domain}`);
    const { error } = await res.json();
    if (error) {
      setIsBelongsToUser(false);
      return false;
    }

    return true;
  };

  const fetchDomain = async () => {
    const res = await fetch(`/api/couple-page/domain?domain=${domain}`);
    const { data, memories } = await res.json();
    if (data) {
      setData(data);
    }

    if (memories) {
      setMemories(memories);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await checkDomain();
      await fetchDomain();

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, [domain]);

  React.useEffect(() => {
    if (!getCookie || isLoading) return;

    const accessToken = getCookie("token");
    const refreshToken = getCookie("refresh_token");

    if ((!accessToken || !refreshToken) && isAdminPage) {
      redirect("/login");
    }
  }, [getCookie, isLoading, isAdminPage]);

  const handleClickDismiss = () => {
    dismiss();
    setShow(false);
    document.getElementById("diary-section-title")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <MainPageContext.Provider
      value={{
        data,
        memories,
        isLoading,
        color,
        colorKey,
        isBelongsToUser,
        isNotSharing,
      }}
    >
      <div className="bg-background flex flex-col min-h-screen">
        <Header
          isMainPage
          hideShareButtonAndMenu={!isBelongsToUser}
          forceDefaultColor={
            isNotSharing || (!isBelongsToUser && !data?.is_sharing)
          }
        />
        <div
          className="flex-1 overflow-x-hidden bg-memory-frame-background"
          style={{
            backgroundColor:
              isNotSharing || (!isBelongsToUser && !data?.is_sharing)
                ? undefined
                : colorKey !== "custom"
                ? color?.primary
                : color?.secondary1 || undefined,
          }}
        >
          {children}
        </div>
        <Footer
          forceDefaultColor={
            isNotSharing || (!isBelongsToUser && !data?.is_sharing)
          }
        />

        <Dialog open={show}>
          <DialogTitle />
          <DialogContent
            className="w-full !max-w-[759px]"
            style={{
              backgroundColor: color?.secondary1 || "rgba(238, 234, 223, 1)",
            }}
            onInteractOutside={() => {
              setShow(false);
            }}
          >
            <div>
              <div
                className="flex justify-center font-medium text-2xl mb-11"
                style={{
                  color: color?.secondary4 || "rgba(0, 0, 0, 0.8)",
                }}
              >
                Bạn biết sắp đến ngày gì chưa?
              </div>
              <div
                className="flex justify-center font-medium text-2xl mb-3"
                style={{
                  color: color?.secondary4 || "rgba(0, 0, 0, 0.8)",
                }}
              >
                💖 KỶ NIỆM{" "}
                {`${years ? `${years} NĂM` : ""} ${
                  months ? `${months} THÁNG` : ""
                } ${days && (!years || !months) ? `${days} NGÀY` : ""}`}{" "}
                BÊN NHAU! 💖
              </div>
              <div
                className="flex justify-center text-[18px] mb-8"
                style={{
                  color: color?.secondary4 || "rgba(0, 0, 0, 0.8)",
                }}
              >
                Vào ngày {milestone}
              </div>
              <div
                className="flex justify-center text-justify mb-8"
                style={{
                  color: color?.secondary4 || "rgba(0, 0, 0, 0.8)",
                }}
              >
                Chúc mừng hai bạn đã cùng nhau đi qua một hành trình thật đẹp!
                🎉
              </div>
              <div className="mb-8 grid grid-cols-[1fr_auto_1fr] gap-5 place-items-center">
                <LoveItem url={(data?.avatar_1_url as string) ?? ""} />

                <LoveIcon type={data?.clock_type || 1} isReminder />

                <LoveItem url={(data?.avatar_2_url as string) ?? ""} />
              </div>
              <div
                className="flex justify-center text-justify mb-13"
                style={{
                  color: color?.secondary4 || "rgba(0, 0, 0, 0.8)",
                }}
              >
                Hãy lưu giữ kỷ niệm tuyệt vời này bằng những lời ngọt ngào nhất
                và sẵn sàng đón nhận những điều tuyệt vời phía trước nhé! 💖
              </div>
              <div
                className={cn("flex justify-between gap-2", "max-sm:flex-col")}
              >
                <Button
                  className="max-sm:w-full"
                  onClick={handleClickDismiss}
                  style={{
                    backgroundColor: color?.primary,
                    color: color?.secondary3,
                  }}
                >
                  Xem lại hành trình yêu nhau
                </Button>
                <div className="relative">
                  <Button
                    className="max-sm:w-full "
                    disabled
                    style={{
                      backgroundColor: color?.primary,
                      color: color?.secondary3,
                    }}
                  >
                    Gửi lời yêu thương
                  </Button>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[8px] text-white flex gap-1 items-center">
                    <LockIcon size={8} />
                    Sắp ra mắt
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainPageContext.Provider>
  );
}
