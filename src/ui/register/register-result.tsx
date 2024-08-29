import React from "react";

const RegisterResult = () => {
  return (
    <>
      <div className="grid w-full grid-cols-1">
        <h1 className="text-2xl font-semibold">ยินดีต้อนรับ คุณxxx</h1>
        <h3 className="font-thin">กรุณาเข้าสูระบบเพื่อเริ่มรายการ</h3>
      </div>
      <div className="flex w-full flex-col items-center justify-center py-2">
        <button className="btn btn-secondary btn-sm min-w-[200px] rounded-full">
          เข้าสู่ระบบ
        </button>
      </div>
    </>
  );
};

export default RegisterResult;
