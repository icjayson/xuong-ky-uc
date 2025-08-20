import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import {
  Heart,
  Smartphone,
  Users,
  Image as ImageIcon,
  Clock,
  BookOpen,
  Camera,
  Settings,
  Link as LinkIcon,
  Bell,
  Share2
} from "lucide-react";

export default function SanPhamPage() {
  const heroImage = "/(unauth)-homepage/san-pham-website.png";
  const nfcMockup = "/(unauth)-homepage/san-pham-nfccard.png";
  const websiteMockup = "/(unauth)-homepage/san-pham-website.png";

  const NFCSection = () => {
    const features = [
      {
        icon: <Heart className="w-6 h-6" fill="currentColor" />,
        title: "Thẻ vật lý cho tình yêu đẹp",
        description: "Thẻ NFC cao cấp lưu giữ những kỷ niệm tình yêu của bạn"
      },
      {
        icon: <Smartphone className="w-6 h-6" />,
        title: "Đồng hành & khoảng cách",
        description: "Chỉ cần 1 lần chạm điện thoại là có thể truy cập mọi kỷ niệm"
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: "Kết nối với người yêu",
        description: "Chia sẻ những khoảnh khắc đẹp với người thân yêu"
      },
      {
        icon: <ImageIcon className="w-6 h-6" />,
        title: "Cá nhân hóa toàn diện",
        description: "Thiết kế riêng với ảnh và thông tin của riêng bạn"
      }
    ];

    return (
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold !font-appleberry text-foreground mb-6" style={{ color: "#CEA19E" }}>
              Thẻ NFC - Căn cước Tình yêu
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Là minh chứng vật lý cho tình yêu đẹp, đồng hành & không quan trọng khoảng cách,
              chỉ cần lúc nào bên cạnh cũng toàn hình bóng người ấy.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-card rounded-3xl p-0 shadow-card transition-all duration-500">
                <img
                  src={nfcMockup}
                  alt="NFC Love Cards"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-info-card">
                <Heart className="w-6 h-6" fill="currentColor" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="border border-primary/30 rounded-2xl hover:border-primary/60 transition-all duration-300 hover:scale-105">
                    <div className="p-6">
                      <div className="text-primary mb-4">{feature.icon}</div>
                      <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="rounded-2xl p-6 border border-primary/20 bg-primary/10">
                <p className="text-muted-foreground italic text-center">
                    &quot;Thẻ NFC cá nhãn hóa dành cho cặp đôi &quot;
                </p>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:opacity-90 text-black shadow-card transition-all duration-300 hover:scale-102"
              >
                Đặt hàng thẻ NFC ngay
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const WebsiteSection = () => {
    const features = [
      {
        icon: <Clock className="w-5 h-5" />,
        title: "Đồng hồ tình yêu",
        description: "Theo dõi hành trình tình yêu qua thời gian"
      },
      {
        icon: <BookOpen className="w-5 h-5" />,
        title: "Nhật ký Tình yêu",
        description: "Ghi lại những kỷ niệm đẹp mỗi ngày"
      },
      {
        icon: <Camera className="w-5 h-5" />,
        title: "Tải photobooth",
        description: "Lưu trữ ảnh couple xinh đẹp"
      },
      {
        icon: <Settings className="w-5 h-5" />,
        title: "Tuỳ chỉnh giao diện",
        description: "Cá nhân hóa theo phong cách riêng"
      },
      {
        icon: <LinkIcon className="w-5 h-5" />,
        title: "Tuỳ chỉnh URL",
        description: "Tạo đường dẫn độc đáo tới Nhật ký của cặp đôi"
      },
      {
        icon: <Bell className="w-5 h-5" />,
        title: "Thông báo anniversary",
        description: "Nhắc nhở những ngày đặc biệt"
      },
      {
        icon: <Share2 className="w-5 h-5" />,
        title: "Chia sẻ nhật ký",
        description: "Chia sẻ kỷ niệm với bạn bè"
      }
    ];

    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold !font-appleberry text-foreground mb-6" style={{ color: "#CEA19E" }}>
              Website xuongkyuc.com - Nhật ký Tình yêu
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Là một cuốn nhật ký ảo, riêng tư để lưu ghi lại và lưu trữ những kỷ niệm, cảm xúc và
              đồng hành cùng đôi tình nhân trong từng sự kiện quan trọng.
            </p>

            <div className="mt-8 bg-primary/10 rounded-2xl p-4 border border-primary/20 inline-block">
              <div className="flex items-center text-primary">
                <LinkIcon className="w-5 h-5 mr-2" />
                <span className="font-semibold">Nhật ký tình yêu - Xưởng Ký Ức</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">www.xuongkyuc.com</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="relative">
                <div className="rounded-3xl p-0 bg-card shadow-card">
                  <img
                    src={websiteMockup}
                    alt="Love Diary Website"
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-info-card">
                  <Heart className="w-6 h-6" fill="currentColor" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground italic">
                &quot;Nhật ký Tình yêu của riêng đôi bạn trên website xuongkyuc.com&quot;
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl p-6 border border-primary/20 bg-primary/10">
                <h3 className="text-2xl font-bold text-foreground text-center">
                  Khám phá các tình năng của website
                </h3>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="border border-primary/20 hover:border-primary/40 transition-all duration-300 rounded-2xl hover:scale-105"
                  >
                    <div className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="text-primary">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {feature.title}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:opacity-90 text-black shadow-card transition-all duration-300 hover:scale-102"
                >
                  Liên hệ để đăng ký tài khoản ngay!
                </Button>
                <Button
                  anomaly="outline"
                  size="lg"
                  className="w-full border-primary text-primary hover:!bg-[#CEA19E] hover:!text-black hover:!opacity-100"
                >
                  Xem demo trực tiếp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col">
      <section className="relative py-12 bg-gradient-hero flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="animate-fade-in-up">
            <h1
              className="text-5xl md:text-7xl font-bold text-foreground !font-appleberry mb-6 leading-tight"
              style={{ color: "black" }}
            >
              Sản phẩm của Xưởng Ký Ức
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá những sản phẩm độc đáo giúp bạn lưu giữ và chia sẻ những kỷ niệm tình yêu đẹp nhất
            </p>
          </div>
        </div>
      </section>

      <NFCSection />
      <WebsiteSection />
    </div>
  );
}
