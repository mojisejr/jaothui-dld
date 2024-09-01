import { redirect } from "next/navigation";
import React from "react";
import { getAdminInfo } from "~/actions/admin";
import { getApprovementInfo } from "~/actions/approvment";
import { auth } from "~/auth";
import ApprovementFinalForm from "~/ui/approvment/list/approvment-forms/approvement-final-form";
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
  const approvementInfo = await getApprovementInfo(params.id);

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">คำร้องสมัครสมาชิก</h1>
        <h2 className="text-xl font-semibold">
          เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์
        </h2>
      </div>
      {approvementInfo?.MemberApprovement == null ? (
        <>
          {step == 0 && approvementInfo?.MemberApprovement == null ? (
            <ApprovementForm1
              approvementInfo={approvementInfo!}
              adminId={user.id!}
              level={info?.AdminPosition?.level ?? "0"}
            />
          ) : null}
          {step == 1 && approvementInfo?.MemberApprovement == null ? (
            <ApprovementForm2
              approvementInfo={approvementInfo!}
              adminId={user.id!}
              level={info?.AdminPosition?.level ?? "0"}
            />
          ) : null}
        </>
      ) : (
        <ApprovementFinalForm
          approvementInfo={approvementInfo}
          adminId={user.id!}
          level={info?.AdminPosition?.level ?? "0"}
        />
      )}
    </>
  );
};

export default Page;
