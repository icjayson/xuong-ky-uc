import React from "react";

export const useDeviceSize = () => {
  const [deviceType, setDeviceType] = React.useState<
    "xl" | "lg" | "md" | "sm" | "xs" | "xxs"
  >("xl");

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setDeviceType(
        width > 1200
          ? "xl"
          : width < 1200 && width > 992
          ? "lg"
          : width < 992 && width > 768
          ? "md"
          : width < 768 && width > 576
          ? "sm"
          : width < 576 && width > 480
          ? "xs"
          : "xxs"
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};
