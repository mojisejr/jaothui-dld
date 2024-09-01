"use client";
import React, { useState } from "react";
import RequestTab from "./request-tab";
import AppointTab from "./appoint-tab";
import { type RawRegisterData } from "@prisma/client";
import { RawRegisterDataWithMemberApprovement } from "~/interfaces/raw-register-data";

interface ApprovementContainerProps {
  waitList: RawRegisterDataWithMemberApprovement[];
  appointedList: RawRegisterDataWithMemberApprovement[];
  completedList: RawRegisterDataWithMemberApprovement[];
}

const ApprovementContainer = ({
  waitList,
  appointedList,
  completedList,
}: ApprovementContainerProps) => {
  const [tab, setTab] = useState<number>(0);

  return (
    <div className="grid-col-2 grid w-full gap-4 p-4">
      <div className="w-full">
        <div className="text-xl">
          <div role="tablist" className="tabs tabs-bordered">
            <button
              onClick={() => setTab(0)}
              role="tab"
              className={`tab ${tab == 0 ? "tab-active" : ""}`}
            >
              คำร้องสมัครสมาชิก
            </button>
            <button
              onClick={() => setTab(1)}
              role="tab"
              className={`tab ${tab == 1 ? "tab-active" : ""}`}
            >
              นัดอนุมัติคำร้อง
            </button>
          </div>
        </div>
      </div>
      {tab == 0 ? <RequestTab waitList={waitList} /> : null}
      {tab == 1 ? <AppointTab appointedList={appointedList} /> : null}
      {/* <div className="grid-col-1 grid w-full place-items-center gap-4 rounded-2xl bg-base-200 p-4 shadow-sm"></div> */}
    </div>
  );
};

export default ApprovementContainer;
