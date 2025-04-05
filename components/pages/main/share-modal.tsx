"use client";

import CopyIcon from "@/components/icons/copy";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useGetCookie } from "cookies-next";
import React from "react";
import { toast } from "sonner";
type ShareModalProps = {
  isSharingModalOpen: boolean;
  setIsSharingModalOpen: (isOpen: boolean) => void;
};

const ShareModal = ({
  isSharingModalOpen,
  setIsSharingModalOpen
}: ShareModalProps) => {
  const [isSharing, setIsSharing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCopying, setIsCopying] = React.useState(false);

  const getCookie = useGetCookie();

  const handleCheckedChange = async () => {
    setIsLoading(true);

    const res = await fetch("/api/couple-page/setting", {
      method: "POST",
      body: JSON.stringify({
        is_sharing: !isSharing
      })
    });
    const { error } = await res.json();

    if (!error) {
      setIsSharing(!isSharing);
    } else {
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleCopyLink = () => {
    setIsCopying(true);
    const domain = getCookie("domain");
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${domain}`
    );
    toast.success("Đã sao chép đường dẫn nhật ký");
    setTimeout(() => {
      setIsCopying(false);
    }, 200);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/couple-page/setting");
      const { data, error } = await res.json();

      if (data && !error) {
        setIsSharing(data.is_sharing);
      } else {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Dialog open={isSharingModalOpen} onOpenChange={setIsSharingModalOpen}>
      <DialogContent
        className="bg-memory-frame-background"
        isLoading={isLoading}
      >
        <DialogTitle className="text-2xl text-black-80 leading-none font-semibold">
          Chia sẻ nhật ký
        </DialogTitle>
        <DialogDescription />

        <div className="flex items-center justify-between h-7 bg-black-20 rounded-[16px] px-2 mt-5">
          <div className="text-xs text-black-80">
            Công khai nhật ký cho người xem
          </div>

          <div className="h-5">
            <Switch checked={isSharing} onCheckedChange={handleCheckedChange} />
          </div>
        </div>

        <div
          className={cn(
            "text-xs text-black-80 mt-2 text-center",
            "max-sm:text-[10px]"
          )}
        >
          Lưu ý: {""}
          {isSharing
            ? "Bất cứ ai có link đều có thể thấy nhật ký của bạn"
            : "Bạn đang khoá nhật ký, người khác sẽ không thể xem nhật ký của bạn"}
        </div>

        <div
          className={cn(
            "flex items-center justify-between mt-5 w-full",
            "max-sm:gap-2"
          )}
        >
          <Button
            anomaly="outline"
            className={cn(
              "flex items-center gap-2",
              "max-sm:text-xs",
              "hover:!bg-primary hover:text-black hover:opacity-100",
              {
                "!bg-primary !text-black !opacity-100": isCopying
              }
            )}
            onClick={() => handleCopyLink()}
          >
            <CopyIcon />
            Sao chép đường dẫn nhật ký
          </Button>

          <Button
            onClick={() => setIsSharingModalOpen(false)}
            className={cn("max-sm:text-xs")}
          >
            Xong
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
