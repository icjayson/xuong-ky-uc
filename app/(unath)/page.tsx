import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-calculated-content px-[100px] gap-[100px] max-xl:px-0 max-xl:gap-5">
      <div className="flex flex-col items-center py-10">
        <div className="text-[100px] font-bold !font-appleberry text-black-80 max-md:text-[50px]">
          Xưởng Ký Ức
        </div>
        <div className="text-[40px] text-black-80 max-md:text-[20px]">
          Trao tay kỷ vật - Lưu trọn kỷ niệm
        </div>
        <div className="flex gap-5 mt-10">
          <Button variant="secondary">Đặt hàng ngay</Button>
          <Button variant="secondary" anomaly="outline">
            Khám phá
          </Button>
        </div>
      </div>

      <div className="h-[400px] w-[400px] max-xl:h-[200px] max-xl:w-[200px] max-md:hidden bg-primary"></div>
    </div>
  );
}
