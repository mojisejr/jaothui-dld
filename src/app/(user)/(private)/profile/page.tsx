import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "~/auth";
import { getUserById } from "~/actions/user";
import { logout } from "~/actions/logout";
import { getApprovementInfo } from "~/actions/approvment";

const Page = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/login");

  const info = await getUserById(user.id!);
  const approvment = await getApprovementInfo(user.id!);

  if (info?.roleHash === process.env.ADMIN) redirect("/admin-profile");

  if (info?.RawRegisterData == null) redirect("/new-member");

  return (
    <div className="w-full max-w-md rounded-2xl bg-base-100 text-base-content">
      <div className="grid-col-2 grid gap-4 p-4">
        <div className="w-full">
          <div className="text-xl">
            สวัสดี! {`${info.firstname} ${info.lastname}`}
          </div>
          <div className="border-b-[2px] border-[#A57C52] pt-2"></div>
        </div>
        <div className="grid-col-1 grid w-full place-items-center gap-4 rounded-2xl bg-base-200 p-4 shadow-sm">
          <div className="flex flex-col items-center gap-2">
            <figure className="max-w-48">
              <Image
                src="/images/mock/profile-mock.png"
                width={1000}
                height={760}
                alt="profile-image"
              />
            </figure>
            <p className="text-xl font-semibold">
              {approvment?.MemberApprovement == null ? (
                <span className="text-error">รอเข้าประเมิณ</span>
              ) : (
                <>
                  {approvment.MemberApprovement.managementApproved == null ? (
                    <span className="text-info">รออนุมัติ</span>
                  ) : (
                    <span className="text-success">อนุมัติเรียบร้อย</span>
                  )}
                </>
              )}
            </p>
          </div>
          <div className="flex-start flex w-full flex-col px-2">
            <div className="text-xl">
              ชื่อฟาร์ม : {info.RawRegisterData.farmName}
            </div>
            <div>ชนิดสัตว์ : {info.RawRegisterData.animalType}</div>
            <div>ประเภท : {info.RawRegisterData.category}</div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center justify-between rounded-2xl bg-base-100 px-4 py-2 shadow-sm">
              <div>
                <h2 className="font-bold">ใบขอปรับเปลี่ยนประเภท</h2>
                <h3 className="text-xs">เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์</h3>
              </div>
              <button className="btn-base-300 btn btn-sm rounded-full">
                คลิก
              </button>
            </div>
            <div className="flex w-full items-center justify-between rounded-2xl bg-base-100 px-4 py-2 shadow-sm">
              <div>
                <h2 className="font-bold">ใบขอยกเลิกการเป็นสมาชิก</h2>
                <h3 className="text-xs">เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์</h3>
              </div>
              <button className="btn-base-300 btn btn-sm rounded-full">
                คลิก
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center pb-2">
        <form action={logout}>
          <button type="submit" className="btn btn-ghost rounded-full text-xl">
            ออกจากระบบ
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
