import React from "react";
import { redirect } from "next/navigation";
import { auth } from "~/auth";
import { logout } from "~/actions/logout";
import { getAdminInfo } from "~/actions/admin";
import ApprovementContainer from "~/ui/approvment/list/continer";
import {
  getAppointedListForAll,
  getAppointedListForProvinceAdmin,
  getWaitForApprovementListForProvinceAdmin,
  getWaitForApprovmentListForAll,
} from "~/actions/approvment";
import { type RawRegisterData } from "@prisma/client";

const Page = async () => {
  const session = await auth();
  const user = session?.user;
  let waitList: RawRegisterData[] = [];
  let appointedList: RawRegisterData[] = [];

  if (!user) redirect("/login");

  const info = await getAdminInfo(user.id!);

  if (user.role != process.env.ADMIN || info?.AdminPosition == null)
    redirect("/profile");

  if (info?.AdminPosition?.level == "1") {
    waitList = await getWaitForApprovementListForProvinceAdmin(
      info?.AdminPosition.province,
    );
    appointedList = await getAppointedListForProvinceAdmin(
      info?.AdminPosition.province,
    );
  }

  if (info?.AdminPosition?.level == "2" || info?.AdminPosition?.level == "3") {
    waitList = await getWaitForApprovmentListForAll();
    appointedList = await getAppointedListForAll();
  }

  return (
    <div className="overflow-y-auto` flex h-screen w-full flex-col items-center justify-between rounded-2xl bg-base-100 text-base-content">
      <ApprovementContainer appointedList={appointedList} waitList={waitList} />
      <form action={logout}>
        <button type="submit" className="btn btn-ghost text-xl">
          ออกจากระบบ
        </button>
      </form>
    </div>
  );
};

export default Page;
