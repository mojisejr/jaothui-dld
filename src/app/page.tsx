import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-y-auto">
      <div className="flex h-screen flex-col items-center justify-between gap-4 p-6">
        <div className="grid grid-cols-1 gap-10">
          <figure className="max-w-64">
            <Image
              src="/images/logo.png"
              width={1000}
              height={1000}
              alt="dld-logo"
            />
          </figure>
          <div className="grid grid-cols-1 gap-6">
            <div className="w-full">
              <h1 className="text-2xl font-semibold">
                สำนักงานพัฒนาพันธุ์สัตว์
              </h1>
              <h3 className="text-2xl font-thin">กรมปศุสัตว์</h3>
            </div>
            <div className="w-full text-sm font-thin">
              <p>ยินตีต้อนรับเข้าสู่ รบบการรับสมัครสมาชิกออนไลน์</p>
              <p>เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์</p>
            </div>
          </div>
        </div>
        <Link
          href="/auth"
          className="btn btn-secondary btn-sm min-w-[200px] rounded-full"
        >
          เข้าสู่ระบบ
        </Link>
      </div>
    </main>
  );
}
