"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Mật khẩu không khớp.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, invitationCode }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Đăng ký thất bại.");
        return;
      }

      router.push(`/${data.user.domain}/edit`);
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-calculated-content max-w-[421px] mx-auto max-xl:pb-10 max-sm:px-10">
      <div className="font-bold text-[40px] text-black-80">Đăng ký</div>
      <Image src="/logo-tach-nen.png" alt="logo" width={196} height={130} />

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
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
        <Input
          type="password"
          placeholder="Xác nhận mật khẩu"
          className="w-full"
          inputSize="lg"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <div className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Mã số thẻ"
            className="w-full"
            inputSize="lg"
            value={invitationCode}
            onChange={(e) => setInvitationCode(e.target.value)}
          />
          <i className="text-sm text-black-80 ml-4">
            Lưu ý: mỗi mã số thẻ chỉ tạo được duy nhất 1 tài khoản
          </i>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center -mt-2">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full rounded-[50px] h-12"
          disabled={loading}
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
