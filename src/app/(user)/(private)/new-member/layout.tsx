import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen flex-col gap-4 overflow-y-scroll p-4">
      {children}
    </div>
  );
};

export default Layout;
