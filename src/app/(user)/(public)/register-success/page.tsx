import Image from "next/image";
import Link from "next/link";
import { getUserById } from "~/actions/user";

const Page = async ({ searchParams }: { searchParams: { id: string } }) => {
  const { id } = searchParams;
  const user = await getUserById(id);
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid grid-cols-1 place-items-center gap-2">
        <figure className="max-w-64">
          <Image src="/images/logo.png" width={1000} height={1000} alt="logo" />
        </figure>
        <div>
          <div className="text-xl font-bold">
            ยินดีต้อนรับคุณ {user?.firstname}
          </div>
          <div className="text-sm">กรุณาเข้าสู่ระบบเพื่อเริ่มรายการ</div>
        </div>
        <Link href="/login" className="btn btn-secondary">
          เข้าสู่ระบบ
        </Link>
      </div>
    </div>
  );
};

export default Page;
