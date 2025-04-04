import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ClockFormProps = {
  title: string;
  onTitleChange: (title: string) => void;
  startDate: Date;
  onStartDateChange: (startDate: Date) => void;
};

const ClockForm = ({
  title,
  onTitleChange,
  startDate,
  onStartDateChange
}: ClockFormProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-6">
        <div>Tiêu đề: </div>
        <Input
          type="text"
          variant="secondary"
          placeholder="Đã bên nhau"
          className={cn(
            "w-full px-2 text-black placeholder:text-black text-base",
            "max-sm:text-xs"
          )}
          rootClassName="flex-1"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          limit={50}
        />
      </div>

      <div className="flex items-center gap-6">
        <div>Ngày bắt đầu yêu: </div>
        <DatePicker
          className={cn("h-6 flex-1 text-base", "max-sm:text-xs")}
          value={startDate}
          onChange={(date) => onStartDateChange(date)}
        />
      </div>
    </div>
  );
};

export default ClockForm;
