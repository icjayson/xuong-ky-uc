import React from "react";
import LockFillIcon from "../icons/lock-fill";

const IncomingCard = () => {
  return (
    <div className="h-[74px] w-[120px] rounded-lg bg-frame-background border border-primary cursor-not-allowed flex items-center justify-center gap-2">
      <div className="text-frame-text text-[8px] font-medium">Sắp ra mắt</div>
      <LockFillIcon size={12} />
    </div>
  );
};

export default IncomingCard;
