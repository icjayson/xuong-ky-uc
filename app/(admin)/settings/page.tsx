"use client";

import { Data } from "@/app/(auth)/[userIdentity]/layout";
import ClockForm from "@/components/pages/admin/clock-form/clock-form";
import InformationForm from "@/components/pages/admin/information-form/information-form";
import Preview from "@/components/pages/admin/preview";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import ClockSelector from "@/components/ui/clock-selector";
import ColorSelector, {
  ColorSchemeColors
} from "@/components/ui/color-selector";
import FontSelector from "@/components/ui/font-selector";
import FrameSelector from "@/components/ui/frame-selector";
import Loading from "@/components/ui/loading";
import { cn } from "@/lib/utils";
import React from "react";

type Person = {
  name: string;
  nickname: string;
  dob: Date;
  zodiac: string;
  description: string;
  avatar: File | string;
};

type SettingContextType = {
  person1: Person;
  setPerson1: (person: Person) => void;
  person2: Person;
  setPerson2: (person: Person) => void;
};

export const settingContext = React.createContext<SettingContextType>({
  person1: {
    name: "",
    nickname: "",
    dob: new Date(),
    zodiac: "",
    description: "",
    avatar: ""
  },
  person2: {
    name: "",
    nickname: "",
    dob: new Date(),
    zodiac: "",
    description: "",
    avatar: ""
  },
  setPerson1: () => {},
  setPerson2: () => {}
});

