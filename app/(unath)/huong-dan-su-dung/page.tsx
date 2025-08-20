"use client";

import Link from "next/link";
import { useState } from "react";
import Card from "@/components/ui/card";
import {
  Heart,
  Globe,
  Smartphone,
  ArrowRight,
  Palette,
  Lock,
  MessageCircle,
  Share2
} from "lucide-react";

export default function HuongDanPage() {
  const [activeTab, setActiveTab] = useState<"website" | "nfc">("website");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EEEADF" }}>
      <div className="py-12 text-center">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-5xl md:text-7xl font-bold !font-appleberry" style={{ color: "#CCA19E" }}>
              Hướng Dẫn Sử Dụng
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá cách sử dụng Thẻ NFC Căn cước Tình yêu và Website Nhật ký Tình yêu để lưu giữ những kỷ niệm đẹp nhất
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-16">
        {/* Tabs */}
        <div className="w-full">
          <div className="grid w-full grid-cols-2 mb-8 bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab("website")}
              className={`flex items-center justify-center px-4 py-3 text-md font-medium transition-colors ${
                activeTab === "website" ? "text-black" : "text-gray-700"
              }`}
              style={{ backgroundColor: activeTab === "website" ? "#CCA19E" : "transparent" }}
            >
              <Globe className="w-4 h-4 mr-2" />
              Website Nhật ký Tình yêu
            </button>
            <button
              onClick={() => setActiveTab("nfc")}
              className={`flex items-center justify-center px-4 py-3 text-md font-medium transition-colors ${
                activeTab === "nfc" ? "text-black" : "text-gray-700"
              }`}
              style={{ backgroundColor: activeTab === "nfc" ? "#CCA19E" : "transparent" }}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Thẻ NFC Căn cước Tình yêu
            </button>
          </div>

          {activeTab === "website" && (
            <div className="space-y-8">
              {/* Step 1 */}
              <Card className="bg-white/70 backdrop-blur-sm border-2 rounded-lg" style={{ borderColor: "#CCA19E" }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded-md text-white text-xs font-semibold" style={{ backgroundColor: "#CCA19E" }}>
                      BƯỚC 1
                    </span>
                    <h3 className="text-xl font-semibold" style={{ color: "#CCA19E" }}>
                      Tạo tài khoản
                    </h3>
                  </div>
                  <div className="xl:grid xl:grid-cols-3 xl:gap-6">
                    <div className="xl:col-span-2">
                      <p className="text-gray-700">
                        Truy cập website <span className="font-semibold" style={{ color: "#CCA19E" }}>
                          <Link href="https://xuongkyuc.com" target="_blank" rel="noopener noreferrer">xuongkyuc.com</Link>
                        </span>, tạo tài khoản mới bằng MÃ SỐ THẺ của bạn trên Căn cước Tình yêu.
                      </p>
                      <div className="space-y-4 mt-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-sm text-yellow-800">
                            <strong>Lưu ý:</strong> Mỗi mã số thẻ chỉ tạo được 1 tài khoản duy nhất.
                          </p>
                        </div>
                        <div className="grid gap-3">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span>Nhập gmail của bạn</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span>Tạo mật khẩu an toàn</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span>Nhập mã số thẻ từ Căn cước Tình yêu</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 xl:mt-0 xl:col-span-1 rounded-sm">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="w-full flex items-center justify-center text-sm text-gray-600">
                          <img src="/(unauth)-homepage/hdsd-step1.png" alt="Bước 1" className="w-full h-auto object-contain rounded-sm" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 2 */}
              <Card className="bg-white/70 backdrop-blur-sm border-2 rounded-lg" style={{ borderColor: "#CCA19E" }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded-md text-white text-xs font-semibold" style={{ backgroundColor: "#CCA19E" }}>
                      BƯỚC 2
                    </span>
                    <h3 className="text-xl font-semibold" style={{ color: "#CCA19E" }}>
                      Tô điểm cho trang Nhật ký
                    </h3>
                  </div>
                  <div className="xl:grid xl:grid-cols-3 xl:gap-6">
                    <div className="xl:col-span-2">
                      <p className="text-gray-700">
                        Vào mục <strong>TÙY CHỈNH</strong> để thoả sức chọn màu sắc, cập nhật thông tin và ảnh cá nhân.
                      </p>
                      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 my-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span className="font-semibold">Chọn chủ đề:</span>
                          </div>
                          <ul className="space-y-1 ml-6 text-sm">
                            <li>• Chọn bộ màu cơ bản</li>
                            <li>• Tùy chỉnh màu sắc chi tiết</li>
                            <li>• Chọn font chữ yêu thích</li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span className="font-semibold">Thông tin cá nhân:</span>
                          </div>
                          <ul className="space-y-1 ml-6 text-sm">
                            <li>• Đặt ngày bắt đầu yêu</li>
                            <li>• Cập nhật ảnh đại diện</li>
                            <li>• Thêm thông tin về đôi bạn</li>
                          </ul>
                        </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 italic mt-4">
                        Khi đã ưng ý, nhấn <strong>LƯU</strong>.
                      </p>
                    </div>
                    <div className="mt-4 xl:mt-0 xl:col-span-1 rounded-sm">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="w-full flex items-center justify-center text-sm text-gray-600">
                          <img src="/(unauth)-homepage/hdsd-step2.png" alt="Bước 2" className="w-full h-auto object-contain rounded-sm" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 3 */}
              <Card className="bg-white/70 backdrop-blur-sm border-2 rounded-lg" style={{ borderColor: "#CCA19E" }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded-md text-white text-xs font-semibold" style={{ backgroundColor: "#CCA19E" }}>
                      BƯỚC 3
                    </span>
                    <h3 className="text-xl font-semibold" style={{ color: "#CCA19E" }}>
                      Ghi lại kỷ niệm
                    </h3>
                  </div>
                  <div className="xl:grid xl:grid-cols-3 xl:gap-6">
                    <div className="xl:col-span-2">
                      <p className="text-gray-700">
                        Vào mục <strong>CẬP NHẬT NHẬT KÝ</strong> để lưu giữ những khoảnh khắc đẹp bên người thương.
                      </p>
                      <div className="grid gap-4 mt-4">
                        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                          <h4 className="font-semibold mb-2" style={{ color: "#CCA19E" }}>Tùy chọn nhật ký (upcoming):</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                            <span>• Khung mạc định</span>
                            <span>• Khung polaroid</span>
                            <span>• Khung kinh</span>
                            <span>• Khung tranh</span>
                            <span>• Khung gỗ</span>
                            <span>• Khung vàng</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold" style={{ color: "#CCA19E" }}>Thêm kỷ niệm:</h4>
                          <div className="grid gap-2 text-sm">
                            <span>• Chọn ảnh kỷ niệm</span>
                            <span>• Thêm địa điểm</span>
                            <span>• Chọn ngày tháng</span>
                            <span>• Viết mô tả cho kỷ niệm</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 italic mt-2">
                        Sau khi hoàn tất, nhấn <strong>LƯU</strong>.
                      </p>
                    </div>
                    <div className="mt-4 xl:mt-0 xl:col-span-1 rounded-sm">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="w-full flex items-center justify-center text-sm text-gray-600">
                          <img src="/(unauth)-homepage/hdsd-step2.png" alt="Bước 3" className="w-full h-auto object-contain rounded-sm" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 4 */}
              <Card className="bg-white/70 backdrop-blur-sm border-2 rounded-lg" style={{ borderColor: "#CCA19E" }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded-md text-white text-xs font-semibold" style={{ backgroundColor: "#CCA19E" }}>
                      BƯỚC 4
                    </span>
                    <h3 className="text-xl font-semibold" style={{ color: "#CCA19E" }}>
                      Cá nhân hóa thêm cho Nhật ký
                    </h3>
                  </div>
                  <div className="xl:grid xl:grid-cols-3 xl:gap-6 mt-4">
                  <div className="xl:col-span-2">
                  <p className="text-gray-700">
                    Vào mục <strong>THÔNG TIN</strong> để tùy chỉnh DOMAIN cho Nhật ký Tình yêu và đổi mật khẩu nếu cần.
                  </p>
                      <div className="flex items-center gap-2 mt-4">
                      <Globe className="w-4 h-4" style={{ color: "#CCA19E" }} />
                      <span className="font-semibold">Tùy chỉnh Domain:</span>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                        <p className="text-sm text-blue-800">
                          <strong>Ví dụ:</strong> xuongkyuc.com/urlcapdoi
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 mb-2">
                        <Lock className="w-4 h-4" style={{ color: "#CCA19E" }} />
                        <span className="font-semibold">Bảo mật tài khoản:</span>
                      </div>
                      <ul className="space-y-1 ml-6 text-sm">
                        <li>• Đổi mật khẩu định kỳ (nếu cần)</li>
                        <li>• Không chia sẻ mật khẩu cho người lạ</li>
                      </ul>
                    </div>
                    <div className="mt-4 xl:mt-0 xl:col-span-1 rounded-sm">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="w-full flex items-center justify-center text-sm text-gray-600">
                          <img src="/(unauth)-homepage/hdsd-step4.png" alt="Bước 4" className="w-full h-auto object-contain rounded-sm" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 5*/}
              <Card className="bg-white/70 backdrop-blur-sm border-2 rounded-lg" style={{ borderColor: "#CCA19E" }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded-md text-white text-xs font-semibold" style={{ backgroundColor: "#CCA19E" }}>
                      BƯỚC 5
                    </span>
                    <h3 className="text-xl font-semibold" style={{ color: "#CCA19E" }}>
                      Ngắm nhìn thành quả
                    </h3>
                  </div>
                  <div className="xl:grid xl:grid-cols-3 xl:gap-6 mt-4">
                  <div className="xl:col-span-2">
                  <p className="text-gray-700">
                    Vào mục <strong>TRANG CHỦ</strong> để chiêm ngưỡng toàn bộ Nhật ký Tình yêu của bạn và người thương.
                  </p>

                    </div>
                    <div className="mt-4 xl:mt-0 xl:col-span-1 rounded-lg bg-white/60">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="w-full flex items-center justify-center text-sm text-gray-600">
                          <img src="/(unauth)-homepage/san-pham-website.png" alt="Bước 5-6" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 6 */}
              <Card className="bg-white/70 backdrop-blur-sm border-2 rounded-lg" style={{ borderColor: "#CCA19E" }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded-md text-white text-xs font-semibold" style={{ backgroundColor: "#CCA19E" }}>
                      BƯỚC 6
                    </span>
                    <h3 className="text-xl font-semibold" style={{ color: "#CCA19E" }}>
                      Chia sẻ Nhật ký hoặc giữ riêng tư
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    Nhấn nút <strong>SHARE</strong> ở góc trên - phải và chọn 1 trong 2 cách sau:
                  </p>
                  <div className="lg:grid lg:grid-cols-2 lg:gap-6 mt-4">
                  <div className="xl:col-span-1">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                    <div className="grid gap-2 text-sm text-green-800">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4" style={{ color: "#CCA19E" }} />
                      <span><strong>(i) BẬT CHẾ ĐỘ CÔNG KHAI</strong> để khoe nhật ký với bạn bè.</span>
                      </div>
                      <a href="#" target="_blank" rel="noopener noreferrer" className="block flex items-center justify-center">
                        <div className="w-2/3 flex items-center justify-center text-sm text-gray-600">
                          <img src="/(unauth)-homepage/hdsd-step6-1.png" alt="Bước 5-6" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                      </a>
                  </div>
                  </div>
                  </div>
                  <div className="xl:col-span-1">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                        <div className="grid gap-2 text-sm text-red-800">
                          <div className="flex items-center gap-2">
                            <Share2 className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span><strong>(ii) TẮT CHẾ ĐỘ CÔNG KHAI</strong> để giữ kỷ niệm cho riêng hai người.</span>
                          </div>
                          <a href="#" target="_blank" rel="noopener noreferrer" className="block flex items-center justify-center">
                          <div className="w-2/3 flex items-center justify-center text-sm text-gray-600">
                          <img src="/(unauth)-homepage/hdsd-step6-2.png" alt="Bước 5-6" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                      </a>
                        </div>
                      </div>
                      </div>
                  </div>
                </div>
              </Card>

              {/* Support */}
              <Card className="bg-white/70 backdrop-blur-sm border-2 rounded-lg" style={{ borderColor: "#CCA19E" }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageCircle className="w-6 h-6" style={{ color: "#CCA19E" }} />
                    <h3 className="text-xl font-semibold" style={{ color: "#CCA19E" }}>
                      Hỗ trợ nhanh chóng
                    </h3>
                  </div>
                  <div className="xl:grid xl:grid-cols-3 xl:gap-6 mt-4">
                  <div className="xl:col-span-2">
                    <p className="text-gray-700">
                      Gặp khó khăn? Nhấn <strong>BIỂU TƯỢNG TIN NHẮN</strong> ở góc dưới - phải màn hình để liên hệ Shop. Chúng mình luôn sẵn sàng giúp bạn!
                    </p>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-purple-800">
                        <strong>Lưu ý:</strong> Đừng quên vào mục <strong>FEEDBACK</strong> để chia sẻ cảm nhận nhé! Ý kiến của bạn sẽ giúp Shop ngày càng hoàn thiện hơn.
                      </p>
                    </div>
                    </div>
                    <div className="mt-4 xl:mt-0 xl:col-span-1 rounded-sm">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="w-full flex items-center justify-center text-sm text-gray-600">
                          <img src="/(unauth)-homepage/hdsd-feedback.png" alt="Feedback" className="w-full h-auto object-contain rounded-sm" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "nfc" && (
            <div className="space-y-8">
              {/* NFC Step 1 */}
              <Card className="bg-white/70 backdrop-blur-sm border-2 rounded-lg" style={{ borderColor: "#CCA19E" }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded-md text-white text-xs font-semibold" style={{ backgroundColor: "#CCA19E" }}>
                      BƯỚC 1
                    </span>
                    <h3 className="text-xl font-semibold" style={{ color: "#CCA19E" }}>
                      Bật chế độ chia sẻ Nhật ký
                    </h3>
                  </div>
                  <div className="xl:grid xl:grid-cols-3 xl:gap-6 mt-4">
                    <div className="xl:col-span-2">
                      <p className="text-gray-700">
                        Truy cập website Nhật ký Tình yêu của bạn
                      </p>
                      <div className="space-y-4 mt-4">
                        <div className="grid gap-3">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span>Ấn vào nút <strong>SHARE</strong> trên góc trên bên phải <strong>TRANG CHỦ</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span>Sao chép <strong>ĐƯỜNG DẪN TRUY CẬP</strong></span>
                          </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-blue-800">
                            <strong>Lưu ý:</strong> Dù bạn để Nhật ký ở chế độ <strong>CÔNG KHAI</strong> hay <strong>RIÊNG TƯ</strong> thì đôi bạn vẫn hoàn toàn có thể truy cập được website từ thẻ NFC trên những thiết bị đã đăng nhập tài khoản. Nên bạn đừng lo không biết để website RIÊNG TƯ  thì bạn có xem được không nhé!
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 xl:mt-0 xl:col-span-1 rounded-lg bg-white/60">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="w-full flex items-center justify-center text-sm text-gray-600">
                          <img src="/(unauth)-homepage/hdsd-step6-1.png" alt="NFC Bước 1" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* NFC Step 2 */}
              <Card className="bg-white/70 backdrop-blur-sm border-2 rounded-lg" style={{ borderColor: "#CCA19E" }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded-md text-white text-xs font-semibold" style={{ backgroundColor: "#CCA19E" }}>
                      BƯỚC 2
                    </span>
                    <h3 className="text-xl font-semibold" style={{ color: "#CCA19E" }}>
                      Tải ứng dụng ghi thẻ NFC
                    </h3>
                  </div>
                  <div className="xl:grid xl:grid-cols-3 xl:gap-6 mt-4">
                    <div className="xl:col-span-2">
                      <p className="text-gray-700">
                        Tải ứng dụng <strong>NFC Tools</strong> trên App Store hoặc CH Play.
                      </p>
                    </div>
                    <div className="mt-4 xl:mt-0 xl:col-span-1 rounded-lg bg-white/60">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="w-full flex items-center justify-center text-sm text-gray-600">
                          <img src="/(unauth)-homepage/hdsd-step2-nfc.png" alt="NFC Bước 2" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* NFC Step 3 */}
              <Card className="bg-white/70 backdrop-blur-sm border-2 rounded-lg" style={{ borderColor: "#CCA19E" }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded-md text-white text-xs font-semibold" style={{ backgroundColor: "#CCA19E" }}>
                      BƯỚC 3
                    </span>
                    <h3 className="text-xl font-semibold" style={{ color: "#CCA19E" }}>
                      Truy cập ứng dụng NFC Tools
                    </h3>
                  </div>
                  <div className="xl:grid xl:grid-cols-3 xl:gap-6 mt-4">
                    <div className="xl:col-span-2">
                      <p className="text-gray-700">
                        Truy cập ứng dụng NFC Tools mà bạn vừa tải.
                      </p>
                      <div className="space-y-4 mt-4">
                        <div className="grid gap-3">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span>Vào mục <strong>WRITE</strong> trên tiêu đề</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span>Chọn tab <strong>ADD A RECORD</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span>Chọn tab <strong>URL/URI</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 xl:mt-0 xl:col-span-1 rounded-lg bg-white/60">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="w-full flex items-center justify-center text-sm text-gray-600">
                          <img src="/(unauth)-homepage/hdsd-step3-nfc.png" alt="NFC Bước 3" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* NFC Step 4 */}
              <Card className="bg-white/70 backdrop-blur-sm border-2 rounded-lg" style={{ borderColor: "#CCA19E" }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded-md text-white text-xs font-semibold" style={{ backgroundColor: "#CCA19E" }}>
                      BƯỚC 4
                    </span>
                    <h3 className="text-xl font-semibold" style={{ color: "#CCA19E" }}>
                      Tiến hành ghi dữ liệu vào thẻ NFC
                    </h3>
                  </div>
                  <div className="xl:grid xl:grid-cols-3 xl:gap-6 mt-4">
                    <div className="xl:col-span-2">
                      <p className="text-gray-700">
                        Sau khi kết thúc bước 3:
                      </p>
                      <div className="space-y-4 mt-4">
                        <div className="grid gap-3">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span>Dán <strong>ĐƯỜNG DẪN TRUY CẬP</strong> đã sao chép trên website (đảm bảo chọn đúng định dạng https://) và nhấn OK.</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span>Nhấn nút <strong>WRITE</strong> và đặt <strong>Căn cước Tình yêu</strong> vào gần điện thoại</span>
                          </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-blue-800">
                            <strong>Mẹo:</strong> Vị trí chip NFC thường ở giữa mặt sau điện thoại hoặc gần camera.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 xl:mt-0 xl:col-span-1 rounded-lg bg-white/60">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="w-full flex items-center justify-center text-sm text-gray-600">
                          <img src="/(unauth)-homepage/hdsd-step4-5-nfc.png" alt="NFC Bước 4" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* NFC Step 5 */}
              <Card className="bg-white/70 backdrop-blur-sm border-2 rounded-lg" style={{ borderColor: "#CCA19E" }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded-md text-white text-xs font-semibold" style={{ backgroundColor: "#CCA19E" }}>
                      BƯỚC 5
                    </span>
                    <h3 className="text-xl font-semibold" style={{ color: "#CCA19E" }}>
                      Truy cập website Nhật ký Tình yêu từ thẻ NFC
                    </h3>
                  </div>
                  <div className="xl:grid xl:grid-cols-3 xl:gap-6 mt-4">
                    <div className="xl:col-span-2">
                      <p className="text-gray-700">
                        Đặt <strong>thẻ NFC Căn cước Tình yêu</strong> vào gần điện thoại.
                      </p>
                      <div className="space-y-4 mt-4">
                        <div className="grid gap-3">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span>Thẻ sẽ phát ra tín hiệu kết nối</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span>Điện thoại hiển thị thông báo</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" style={{ color: "#CCA19E" }} />
                            <span>Tự động chuyển đến trang Nhật ký</span>
                          </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-sm text-green-800">
                            <strong>Lưu ý:</strong> Thẻ NFC hoạt động mà không cần pin hay kết nối internet.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 xl:mt-0 xl:col-span-1 rounded-lg">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="w-full flex items-center justify-center text-sm text-gray-600">
                          <img src="/(unauth)-homepage/san-pham-nfccard.png" alt="NFC Bước 5" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* NFC Step 6 */}
              <Card className="bg-white/70 backdrop-blur-sm border-2 rounded-lg" style={{ borderColor: "#CCA19E" }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded-md text-white text-xs font-semibold" style={{ backgroundColor: "#CCA19E" }}>
                      BƯỚC 6
                    </span>
                    <h3 className="text-xl font-semibold" style={{ color: "#CCA19E" }}>
                      Bảo quản và sử dụng lâu dài
                    </h3>
                  </div>
                  <div className="xl:grid xl:grid-cols-3 xl:gap-6 mt-4">
                    <div className="xl:col-span-2">
                      <p className="text-gray-700">
                        Thẻ NFC bền bỉ và có thể sử dụng trong nhiều năm với cách bảo quản đúng cách.
                      </p>
                      <div className="space-y-4 mt-4">
                        <div className="grid gap-4">
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h4 className="font-semibold mb-2 text-yellow-800">Lưu ý bảo quản:</h4>
                            <ul className="space-y-1 text-sm text-yellow-800">
                              <li>• Tránh để thẻ gần nam châm mạnh</li>
                              <li>• Không bẻ cong hoặc làm hỏng chip</li>
                              <li>• Tránh nhiệt độ quá cao</li>
                              <li>• Lau sạch bằng khăn mềm khi cần</li>
                            </ul>
                          </div>
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <p className="text-sm text-purple-800">
                              <strong>Thông tin kỹ thuật:</strong> Thẻ sử dụng công nghệ NFC tiêu chuẩn ISO14443, tương thích với hầu hết điện thoại thông minh hiện tại.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 xl:mt-0 xl:col-span-1 rounded-lg">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="w-full flex items-center justify-center text-sm text-gray-600">
                          <img src="/(unauth)-homepage/san-pham-nfccard-2.png" alt="NFC Bước 6" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
