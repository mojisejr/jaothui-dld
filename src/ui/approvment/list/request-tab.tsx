import { type RawRegisterData } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface RequestTabProps {
  waitList: RawRegisterData[];
}

const RequestTab = ({ waitList }: RequestTabProps) => {
  return (
    <div className="grid-col-1 grid h-full w-full gap-2 p-2">
      {waitList.length > 0 ? (
        <>
          {waitList.map((data) => (
            <div
              key={data.id}
              className="flex w-full items-center justify-between rounded-xl bg-base-200 p-4 shadow-sm"
            >
              <div className="text-sm">
                <p>ชื่อ: {`${data.firstname} ${data.lastname}`}</p>
                <p>ประเภท: {data.category}</p>
                <p>เบอร์ติดต่อ: {data.tel}</p>
              </div>
              <Link
                href={`/approvement/request/${data.id}`}
                className="btn btn-neutral btn-sm"
              >
                ดู
              </Link>
            </div>
          ))}
        </>
      ) : (
        <span>ไม่พบข้อมูล</span>
      )}

      <Link href="/admin-profile" className="btn btn-secondary">
        กลับหน้าหลัก
      </Link>
    </div>
  );
};

export default RequestTab;
