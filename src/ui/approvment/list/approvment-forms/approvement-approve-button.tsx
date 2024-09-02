import React from "react";
import { useFormStatus } from "react-dom";

const ApprovementConfirmButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="btn btn-success rounded-full text-white shadow-xl"
    >
      {pending ? (
        <div className="flex items-center">
          <div className="loading loading-spinner"></div>
          กำลังบันทึกข้อมูล...
        </div>
      ) : (
        "ยืนยันการประเมิณ"
      )}
    </button>
  );
};

export default ApprovementConfirmButton;
