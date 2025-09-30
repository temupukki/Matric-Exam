
import React from "react";
import { Toaster } from "sonner";
import DashNavbar from "../components/DashNavbar";
import DashFooter from "../components/DashFooter";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function DashLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <DashNavbar />
      <main className="flex-1">{children}</main>
      <Toaster/>
      <DashFooter/>
    </div>
  );
}
