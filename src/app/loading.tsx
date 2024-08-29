import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid grid-cols-1 place-items-center gap-2">
        <figure className="max-w-64">
          <Image src="/images/logo.png" width={1000} height={1000} alt="logo" />
        </figure>
        <div>
          <div className="text-xl font-bold">กำลังโหลด..</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