const SettingsPage = () => {
  const [selectedColorScheme, setSelectedColorScheme] = React.useState<
    Record<string, ColorSchemeColors>
  >({});
  const [selectedFont, setSelectedFont] = React.useState<string>("Mark Pro");
  const [selectedClock, setSelectedClock] = React.useState<number>(1);
  const [title, setTitle] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [person1, setPerson1] = React.useState<Person>({
    name: "",
    nickname: "",
    dob: new Date(),
    zodiac: "",
    description: "",
    avatar: ""
  });
  const [person2, setPerson2] = React.useState<Person>({
    name: "",
    nickname: "",
    dob: new Date(),
    zodiac: "",
    description: "",
    avatar: ""
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [previewData, setPreviewData] = React.useState<Data | undefined>();

  const handleColorChange = (id: string, colors: ColorSchemeColors) => {
    setSelectedColorScheme({ [id]: colors });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      let payloadAva1 = undefined;
      let payloadAva2 = undefined;

      if (typeof person1.avatar !== "string") {
        const formData1 = new FormData();
        formData1.append("file", person1.avatar);
        formData1.append("avatarNumber", "1");
        payloadAva1 = await fetch("/api/couple-page/upload-avatar", {
          method: "POST",
          body: formData1
        }).then((r) => r.json().then((r) => r.url));
      }

      if (typeof person2.avatar !== "string") {
        const formData2 = new FormData();
        formData2.append("file", person2.avatar);
        formData2.append("avatarNumber", "2");
        payloadAva2 = await fetch("/api/couple-page/upload-avatar", {
          method: "POST",
          body: formData2
        }).then((r) => r.json().then((r) => r.url));
      }

      await fetch("/api/couple-page/setting", {
        method: "POST",
        body: JSON.stringify({
          person1_name: person1.name,
          person1_nickname: person1.nickname,
          person1_dob: person1.dob,
          person1_zodiac: person1.zodiac,
          person1_description: person1.description,
          avatar_1_url: payloadAva1,
          person2_name: person2.name,
          person2_nickname: person2.nickname,
          person2_dob: person2.dob,
          person2_zodiac: person2.zodiac,
          person2_description: person2.description,
          avatar_2_url: payloadAva2,
          start_date_of_love: startDate,
          title,
          font: selectedFont,
          color_scheme: JSON.stringify(selectedColorScheme),
          clock_type: selectedClock
        })
      });

      refetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/couple-page/setting");
      const { data } = await res.json();
      setPerson1({
        name: data.person1_name || "",
        nickname: data.person1_nickname || "",
        dob: data.person1_dob || new Date(),
        zodiac: data.person1_zodiac || "",
        description: data.person1_description || "",
        avatar: data.avatar_1_url || ""
      });
      setPerson2({
        name: data.person2_name || "",
        nickname: data.person2_nickname || "",
        dob: data.person2_dob || new Date(),
        zodiac: data.person2_zodiac || "",
        description: data.person2_description || "",
        avatar: data.avatar_2_url || ""
      });
      setStartDate(data.start_date_of_love || new Date());
      setTitle(data.title || "");
      setSelectedFont(data.font || "Mark Pro");
      setSelectedColorScheme(data.color_scheme || {});
      setSelectedClock(data.clock_type || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchData = () => {
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if (
      !person1.name ||
      !person1.nickname ||
      !person1.dob ||
      !person1.zodiac ||
      !person1.description ||
      !person1.avatar ||
      !person2.name ||
      !person2.nickname ||
      !person2.dob ||
      !person2.zodiac ||
      !person2.description ||
      !person2.avatar ||
      !startDate ||
      !selectedClock ||
      !selectedColorScheme ||
      !selectedFont ||
      !title
    )
      return;

    setPreviewData({
      person1_name: person1.name,
      person1_nickname: person1.nickname,
      person1_dob:
        typeof person1.dob === "string"
          ? person1.dob
          : person1.dob.toISOString(),
      person1_zodiac: person1.zodiac,
      person1_description: person1.description,
      avatar_1_url: person1.avatar as string,
      person2_name: person2.name,
      person2_nickname: person2.nickname,
      person2_dob:
        typeof person2.dob === "string"
          ? person2.dob
          : person2.dob.toISOString(),
      person2_zodiac: person2.zodiac,
      person2_description: person2.description,
      avatar_2_url: person2.avatar as string,
      start_date_of_love: startDate as unknown as string,
      clock_type: selectedClock,
      color_scheme: selectedColorScheme,
      font: selectedFont,
      created_at: new Date().toISOString(),
      is_sharing: false,
      id: "",
      user_id: "",
      title
    });
  }, [
    person1,
    person2,
    startDate,
    selectedClock,
    selectedColorScheme,
    selectedFont,
    title
  ]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <settingContext.Provider
      value={{
        person1,
        setPerson1,
        person2,
        setPerson2
      }}
    >
      <div className={cn("w-full h-full flex")}>
        <div
          className={cn(
            "w-1/2 h-full border-r border-black-20 pt-[100px] px-20 flex flex-col gap-10 pb-20",
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
              Chọn chủ đề
            </div>

            <div
              className={cn(
                "text-black-80 text-xl font-medium mb-3",
                "max-sm:text-xs"
              )}
            >
              Chọn bộ màu có sẵn
            </div>

            <ColorSelector
              value={Object.keys(selectedColorScheme || {})[0]}
              colors={Object.values(selectedColorScheme || {})[0]}
              onChange={handleColorChange}
            />

            <div className="h-[1px] bg-primary my-4"></div>

            <div
              className={cn(
                "text-black-80 text-xl font-medium mb-3",
                "max-sm:text-xs"
              )}
            >
              Chọn font
            </div>

            <FontSelector value={selectedFont} onChange={setSelectedFont} />
          </Card>

          <Card infoCard className="">
            <div
              className={cn(
                "text-black-80 text-2xl font-bold mb-6",
                "max-sm:text-base"
              )}
            >
              Đồng hồ
            </div>

            <div
              className={cn(
                "text-black-80 text-xl font-medium mb-3",
                "max-sm:text-xs"
              )}
            >
              Chọn mẫu:
            </div>

            <div className="mb-3">
              <ClockSelector
                value={selectedClock}
                onSelect={setSelectedClock}
              />
            </div>

            <ClockForm
              title={title}
              onTitleChange={setTitle}
              startDate={startDate}
              onStartDateChange={setStartDate}
            />
          </Card>

          <Card infoCard className="">
            <div
              className={cn(
                "text-black-80 text-2xl font-bold mb-6",
                "max-sm:text-base"
              )}
            >
              Ảnh đại diện
            </div>

            <div
              className={cn(
                "text-black-80 text-xl font-medium mb-3",
                "max-sm:text-xs"
              )}
            >
              Chọn mẫu khung:
            </div>

            <div className="mb-3">
              <FrameSelector />
            </div>

            <InformationForm />
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              className={cn(
                "hidden h-10 px-4 text-base",
                "max-sm:h-8 max-sm:px-2 max-sm:text-xs",
                "max-xl:block"
              )}
            >
              Xem trước
            </Button>

            <Button
              className={cn(
                "h-10 px-4 text-base",
                "max-sm:h-8 max-sm:px-2 max-sm:text-xs"
              )}
              onClick={handleSave}
            >
              Lưu
            </Button>
          </div>
        </div>

        <div className={cn("w-1/2 max-xl:hidden")}>
          <Preview previewData={previewData} />
        </div>
      </div>
    </settingContext.Provider>
  );
};

export default SettingsPage;
