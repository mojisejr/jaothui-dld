"use client";
import Image from "next/image";
import RegisterForm from "~/ui/register/register-form";

export default function Page() {
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
        <RegisterForm />
      </div>
    </main>
  );
}
