import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "สำนักงานพัฒนาพันธุ์สัตว์",
  description: "ระบบการรับสมัครสมาชิกออนไลน์เครือข่ายสัตว์พันธุ์ดีกรมปศุสัตว์",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-theme="bumblebee" lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
