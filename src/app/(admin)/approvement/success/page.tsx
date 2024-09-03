import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "~/auth";

const Page = async ({
  searchParams,
}: {
  searchParams: { type: string; id?: string; userId?: string };
}) => {
  const { type, id } = searchParams;
  let title = "";

  if (type == "edit") {
    title = "แก้ไขข้อมูลเรียบร้อยแล้ว";
  } else if (type == "approved") {
    title = "ยืนยันการประเมินเรียบร้อยแล้ว";
  } else if (type == "accept") {
    title = "อนุมัติเรียบร้อยแล้ว";
  } else if (type == "appointed") {
    title = "นัดหมายเรียบร้อยแล้ว";
  }

  const session = await auth();

  const user = session?.user;

  if (!user) redirect("/login");

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid grid-cols-1 place-items-center gap-2">
        <figure className="max-w-64">
          <Image src="/images/logo.png" width={1000} height={1000} alt="logo" />
        </figure>
        <div>
          <div className="text-xl font-bold">{title}</div>
          {/* <div className="text-sm">
            {searchParams.userId ? searchParams.userId : null}
          </div> */}
        </div>
        <Link
          href={`/approvement/approve/${id}?step=0`}
          className="btn btn-secondary"
        >
          กลับ
        </Link>
      </div>
    </div>
  );
};

export default Page;
