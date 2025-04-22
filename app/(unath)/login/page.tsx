"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Đăng nhập thất bại.");
        return;
      }

      router.push(`/${data.domain}/edit`);
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra khi đăng nhập.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-calculated-content max-w-[421px] mx-auto max-xl:pb-10 max-sm:px-10 py-5">
      <div className="font-bold text-[40px] text-black-80">Đăng nhập</div>
      <Image src="/logo-tach-nen.png" alt="logo" width={196} height={130} />

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 mt-4">
        <Input
          type="email"
          placeholder="Gmail"
          className="w-full"
          inputSize="lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Mật khẩu"
          className="w-full"
          inputSize="lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <Button
          type="submit"
          className="w-full rounded-[50px] h-12"
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>

        <div className="flex justify-between">
          <Link href="/register" className="text-black-80 text-xl">
            Tạo tài khoản
          </Link>
          <Link href="/forgot-password" className="text-black-80 text-xl">
            Quên Mật Khẩu?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
