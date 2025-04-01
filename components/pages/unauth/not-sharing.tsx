import NotSharingSteps from "@/components/ui/not-sharing-steps";
import { cn } from "@/lib/utils";

const NotSharing = () => {
  const steps = [
    {
      step: 1,
      description: "Liên hệ chủ sở hữu nhật ký để được mở quyền xem!"
    },
    {
      step: 2,
      description: "Tự tạo nhật ký tình yêu của riêng mình!",
      link: `https://m.me/${process.env.NEXT_PUBLIC_MESSENGER_URL}`,
      buttonText: "Liên hệ shop ngay",
      externalLink: true
    },
    {
      step: 3,
      description: "Đăng nhập lại để mở quyền xem nhật ký tình yêu!",
      link: "/login",
      buttonText: "Đăng nhập"
    }
  ];

  return (
    <div className={cn("py-8 px-6 flex flex-col items-center", "max-sm:py-6")}>
      <div
        className={cn(
          "text-[28px] font-medium text-black-80 mb-10 text-center",
          "max-sm:text-xs max-sm:mb-5"
        )}
      >
        Oops! Rất tiếc bạn chưa thể xem được nhật ký tình yêu này do chủ sở hữu
        đang khóa lại
      </div>
      <div
        className={cn(
          "text-black-80 text-2xl font-medium mb-6 text-center",
          "max-sm:text-[10px] max-sm:mb-3"
        )}
      >
        Hãy thử các cách sau nhé
      </div>

      <div className={cn("flex flex-col gap-8", "max-sm:gap-4")}>
        {steps.map((step) => (
          <NotSharingSteps key={step.step} {...step} />
        ))}
      </div>
    </div>
  );
};

export default NotSharing;
