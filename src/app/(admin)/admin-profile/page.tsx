import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "~/auth";
import { logout } from "~/actions/logout";
import { getAdminInfo } from "~/actions/admin";
import { getCompletedCount, getRequestCount } from "~/actions/approvment";
import Link from "next/link";

const Page = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/login");

  const info = await getAdminInfo(user.id!);

  // if (user.role != process.env.ADMIN || info?.AdminPosition == null)
  //   redirect("/profile");

  const requestCount = await getRequestCount(
    info?.AdminPosition?.level ?? "0",
    info?.AdminPosition?.province ?? "",
  );

  const completedCount = await getCompletedCount(
    info?.AdminPosition?.level ?? "0",
    info?.AdminPosition?.province ?? "",
  );

  // if (info?.AdminPosition?.level == "1") {
  //   waitList = await getWaitForApprovementListForProvinceAdmin(
  //     info?.AdminPosition.province,
  //   );
  // }

  // if (info?.AdminPosition?.level == "2" || info?.AdminPosition?.level == "3") {
  //   waitList = await getWaitForApprovmentListForAll();
  // }

  return (
    <div className="w-full max-w-md rounded-2xl bg-base-100 text-base-content">
      <div className="grid-col-2 grid gap-4 p-4">
        <div className="w-full">
          <div className="text-xl">
            สวัสดี! {`${info?.firstname} ${info?.lastname}`}
          </div>
          <div className="border-b-[2px] border-[#A57C52] pt-2"></div>
        </div>
        <div className="grid-col-1 grid w-full place-items-center gap-4 rounded-2xl bg-base-200 p-4 shadow-sm">
          <div className="flex flex-col items-center gap-2">
            <figure className="max-w-48">
              <Image
                src="/images/mock/admin-profile-mock.png"
                width={1000}
                height={760}
                alt="profile-image"
              />
            </figure>
          </div>
          <div className="flex-start flex w-full flex-col px-2">
            <div>ชื่อ : {`${info?.firstname} ${info?.lastname}`}</div>
            <div>
              ตำแหน่ง : {info?.AdminPosition?.title}
              {info?.AdminPosition?.province}
            </div>
            <div>เบอร์ติดต่อ : {`0${info?.username}`}</div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center justify-between rounded-2xl bg-base-100 px-4 py-2 shadow-sm">
              <div>
                <h2 className="font-bold">คำร้องสมัครสมาชิก</h2>
                <h3 className="text-xs">เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์</h3>
              </div>
              <Link
                href="/approvement/list"
                className="btn-base-300 btn btn-sm rounded-full"
              >
                {requestCount}
              </Link>
            </div>
            <div className="flex w-full items-center justify-between rounded-2xl bg-base-100 px-4 py-2 shadow-sm">
              <div>
                <h2 className="font-bold">สมาชิกเครือข่ายฟาร์มพันธุ์ดี</h2>
                <h3 className="text-xs">เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์</h3>
              </div>
              <button className="btn-base-300 btn btn-sm rounded-full">
                {completedCount}
              </button>
            </div>
            <div className="flex w-full items-center justify-between rounded-2xl bg-base-100 px-4 py-2 shadow-sm">
              <div>
                <h2 className="font-bold">คำร้องขอปรับเปลี่ยนประเภท</h2>
                <h3 className="text-xs">เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์</h3>
              </div>
              <button className="btn-base-300 btn btn-sm rounded-full">
                0
              </button>
            </div>
          </div>
          <div className="flex w-full items-center justify-between rounded-2xl bg-base-100 px-4 py-2 shadow-sm">
            <div>
              <h2 className="font-bold">คำร้องยกเลิกการเป็นสมาชิก</h2>
              <h3 className="text-xs">เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์</h3>
            </div>
            <button className="btn-base-300 btn btn-sm rounded-full">0</button>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center pb-2">
        <form action={logout}>
          <button type="submit" className="btn btn-ghost text-xl">
            ออกจากระบบ
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
