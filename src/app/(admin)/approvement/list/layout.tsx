import React from "react";
import ProfileNavBar from "~/ui/profile/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen flex-col gap-4 overflow-y-scroll bg-[#414141] p-4 text-white md:items-center">
      <ProfileNavBar />
      {children}
    </div>
  );
};

export default Layout;
