"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid grid-cols-1 place-items-center gap-2">
        <figure className="max-w-64">
          <Image src="/images/logo.png" width={1000} height={1000} alt="logo" />
        </figure>
        <div className="text-xl font-bold">ไม่สามารถบันทึกข้อมูลสมาชิกได้</div>
        <button className="btn btn-error" onClick={reset}>
          ลองอีกครั้ง
        </button>
      </div>
    </div>
  );
};

export default Error;
