import React from "react";
import IncomingCard from "./incoming-card";

const previewCounts = 3;

const FrameSelector = () => {
  return (
    <div className="flex gap-2 flex-wrap">
      {Array.from({ length: previewCounts }).map((_, index) => (
        <IncomingCard key={index} />
      ))}
    </div>
  );
};

export default FrameSelector;
