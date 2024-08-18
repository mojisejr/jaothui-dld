import Link from "next/link";
import React from "react";

const RegisterForm = () => {
  return (
    <>
      <div className="grid w-full grid-cols-1 place-items-center">
        <h1 className="text-2xl font-semibold">สร้างบัญชี</h1>
      </div>
      <form className="grid w-full grid-cols-1 gap-2">
        <input
          className="input input-bordered input-sm rounded-2xl"
          type="text"
          placeholder="ชื่อ"
        ></input>
        <input
          className="input input-bordered input-sm rounded-2xl"
          type="text"
          placeholder="นามสกุล"
        ></input>
        <input
          className="input input-bordered input-sm rounded-2xl"
          type="text"
          placeholder="หมายเลขโทรศัพท์"
        ></input>
        <input
          className="input input-bordered input-sm rounded-2xl"
          type="password"
          placeholder="รหัสผ่าน 6 หลัก"
        ></input>
        <input
          className="input input-bordered input-sm rounded-2xl"
          type="password"
          placeholder="ยืนยันรหัสผ่าน 6 หลัก"
        ></input>

        <div className="flex w-full flex-col items-center justify-center py-2">
          <button className="btn btn-secondary btn-sm min-w-[200px] rounded-full">
            สร้างบัญชี
          </button>
        </div>
        <div className="flex w-full justify-center gap-2 py-2 text-xs text-slate-500">
          <span>มีบัญชี? </span>
          <Link href="#">เข้าสู่ระบบ</Link>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
