"use client";

import ClockForm from "@/components/pages/admin/clock-form/clock-form";
import InformationForm from "@/components/pages/admin/information-form/information-form";
import Preview from "@/components/pages/admin/preview";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import ClockSelector from "@/components/ui/clock-selector";
import ColorSelector, {
  ColorSchemeColors,
} from "@/components/ui/color-selector";
import FontSelector from "@/components/ui/font-selector";
import FrameSelector from "@/components/ui/frame-selector";
import Loading from "@/components/ui/loading";
import { Person, SettingContext, Data } from "@/contexts/contexts";
import { cn } from "@/lib/utils";
import React from "react";

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
    avatar: "",
  });
  const [person2, setPerson2] = React.useState<Person>({
    name: "",
    nickname: "",
    dob: new Date(),
    zodiac: "",
    description: "",
    avatar: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [previewData, setPreviewData] = React.useState<Data>({} as Data);
  const [isPreviewDesktop, setIsPreviewDesktop] = React.useState(false);

  const handleColorChange = (id: string, colors: ColorSchemeColors) => {
    setSelectedColorScheme({ [id]: colors });
    setPreviewData({
      ...previewData,
      color_scheme: { [id]: colors },
    });
  };

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
    setPreviewData({
      ...previewData,
      font,
    });
  };

  const handleClockChange = (clock: number) => {
    setSelectedClock(clock);
    setPreviewData({
      ...previewData,
      clock_type: clock,
    });
  };

  const handleTitleChange = (title: string) => {
    setTitle(title);
    setPreviewData({
      ...previewData,
      title,
    });
  };

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    setPreviewData({
      ...previewData,
      start_date_of_love: new Date(date).toLocaleDateString(),
    });
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
          body: formData1,
        }).then((r) => r.json().then((r) => r.url));
      }

      if (typeof person2.avatar !== "string") {
        const formData2 = new FormData();
        formData2.append("file", person2.avatar);
        formData2.append("avatarNumber", "2");
        payloadAva2 = await fetch("/api/couple-page/upload-avatar", {
          method: "POST",
          body: formData2,
        }).then((r) => r.json().then((r) => r.url));
      }

      await fetch("/api/couple-page/setting", {
        method: "POST",
        body: JSON.stringify({
          person1_name: person1.name,
          person1_nickname: person1.nickname,
          person1_dob: new Date(person1.dob).toLocaleDateString(),
          person1_zodiac: person1.zodiac,
          person1_description: person1.description,
          avatar_1_url: payloadAva1,
          person2_name: person2.name,
          person2_nickname: person2.nickname,
          person2_dob: new Date(person2.dob).toLocaleDateString(),
          person2_zodiac: person2.zodiac,
          person2_description: person2.description,
          avatar_2_url: payloadAva2,
          start_date_of_love: new Date(startDate).toLocaleDateString(),
          title,
          font: selectedFont,
          color_scheme: JSON.stringify(selectedColorScheme),
          clock_type: selectedClock,
        }),
      });

      await fetch("/api/couple-page/reminder", {
        method: "POST",
        body: JSON.stringify({
          start_date: new Date(startDate).toLocaleDateString(),
          interval_months: +(process.env.NEXT_PUBLIC_INTERVAL_MONTHS || 1),
        }),
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
        avatar: data.avatar_1_url || "",
      });
      setPerson2({
        name: data.person2_name || "",
        nickname: data.person2_nickname || "",
        dob: data.person2_dob || new Date(),
        zodiac: data.person2_zodiac || "",
        description: data.person2_description || "",
        avatar: data.avatar_2_url || "",
      });
      setStartDate(data.start_date_of_love || new Date());
      setTitle(data.title || "");
      setSelectedFont(data.font || "Mark Pro");
      setSelectedColorScheme(data.color_scheme || {});
      setSelectedClock(data.clock_type || 1);
      setPreviewData(data);
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SettingContext.Provider
      value={{
        person1,
        setPerson1,
        person2,
        setPerson2,
        previewData,
        setPreviewData,
      }}
    >
      <div className={cn("w-full h-full flex")}>
        <div
          className={cn(
            "w-1/2 h-full border-r border-black-20 pt-[100px] px-20 flex flex-col gap-10 pb-20 overflow-x-hidden",
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

            <FontSelector value={selectedFont} onChange={handleFontChange} />
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
                onSelect={handleClockChange}
              />
            </div>

            <ClockForm
              title={title}
              onTitleChange={handleTitleChange}
              startDate={startDate}
              onStartDateChange={handleStartDateChange}
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
              onClick={() => setIsPreviewDesktop(true)}
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
          <Preview
            previewData={previewData}
            isPreviewDesktop={isPreviewDesktop}
            setIsPreviewDesktop={setIsPreviewDesktop}
          />
        </div>
      </div>
    </SettingContext.Provider>
  );
};

export default SettingsPage;
