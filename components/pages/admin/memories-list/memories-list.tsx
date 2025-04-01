import React from "react";
import MemoryItem from "./memory-item";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import MemoryFormItem from "./memory-form-item";
import { useGetCookie } from "cookies-next";
import { MemoryContext } from "@/contexts/contexts";

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
  const [isCreating, setIsCreating] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const [date, setDate] = React.useState<Date>(new Date());
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState<File | string>("");
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const getCookie = useGetCookie();
  const { refetchMemories, setIsLoading } = React.useContext(MemoryContext);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const page_id = getCookie("pageId");
      const response = await fetch("/api/couple-page/memory", {
        method: "POST",
        body: JSON.stringify({ page_id })
      });

      const data = await response.json();

      const formData = new FormData();
      formData.append("file", image);
      formData.append("memory_id", data.memory_id);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("is_visible", "true");
      formData.append("memory_date", date.toISOString());

      await fetch("/api/couple-page/upload-memory", {
        method: "POST",
        body: formData
      });

      refetchMemories();
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewImage(objectUrl);
    } else {
      setPreviewImage(image || "");
    }
  }, [image]);

  return (
    <div className={cn("flex flex-col gap-4")}>
      {memories.length > 0 ? (
        memories.map((memory) => <MemoryItem key={memory.id} {...memory} />)
      ) : (
        <div className={cn("text-center text-base text-black-80 font-bold")}>
          Bạn chưa có kỷ niệm nào
        </div>
      )}

      {isCreating ? (
        <MemoryFormItem
          location={location}
          date={date}
          description={description}
          image={previewImage as string}
          onImageChange={(value) => setImage(value)}
          onLocationChange={(value) => setLocation(value)}
          onDateChange={(value) => setDate(value)}
          onDescriptionChange={(value) => setDescription(value)}
          onSave={handleSave}
          onCancel={() => setIsCreating(false)}
        />
      ) : (
        <Button
          className={cn(
            "h-10 px-4 text-base",
            "max-sm:h-8 max-sm:px-2 max-sm:text-xs"
          )}
          onClick={() => setIsCreating(true)}
        >
          Thêm kỷ niệm
        </Button>
      )}
    </div>
  );
};

export default MemoriesList;
