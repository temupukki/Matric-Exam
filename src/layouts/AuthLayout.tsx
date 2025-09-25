// src/layouts/AuthLayout.tsx
import React from "react";
import { Toaster } from "sonner";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      <div>
        {children}
        <Toaster/>
      </div>
    </div>
  );
}
