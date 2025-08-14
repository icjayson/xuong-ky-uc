import IncomingCard from "./incoming-card";

const previewCounts = 3;

const ClockSelector = () => {
  return (
    <div className="flex items-center flex-wrap gap-2">
      {Array.from({ length: previewCounts }).map((_, index) => (
        <IncomingCard key={index} />
      ))}
    </div>
  );
};

export default ClockSelector;
