"use client";

import { cn } from "@/lib/utils";
import React from "react";
import ClockSection from "./clock-section";
import DiarySection from "./diary-section";
import LoveSection from "./love-section";
import Loading from "@/components/ui/loading";
import FourOFourPage from "../unauth/404";
import NotSharing from "../unauth/not-sharing";
import { MainPageContext } from "@/contexts/contexts";

type MainPageProps = {
  isEditMode?: boolean;
};

const MainPage = ({ isEditMode = false }: MainPageProps) => {
  const { isLoading, isBelongsToUser, isNotSharing } =
    React.useContext(MainPageContext);

  if (isLoading) return <Loading />;

  if (isEditMode && !isBelongsToUser) return <FourOFourPage />;

  if (isNotSharing) return <NotSharing />;

  return (
    <div
      className={cn(
        "py-24 flex flex-col gap-[200px] max-w-[1440px] mx-auto",
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
