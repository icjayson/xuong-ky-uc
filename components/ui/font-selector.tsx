import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./select";

const options = [
  { label: "Mark Pro", value: "Mark Pro" },
  { label: "Appleberry", value: "Appleberry" }
];

type FontSelectorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const FontSelector = ({ value, onChange }: FontSelectorProps) => {
  return (
    <div className={cn("grid grid-cols-[100px_auto] gap-4")}>
      <div className={cn("text-black-80 text-base", "max-sm:text-xs")}>
        Font:
      </div>
      <div>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn font" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FontSelector;
