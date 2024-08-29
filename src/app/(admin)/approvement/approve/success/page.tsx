import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "~/auth";

const Page = async () => {
  const session = await auth();

  const user = session?.user;

  if (!user) redirect("/login");

  return (
    <div className="my-10 flex h-screen items-start justify-center">
      <div className="grid grid-cols-1 place-items-center gap-2">
        <div className="text-center">
          <div className="text-xl font-bold">
            ยืนยันการประเมินคำร้องสมัครสมาชิก
          </div>
          <div className="text-xl font-bold">
            เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์
          </div>
        </div>
        <div className="my-10 text-3xl font-bold">เรียบร้อยแล้ว</div>
        <Link href="/approvement/list" className="btn btn-secondary">
          หน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default Page;
