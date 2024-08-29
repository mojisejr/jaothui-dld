"use client";
import { useFormStatus } from "react-dom";

const SubmitAppointment = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="btn btn-secondary rounded-full shadow-xl"
    >
      {pending ? "กำลังบันทึก..." : "ยืนยันการประเมิน"}
    </button>
  );
};

export default SubmitAppointment;
