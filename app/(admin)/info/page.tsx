"use client";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import Preview from "@/components/pages/admin/preview";
const InfoPage = () => {
  const router = useRouter();

  const [password, setPassword] = React.useState<string>("");
  const [domain, setDomain] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = React.useState<string>("");
  const [domainError, setDomainError] = React.useState<string>("");
  const [isPreviewDesktop, setIsPreviewDesktop] =
    React.useState<boolean>(false);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/couple-page/user");
      const { data } = await res.json();
      setEmail(data.email);
      setDomain(data.domain);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchUser = async () => {
    fetchUser();
  };

  const handleChangeDomain = async () => {
    try {
      setDomainError("");
      setIsLoading(true);
      const res = await fetch("/api/couple-page/setting", {
        method: "PATCH",
        body: JSON.stringify({ domain })
      });
      const { error } = await res.json();

      if (error) {
        setDomainError(error);
      } else {
        refetchUser();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setPasswordError("");
      setIsLoading(true);
      const res = await fetch("/api/couple-page/setting", {
        method: "PATCH",
        body: JSON.stringify({ password })
      });
      const { error } = await res.json();

      if (error) {
        setPasswordError(error);
      } else {
        refetchUser();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={cn("w-full h-full flex")}>
      <div
        className={cn(
          "w-1/2 h-full border-r border-black-20 pt-[100px] px-20 flex flex-col gap-10",
          "max-sm:gap-3",
          "max-xl:w-full max-xl:border-none max-xl:px-6 max-xl:pt-6"
        )}
      >
        <div
          className={cn(
            "text-[32px] text-black-80 font-medium",
            "max-sm:text-xl"
          )}
        >
          Thông tin
        </div>

        <Card infoCard className="">
          <div
            className={cn(
              "text-black-80 text-2xl font-bold mb-6",
              "max-sm:text-base"
            )}
          >
            Thông tin đăng nhập
          </div>

          <div
            className={cn(
              "grid grid-cols-[0.5fr_2fr] gap-y-5",
              "max-sm:grid-cols-[1fr_2fr]"
            )}
          >
            <div
              className={cn(
                "text-black-80 text-base font-medium flex items-center",
                "max-sm:text-xs"
              )}
            >
              Tài khoản:
            </div>
            <div className={cn("text-black-80 text-base", "max-sm:text-xs")}>
              {email}
            </div>

            <div
              className={cn(
                "text-black-80 text-base font-medium flex items-center",
                "max-sm:text-xs"
              )}
            >
              Mật khẩu:
            </div>
            <div className="text-black-80 text-xs">
              <Input
                variant="secondary"
                type="password"
                iconSize={12}
                className="max-sm:!text-xs px-2"
                iconClassName="text-info-icon"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {passwordError && (
            <div className="text-red-500 text-xs flex justify-end">
              {passwordError}
            </div>
          )}

          <div
            className={cn(
              "flex justify-end text-xs text-black-80 underline mt-2 cursor-pointer",
              "max-sm:text-xs"
            )}
            onClick={handleChangePassword}
          >
            Đổi mật khẩu
          </div>
        </Card>

        <Card infoCard>
          <div
            className={cn(
              "text-black-80 text-2xl font-bold mb-6",
              "max-sm:text-base"
            )}
          >
            Domain
          </div>

          <div
            className={cn(
              "grid grid-cols-[0.5fr_2fr] gap-y-5",
              "max-sm:grid-cols-[1fr_2fr]"
            )}
          >
            <div
              className={cn(
                "text-black-80 text-base font-medium flex items-center",
                "max-sm:text-xs"
              )}
            >
              Domain của bạn:
            </div>
            <div
              className={cn(
                "text-black-80 text-base flex items-center w-full",
                "max-sm:text-xs"
              )}
            >
              xuongkyuc.com/
              <Input
                variant="secondary"
                type="text"
                iconSize={12}
                className="max-sm:!text-xs px-2"
                rootClassName="w-full"
                iconClassName="text-info-icon"
                placeholder="Mật khẩu"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
          </div>

          {domainError && (
            <div className="text-red-500 text-xs flex justify-end">
              {domainError}
            </div>
          )}

          <div
            className={cn(
              "flex justify-end text-xs text-black-80 underline mt-2 cursor-pointer",
              "max-sm:text-xs"
            )}
            onClick={handleChangeDomain}
          >
            Đổi domain
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            className={cn(
              "hidden h-10 px-4 text-base",
              "max-sm:h-8 max-sm:px-2 max-sm:text-xs",
              "max-xl:block"
            )}
            onClick={() => setIsPreviewDesktop(true)}
          >
            Xem trước
          </Button>
        </div>
      </div>

      <div className={cn("w-1/2 max-xl:hidden")}>
        <Preview
          isPreviewDesktop={isPreviewDesktop}
          setIsPreviewDesktop={setIsPreviewDesktop}
        />
      </div>
    </div>
  );
};

export default InfoPage;
