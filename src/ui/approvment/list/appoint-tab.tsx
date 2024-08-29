import Link from "next/link";
import React from "react";
import dayjs from "dayjs";
import { RawRegisterData } from "@prisma/client";

interface AppointTabProps {
  appointedList: RawRegisterData[];
}

const AppointTab = ({ appointedList }: AppointTabProps) => {
  return (
    <div className="grid-col-1 grid h-full w-full gap-2 p-2">
      {appointedList.length > 0 ? (
        <>
          {appointedList.map((data) => (
            <div
              key={data.id}
              className="grid w-full grid-cols-1 rounded-xl bg-base-200 p-4 shadow-sm"
            >
              <div className="flex w-full items-center justify-between">
                <div className="text-sm">
                  <p>ชื่อ: {`${data.firstname} ${data.lastname}`}</p>
                  <p>ประเภท: {data.category}</p>
                  <p>เบอร์ติดต่อ: {data.tel}</p>
                </div>
                <Link
                  href={`/approvement/approve/${data.id}?step=0`}
                  className="btn btn-neutral btn-sm"
                >
                  คลิก
                </Link>
              </div>
              <div className="w-full text-center font-bold text-error">
                นัดวันประเมิน{" "}
                {dayjs(data.appointment?.toISOString()).format("DD/MM/YYYY")}
              </div>
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

export default AppointTab;
