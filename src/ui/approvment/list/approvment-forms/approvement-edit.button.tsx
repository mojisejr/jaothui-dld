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
      {pending ? "กำลังบันทึกการแก้ไข" : "บันทึกการแก้ไข"}
    </button>
  );
};

export default EditButton;
