"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password })
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Đã xảy ra lỗi.");
      setIsLoading(false);
      return;
    }

    setSuccess("Mật khẩu đã được cập nhật!");
    setTimeout(() => router.push("/login"), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-calculated-content max-w-[421px] mx-auto max-xl:pb-10 max-sm:px-10">
      <div className="font-bold text-[40px] text-black-80">
        Khôi phục mật khẩu
      </div>
      <Image src="/logo-tach-nen.png" alt="logo" width={196} height={130} />

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 mt-4">
        <Input
          type="password"
          placeholder="Mật khẩu"
          className="w-full"
          inputSize="lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Nhập lại mật khẩu"
          className="w-full"
          inputSize="lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          {isLoading ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
        </Button>
      </form>
    </div>
  );
}
