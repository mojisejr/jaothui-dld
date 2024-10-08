"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const ApprovmentSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="btn btn-secondary min-w-[100px] rounded-full"
    >
      {pending ? (
        <div className="flex items-center">
          <div className="loading loading-spinner"></div>
          กำลังเข้าสู่ระบบ...
        </div>
      ) : (
        "อนุมัติ"
      )}
    </button>
  );
};

export default ApprovmentSubmitButton;
