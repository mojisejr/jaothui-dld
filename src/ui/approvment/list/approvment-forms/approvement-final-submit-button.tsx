"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const ApprovmentSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="btn btn-secondary min-w-[200px] rounded-full"
    >
      {pending ? "กำลังอนุมัติ..." : "อนุมัติ"}
    </button>
  );
};

export default ApprovmentSubmitButton;
