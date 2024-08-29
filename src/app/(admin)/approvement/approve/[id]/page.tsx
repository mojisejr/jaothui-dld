import { redirect } from "next/navigation";
import React from "react";
import { getAdminInfo } from "~/actions/admin";
import { getApprovementInfoOf } from "~/actions/approvment";
import { auth } from "~/auth";
import ApprovementForm1 from "~/ui/approvment/list/approvment-forms/approvement-form-1";
import ApprovementForm2 from "~/ui/approvment/list/approvment-forms/approvement-form-2";

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { step: number };
}) => {
  const { step } = searchParams;
  const session = await auth();

  const user = session?.user;

  if (!user) redirect("/login");

  const info = await getAdminInfo(user.id!);
  const approvementInfo = await getApprovementInfoOf(params.id);

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">คำร้องสมัครสมาชิก</h1>
        <h2 className="text-xl font-semibold">
          เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์
        </h2>
      </div>
      {step == 0 ? (
        <ApprovementForm1
          approvementInfo={approvementInfo!}
          adminId={user.id!}
          level={info?.AdminPosition?.level ?? "0"}
        />
      ) : null}
      {step == 1 ? (
        <ApprovementForm2
          approvementInfo={approvementInfo!}
          adminId={user.id!}
          level={info?.AdminPosition?.level ?? "0"}
        />
      ) : null}
      {step == 2 ? (
        <ApprovementForm2
          approvementInfo={approvementInfo!}
          adminId={user.id!}
          level={info?.AdminPosition?.level ?? "0"}
        />
      ) : null}
    </>
  );
};

export default Page;
