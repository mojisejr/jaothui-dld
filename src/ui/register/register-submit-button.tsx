import React from "react";
import { useFormStatus } from "react-dom";

const RegisterSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      type="submit"
      className="btn btn-secondary btn-sm min-w-[200px] rounded-full"
    >
      {pending ? "กำลังสร้างบัญชี" : "สร้างบัญชี"}
    </button>
  );
};

export default RegisterSubmitButton;
