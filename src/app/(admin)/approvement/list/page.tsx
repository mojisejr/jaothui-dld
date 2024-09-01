import React from "react";
import { redirect } from "next/navigation";
import { auth } from "~/auth";
import { logout } from "~/actions/logout";
import { getAdminInfo } from "~/actions/admin";
import ApprovementContainer from "~/ui/approvment/list/continer";
import {
  getAppointedListForAll,
  getAppointedListForProvinceAdmin,
  getCompletedListAll,
  getCompletedListOf,
  getWaitForApprovementListForProvinceAdmin,
  getWaitForApprovmentListForAll,
} from "~/actions/approvment";
import { type RawRegisterData } from "@prisma/client";
import { RawRegisterDataWithMemberApprovement } from "~/interfaces/raw-register-data";

const Page = async () => {
  const session = await auth();
  const user = session?.user;
  let waitList: RawRegisterDataWithMemberApprovement[] = [];
  let appointedList: RawRegisterDataWithMemberApprovement[] = [];
  let completedList: RawRegisterDataWithMemberApprovement[] = [];

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

    completedList = await getCompletedListOf(info?.AdminPosition.province);
  }

  if (info?.AdminPosition?.level == "2" || info?.AdminPosition?.level == "3") {
    waitList = await getWaitForApprovmentListForAll();
    appointedList = await getAppointedListForAll();
    completedList = await getCompletedListAll();
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between overflow-y-auto rounded-2xl bg-base-100 text-base-content md:max-w-md">
      <ApprovementContainer
        appointedList={appointedList}
        waitList={waitList}
        completedList={completedList}
      />
      <form action={logout} className="my-3">
        <button type="submit" className="btn btn-ghost rounded-full text-xl">
          ออกจากระบบ
        </button>
      </form>
    </div>
  );
};

export default Page;
