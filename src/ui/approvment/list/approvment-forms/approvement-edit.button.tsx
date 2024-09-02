import React from "react";
import { useFormStatus } from "react-dom";

const EditButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="btn btn-secondary rounded-full"
    >
      {pending ? (
        <div className="flex items-center">
          <div className="loading loading-spinner"></div>
          กำลังบันทึกการแก้ไข...
        </div>
      ) : (
        "บันทึกการแก้ไข"
      )}
    </button>
  );
};

export default EditButton;
