"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-calculated-content px-[100px] gap-[100px] max-xl:px-0 max-xl:gap-5 max-lg:flex-col-reverse py-10">
        <div className="flex flex-col items-center">
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

        <div className="h-[400px] w-[400px] max-xl:h-[200px] max-xl:w-[200px]">
          <Image
            src="/home-page-logo.png"
            alt="clock"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* What's in Xưởng Ký Ức Section */}
      <section className="w-full px-0 py-8">
        <h2
          className="text-[72px] text-center mb-12 font-bold !font-appleberry max-md:text-[36px]"
          style={{ color: "#CEA19E" }}
        >
          Xưởng Ký Ức có gì?
        </h2>

        {/* NFC Card Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{
            amount: 0,
            margin: "-100px",
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0,
          }}
          className="bg-gradient-to-r from-[#CEA19E] via-[#FFFFFF] to-[#FFFFFF] rounded-tr-[20px] rounded-br-[20px] p-6 mb-8 ml-0 mr-50 max-md:mr-15 max-lg:ml-0 max-lg:bg-gradient-to-b max-lg:from-[#CEA19E] max-lg:to-[#FFFFFF] max-lg:mr-50 max-xl:mr-30"
        >
          <div className="flex gap-8 max-lg:flex-col items-center">
            <div className="w-[400px] h-[300px] max-lg:w-full max-lg:h-[200px] rounded-[10px] overflow-hidden flex items-center justify-center">
              <Image
                src="/(unauth)-homepage/nfc-card-section.png"
                alt="Thẻ NFC Căn cước Tình yêu"
                width={400}
                height={300}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-[30px] mb-4 font-bold max-lg:text-[20px]">
                Thẻ NFC{" "}
                <span style={{ color: "#CEA19E" }}>
                  &quot;Căn cước Tình yêu&quot;
                </span>
              </h3>
              <p className="text-justify text-black mb-6 max-lg:text-sm">
                Là minh chứng vật lý cho tình yêu đẹp, đồng hành & không quan
                trọng khoảng cách, chỉ cần lúc nào bên cạnh cũng toàn hình bóng
                người ấy.
              </p>
              <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1 max-lg:gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DotLottieReact
                        src="/lotties/nfc-card-section.lottie"
                        autoplay
                        loop
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-justify flex-1 text-gray-600">
                    Cá nhân hoá thông tin và hình ảnh: biến chiếc thẻ thành căn
                    cước độc quyền của riêng đôi bạn.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DotLottieReact
                        src="/lotties/nfc-card-section.lottie"
                        autoplay
                        loop
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-justify flex-1 text-gray-600">
                    Mang đi muôn nơi: cảm giác như có người ấy ở bên cạnh.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DotLottieReact
                        src="/lotties/nfc-card-section.lottie"
                        autoplay
                        loop
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-justify flex-1 text-gray-600">
                    Đánh dấu chủ quyền với người yêu.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DotLottieReact
                        src="/lotties/nfc-card-section.lottie"
                        autoplay
                        loop
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-justify flex-1 text-gray-600">
                    Quét để truy cập &quot;Nhật ký Tình yêu&quot; dễ dàng: trong
                    1 CHẠM.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Website Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{
            amount: 0,
            margin: "-100px",
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0,
          }}
          className="bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF] to-[#CEA19E] rounded-tl-[20px] rounded-bl-[20px] p-6 mb-8 ml-50 mr-0 max-md:ml-15 max-lg:mr-0 max-lg:bg-gradient-to-b max-lg:from-[#CEA19E] max-lg:to-[#FFFFFF] max-lg:ml-50 max-xl:ml-30"
        >
          <div className="flex gap-8 max-lg:flex-col items-center">
            <div className="w-[400px] h-[300px] max-lg:w-full max-lg:h-[200px] rounded-[10px] overflow-hidden order-2 max-lg:order-1 flex items-center justify-center">
              <Image
                src="/(unauth)-homepage/website-section.png"
                alt="Website Nhật ký Tình yêu"
                width={400}
                height={300}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 order-1 max-lg:order-2">
              <h3 className="text-[30px] mb-4 font-bold max-lg:text-[20px]">
                Website{" "}
                <span style={{ color: "#CEA19E" }}>
                  &quot;Nhật ký Tình yêu&quot;
                </span>
              </h3>
              <p className="text-justify text-black mb-6 max-lg:text-sm">
                Là một cuốn nhật ký ảo, riêng tư để lưu ghi lại và lưu trữ những
                kỷ niệm, cảm xúc và đồng hành cùng đôi tình nhân trong từng sự
                kiện quan trọng.
              </p>
              <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1 max-lg:gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DotLottieReact
                        src="/lotties/website-section.lottie"
                        autoplay
                        loop
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-justify flex-1 text-gray-600">
                    Cá nhân hoá từ những chi tiết nhỏ nhất: Tự do tuỳ chỉnh giao
                    diện phù hợp với phong cách yêu.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DotLottieReact
                        src="/lotties/website-section.lottie"
                        autoplay
                        loop
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-justify flex-1 text-gray-600">
                    Truy cập dễ dàng: từ domain cá nhân hoá hoặc thẻ NFC
                    &quot;Căn cước Tình yêu&quot;.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DotLottieReact
                        src="/lotties/website-section.lottie"
                        autoplay
                        loop
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-justify flex-1 text-gray-600">
                    Tải photobooth: từ chính những bức ảnh kỷ niệm trong máy.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DotLottieReact
                        src="/lotties/website-section.lottie"
                        autoplay
                        loop
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-justify flex-1 text-gray-600">
                    Đếm ngày yêu & nhận thông báo các cột mốc đáng nhớ.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Box Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{
            amount: 0,
            margin: "-100px",
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0,
          }}
          className="bg-gradient-to-r from-[#CEA19E] via-[#FFFFFF] to-[#FFFFFF] rounded-tr-[20px] rounded-br-[20px] p-6 mb-8 ml-0 mr-50 max-md:mr-15 max-lg:ml-0 max-lg:bg-gradient-to-b max-lg:from-[#CEA19E] max-lg:to-[#FFFFFF] max-lg:mr-50 max-xl:mr-30"
        >
          <div className="flex gap-8 max-lg:flex-col items-center">
            <div className="w-[400px] h-[300px] max-lg:w-full max-lg:h-[200px] rounded-[10px] overflow-hidden flex items-center justify-center">
              <Image
                src="/(unauth)-homepage/box-section.png"
                alt="Hộp Kho báu Tình yêu"
                width={400}
                height={300}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-[30px] mb-4 font-bold max-lg:text-[20px]">
                Hộp{" "}
                <span style={{ color: "#CEA19E" }}>
                  &quot;Kho báu Tình yêu&quot;
                </span>
              </h3>
              <p className="text-justify text-black mb-6 max-lg:text-sm">
                Không chỉ là một chiếc hộp thông thường, mà là nơi để bạn dành
                những lời ngọt ngào nhất và khoảng khắc bên nhau vui vẻ nhất với
                người ấy.
              </p>
              <p className="text-justify text-black mb-6 max-lg:text-sm">
                Nhìn hộp thôi đã làm người thương phải rung động, giúp món quà
                của bạn trở nên ý nghĩa hơn.
              </p>
              <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1 max-lg:gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DotLottieReact
                        src="/lotties/box-section.lottie"
                        autoplay
                        loop
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-justify flex-1 text-gray-600">
                    Gửi lời ghi chú yêu thương ngay từ packaging bên ngoài.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DotLottieReact
                        src="/lotties/box-section.lottie"
                        autoplay
                        loop
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-justify flex-1 text-gray-600">
                    Có thêm những khoảng khắc chơi game vui vẻ cùng người
                    thương.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Product Gallery */}
      <section className="w-full py-8 flex flex-col items-center">
        <h2
          className="text-[72px] text-center mb-12 font-bold !font-appleberry max-md:text-[36px]"
          style={{ color: "#CEA19E" }}
        >
          Product gallery
        </h2>
        <div className="grid grid-cols-3 grid-rows-3 gap-0 w-full max-w-[2000px] px-0 max-md:grid-cols-1">
          {[
            "/(unauth)-homepage/product-gallery-2.png",
            "/(unauth)-homepage/product-gallery-1.png",
            "/(unauth)-homepage/product-gallery-3.png",
            "/(unauth)-homepage/product-gallery-5.png",
            "/(unauth)-homepage/product-gallery-4.png",
            "/(unauth)-homepage/product-gallery-6.png",
            "/(unauth)-homepage/product-gallery-2.png",
            "/(unauth)-homepage/product-gallery-1.png",
            "/(unauth)-homepage/product-gallery-3.png",
          ].map((imagePath, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: i * 0.1, // Thêm delay cho mỗi cột để tạo hiệu ứng tuần tự
              }}
              className="aspect-video bg-gray-300 relative group cursor-pointer overflow-hidden active:bg-gray-400"
              tabIndex={0}
            >
              <Image
                src={imagePath}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 group-focus:bg-black/50 group-active:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                <div className="w-[200px] h-[125px] opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                  <DotLottieReact
                    src="/lotties/product-gallery.lottie"
                    autoplay
                    loop
                    className="w-full h-full [filter:invert(0.71)_sepia(0.08)_saturate(1088%)_hue-rotate(314deg)_brightness(0.93)_contrast(0.91)]"
                  />
                </div>
                <div className="flex flex-col items-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-center !font-appleberry text-[28px]">
                    Xưởng Ký Ức
                  </span>
                  <span className="text-white text-center font-markpro text-[12px]">
                    Trao tay kỷ vật - Lưu trọn kỷ niệm
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Help Section */}
      <section className="w-full max-w-[1300px] px-12 py-8 max-md:px-4 max-lg:px-40">
        <h2
          className="text-[72px] text-center mb-4 font-bold !font-appleberry max-lg:text-[36px]"
          style={{ color: "#CEA19E" }}
        >
          Xưởng Ký Ức có thể giúp gì cho bạn?
        </h2>
        <p className="text-center text-xl mb-12 text-gray-600 max-lg:text-sm max-lg:mb-6">
          Bạn đã biết về Xưởng Ký Ức rồi! Giờ hãy để chúng mình biết nhiều hơn
          về bạn nhé!
        </p>
        <div className="grid grid-cols-2 gap-10 mb-8 max-lg:grid-cols-1 max-lg:gap-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[#EEEADF] rounded-[20px] border border-[#CEA19E] px-8 py-4 shadow-[12px_12px_12px_0px_rgba(206,161,158,0.8)] max-lg:px-4 max-lg:py-3"
          >
            <div className="flex gap-6 items-center max-lg:flex-row max-lg:gap-3">
              <div className="w-[200px] h-[200px] max-lg:w-[100px] max-lg:h-[100px] relative flex-shrink-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <DotLottieReact
                    src="/lotties/help-section-2.lottie"
                    autoplay
                    loop
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[20px] leading-normal mb-6 text-justify max-lg:text-[14px] max-lg:mb-3">
                  Gửi những thầm kín hay câu chuyện hay ho bạn muốn chia sẻ qua
                  mail của Xưởng Ký Ức!
                </p>
                <div className="flex justify-start">
                  <Link
                    href="mailto:xuongkyuc@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="secondary"
                      className="!bg-[#2F2F2F] hover:!bg-[#CEA19E] hover:text-black text-white rounded-lg max-lg:text-sm max-lg:py-1 max-lg:px-3 transition-colors duration-300"
                    >
                      Chia sẻ ngay
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
            className="bg-[#EEEADF] rounded-[20px] border border-[#CEA19E] px-8 py-4 shadow-[12px_12px_12px_0px_rgba(206,161,158,0.8)] max-lg:px-4 max-lg:py-3"
          >
            <div className="flex gap-6 items-center max-lg:flex-row max-lg:gap-3">
              <div className="w-[200px] h-[200px] max-lg:w-[100px] max-lg:h-[100px] relative flex-shrink-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <DotLottieReact
                    src="/lotties/help-section-1.lottie"
                    autoplay
                    loop
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[20px] leading-normal mb-6 text-justify max-lg:text-[14px] max-lg:mb-3">
                  Nhắn tin trực tiếp chúng mình để tìm hiểu thêm về sản phẩm!
                </p>
                <div className="flex justify-start">
                  <Link
                    href="https://m.me/xuongkyuc"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="secondary"
                      className="!bg-[#2F2F2F] hover:!bg-[#CEA19E] hover:text-black text-white rounded-lg max-lg:text-sm max-lg:py-1 max-lg:px-3 transition-colors duration-300"
                    >
                      Liên hệ ngay
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
