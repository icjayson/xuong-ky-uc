import { cn } from "@/lib/utils";
import MemoryItem from "./memory-item";

type Memory = {
  id: number;
  memory_id: string;
  location: string;
  memory_date: Date;
  image_url: string;
  description: string;
  is_visible: boolean;
};

type MemoriesListProps = {
  memories: Memory[];
};

const MemoriesList = ({ memories = [] }: MemoriesListProps) => {
  return (
    <div className={cn("flex flex-col gap-4")}>
      {memories.length > 0 ? (
        memories.map((memory) => <MemoryItem key={memory.id} {...memory} />)
      ) : (
        <div className={cn("text-center text-base text-black-80 font-bold")}>
          Bạn chưa có kỷ niệm nào
        </div>
      )}
    </div>
  );
};

export default MemoriesList;
