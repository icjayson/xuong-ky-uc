import MemoryFrame from "./memory-frame";

const frames = [
  {
    id: 1,
    color: "#CEA19E",
    name: "Khung mặc định",
    isIncoming: false
  },
  {
    id: 2,
    color: "/memory-frames/memory-1.png",
    name: "Khung polaroid",
    isIncoming: true
  },
  {
    id: 3,
    color: "/memory-frames/memory-2.png",
    name: "Khung kính",
    isIncoming: true
  },
  {
    id: 4,
    color: "/memory-frames/memory-3.png",
    name: "Khung tranh",
    isIncoming: true
  },
  {
    id: 5,
    color: "/memory-frames/memory-4.png",
    name: "Khung gỗ",
    isIncoming: true
  },
  {
    id: 6,
    color: "/memory-frames/memory-5.png",
    name: "Khung vàng",
    isIncoming: true
  }
];

const MemoryFrameSelector = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(132px,_1fr))] gap-x-2 gap-y-3 place-items-center">
        {frames.map((frame) => (
          <MemoryFrame
            key={frame.id}
            frame={frame.color}
            name={frame.name}
            isIncoming={frame.isIncoming}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryFrameSelector;
