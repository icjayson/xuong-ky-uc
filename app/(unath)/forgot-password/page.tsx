"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setError("Email không hợp lệ.");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    const res = await fetch("/api/auth/request-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Đã xảy ra lỗi.");
    } else {
      setSuccess("Email khôi phục mật khẩu đã được gửi.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-calculated-content max-w-[421px] mx-auto max-xl:pb-10 max-sm:px-10">
      <div className="font-bold text-[40px] text-black-80">
        Khôi phục mật khẩu
      </div>
      <Image src="/logo-tach-nen.png" alt="logo" width={196} height={130} />

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 mt-4">
        <Input
          type="email"
          placeholder="Email"
          className="w-full"
          inputSize="lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {success && (
          <div className="text-green-500 text-sm text-center">{success}</div>
        )}

        <Button
          type="submit"
          className="w-full rounded-[50px] h-12"
          disabled={isLoading}
        >
          {isLoading ? "Đang gửi..." : "Gửi"}
        </Button>
      </form>
    </div>
  );
}
