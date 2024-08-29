import React from "react";
import Image from "next/image";

const ProfileNavBar = () => {
  return (
    <div className="flex items-center justify-evenly p-2">
      <figure className="w-10">
        <Image src="/images/logo.png" width={1000} height={1000} alt="logo" />
      </figure>
      <div className="text-xl font-bold">เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์</div>
    </div>
  );
};

export default ProfileNavBar;
