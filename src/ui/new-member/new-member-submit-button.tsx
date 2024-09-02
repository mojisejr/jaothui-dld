import { useFormStatus } from "react-dom";

const SubmitNewUser = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-secondary rounded-full shadow-xl"
    >
      {pending ? (
        <div className="flex items-center">
          <div className="loading loading-spinner"></div>
          กำลังบันทึก...
        </div>
      ) : (
        <span>ยืนยันการลงทะเบียน</span>
      )}
    </button>
  );
};

export default SubmitNewUser;
