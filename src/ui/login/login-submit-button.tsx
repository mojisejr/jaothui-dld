"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const LoginSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="btn btn-secondary btn-sm min-w-[200px] rounded-full"
    >
      {pending ? "กำลังเข้้าสู่ระบบ" : "เข้าสู่ระบบ"}
    </button>
  );
};

export default LoginSubmitButton;
