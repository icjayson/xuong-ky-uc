import { cn } from "@/lib/utils";

type LoadingProps = {
  className?: string;
};

const Loading = ({ className }: LoadingProps) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center h-screen w-full",
        className
      )}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
