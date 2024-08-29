import { redirect } from "next/navigation";
import React from "react";
import { getAdminInfo } from "~/actions/admin";
import { auth } from "~/auth";
import RequestForm from "~/ui/approvment/list/request-form/request-form";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  const user = session?.user;

  if (!user) redirect("/login");

  const info = await getAdminInfo(user.id!);

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">คำร้องสมัครสมาชิก</h1>
        <h2 className="text-xl font-semibold">
          เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์
        </h2>
      </div>
      <RequestForm
        requestId={params.id}
        adminId={user.id!}
        level={info?.AdminPosition?.level ?? "0"}
      />
      {/* <NewMemberForm userId={user.id as string} /> */}
    </>
  );
};

export default Page;
