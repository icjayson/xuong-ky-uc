"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";

const Feedback = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: ""
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (formData.email && !formData.email.includes("@")) {
      setError("Email không hợp lệ");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        setSuccess("Lời nhắn đã được gửi thành công!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSuccess("Không gửi được lời nhắn");
      }
    } catch {
      setError("Đã xảy ra lỗi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "w-full h-full px-20 py-[100px] flex flex-col gap-3 max-w-[700px]",
        "max-sm:p-6"
      )}
    >
      <div className="text-xl font-medium text-black-80">Feedback</div>
      <div className="text-base text-black-80">
        Hãy đóng góp cho chúng mình qua biểu mẫu này nhé!
      </div>
      <div className="text-base text-black-80">Xưởng ký ức xin cảm ơn!</div>
      <div
        className={cn(
          "border border-primary-50 rounded-[10px] p-10 shadow-card",
          "max-sm:p-6 max-sm:shadow-card-small"
        )}
      >
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            name="name"
            placeholder="Tên của bạn"
            onChange={handleChange}
            value={formData.name}
            className="px-3 text-base placeholder:text-black-80 h-8 rounded-[10px]"
            variant="secondary"
          />
          <Input
            type="email"
            name="email"
            placeholder="Email của bạn"
            onChange={handleChange}
            value={formData.email}
            className="px-3 text-base placeholder:text-black-80 h-8 rounded-[10px]"
            variant="secondary"
          />
          <Textarea
            name="message"
            placeholder="Lời nhắn của bạn"
            onChange={handleChange}
            value={formData.message}
            className="h-24 px-3 !text-base placeholder:text-black-80"
          />

          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button
            disabled={isLoading}
            className="px-10 h-8"
            onClick={handleSubmit}
          >
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
