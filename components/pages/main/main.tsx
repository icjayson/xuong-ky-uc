import { cn } from "@/lib/utils";
import ClockSection from "./clock-section";
import LoveSection from "./love-section";
import DiarySection from "./diary-section";

type MainPageProps = {
  isEditMode?: boolean;
};

const MainPage = ({ isEditMode = false }: MainPageProps) => {
  return (
    <div
      className={cn(
        "py-24 flex flex-col gap-10 max-w-[1440px] mx-auto",
        "max-sm:py-12 max-sm:gap-10",
        "max-lg:py-16"
      )}
    >
      <ClockSection />

      <LoveSection />

      <DiarySection isEditMode={isEditMode} />
    </div>
  );
};

export default MainPage;
