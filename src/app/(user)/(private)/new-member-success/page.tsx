import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "~/auth";

const Page = async ({ searchParams }: { searchParams: { name: string } }) => {
  const { name } = searchParams;
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
          <div className="text-xl font-bold">
            สวัสดีคุณ {name} ลงทะเบียนเรียบร้อย
          </div>
          <div className="text-sm">ข้อมูลของท่านอยู่ระหว่างตรวจสอบ</div>
        </div>
        <div className="btn btn-secondary rounded-full">อยู่ระหว่างตรวจสอบ</div>
        <Link href="/login" className="btn btn-secondary">
          ไปที่หน้าโปรไฟล์
        </Link>
      </div>
    </div>
  );
};

export default Page;
