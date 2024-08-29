import { redirect } from "next/navigation";
import React from "react";
import { getUserById } from "~/actions/user";
import { auth } from "~/auth";
import NewMemberForm from "~/ui/new-member/new-member-form";

const Page = async () => {
  const session = await auth();

  const user = session?.user;

  if (!user) redirect("/login");

  const info = await getUserById(user.id!);

  if (info?.roleHash === process.env.ADMIN) redirect("/admin-profile");

  if (info?.RawRegisterData != null) redirect("/profile");

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">ลงทะเบียนสมัคร</h1>
        <h2 className="text-xl font-semibold">
          เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์
        </h2>
      </div>
      <NewMemberForm userId={user.id!} />
    </>
  );
};

export default Page;
