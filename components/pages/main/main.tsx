"use client";

import { cn } from "@/lib/utils";
import ClockSection from "./clock-section";
import DiarySection from "./diary-section";
import LoveSection from "./love-section";
import { MainPageContext } from "@/contexts/contexts";
import Loading from "@/components/ui/loading";
import NotSharing from "../unauth/not-sharing";
import FourOFourPage from "../unauth/404";
import React from "react";
type MainPageProps = {
  isEditMode?: boolean;
};

const MainPage = ({ isEditMode = false }: MainPageProps) => {
  const { isBelongsToUser, isNotSharing, isLoading } =
    React.useContext(MainPageContext);

  if (isLoading || isBelongsToUser === undefined || isNotSharing === undefined)
    return <Loading />;

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
