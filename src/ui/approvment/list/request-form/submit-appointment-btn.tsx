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
      {pending ? (
        <div className="flex items-center">
          <div className="loading loading-spinner"></div>
          กำลังบันทึกวันนัด...
        </div>
      ) : (
        "ยืนยันวันนัดประเมิน"
      )}
    </button>
  );
};

export default SubmitAppointment;
