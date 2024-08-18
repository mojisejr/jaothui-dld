import React from "react";
import NewMemberForm from "~/ui/new-member/new-member-form";

const Page = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">ลงทะเบียนสมัคร</h1>
        <h2 className="text-xl font-semibold">
          เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์
        </h2>
      </div>
      <NewMemberForm />
    </>
  );
};

export default Page;
