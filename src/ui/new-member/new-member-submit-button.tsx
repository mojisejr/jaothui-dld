import { useFormStatus } from "react-dom";

const SubmitNewUser = () => {
  const { pending } = useFormStatus();
  console.log(pending);
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-secondary rounded-full shadow-xl"
    >
      {!pending ? <span>ยืนยันการลงทะเบียน</span> : <span>กำลังบันทึก...</span>}
    </button>
  );
};

export default SubmitNewUser;
