import Image from "next/image";
import Link from "next/link";
import { auth } from "~/auth";
import { login } from "~/actions/login";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  const user = session?.user;

  if (user) redirect("/new-member");

  return (
    <main className="min-h-screen w-full overflow-y-auto">
      <div className="flex h-screen flex-col items-center gap-4 p-6">
        <figure className="max-w-64">
          <Image
            src="/images/logo.png"
            width={1000}
            height={1000}
            alt="dld-logo"
          />
        </figure>
        <div className="grid w-full grid-cols-1 place-items-center">
          <h1 className="text-2xl font-semibold">ยินดีต้อนรับ</h1>
          <h3 className="font-thin">โปรดเข้าสู่ระบบ</h3>
        </div>
        <form action={login} className="grid w-full grid-cols-1 gap-2">
          <input
            className="input input-sm input-bordered rounded-2xl"
            name="username"
            type="number"
            maxLength={10}
            placeholder="หมายเลขโทรศัพท์"
            required
          ></input>
          <input
            className="input input-sm input-bordered rounded-2xl"
            name="password"
            type="password"
            placeholder="รหัสผ่าน"
            required
          ></input>
          <div className="flex w-full justify-center py-2 text-xs text-slate-500">
            <Link href="">ลืมรหัสผ่าน ?</Link>
          </div>
          <div className="flex w-full flex-col items-center justify-center py-2">
            <button className="btn btn-secondary btn-sm min-w-[200px] rounded-full">
              เข้าสู่ระบบ
            </button>
          </div>
          <div className="flex w-full justify-center gap-2 py-2 text-xs text-slate-500">
            <span>ยังไม่มีบัญชี? </span>
            <Link href="/register">สร้างบัญชี</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
