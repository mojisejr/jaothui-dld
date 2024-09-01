"use client";
import Link from "next/link";
import React from "react";
import { createNewMember } from "~/actions/new-user";
import RegisterSubmitButton from "./register-submit-button";

const RegisterForm = () => {
  return (
    <>
      <div className="grid w-full grid-cols-1 place-items-center">
        <h1 className="text-2xl font-semibold">สร้างบัญชี</h1>
      </div>
      <form
        action={createNewMember}
        className="grid w-full max-w-md grid-cols-1 gap-2"
      >
        <input
          className="input input-sm input-bordered rounded-2xl"
          name="firstname"
          type="text"
          placeholder="ชื่อ"
          required
        ></input>
        <input
          className="input input-sm input-bordered rounded-2xl"
          name="lastname"
          type="text"
          placeholder="นามสกุล"
          required
        ></input>
        <input
          className="input input-sm input-bordered rounded-2xl"
          name="username"
          type="number"
          maxLength={10}
          placeholder="หมายเลขโทรศัพท์"
          required
        ></input>
        <input
          className="input input-sm input-bordered rounded-2xl"
          name="password"
          type="password"
          placeholder="รหัสผ่าน 6 หลัก"
          required
        ></input>
        <input
          className="input input-sm input-bordered rounded-2xl"
          name="confirmPassword"
          type="password"
          placeholder="ยืนยันรหัสผ่าน 6 หลัก"
          required
        ></input>

        <div className="flex w-full flex-col items-center justify-center py-2">
          <RegisterSubmitButton />
        </div>
        <div className="flex w-full justify-center gap-2 py-2 text-xs text-slate-500">
          <span>มีบัญชี? </span>
          <Link href="/login">เข้าสู่ระบบ</Link>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
