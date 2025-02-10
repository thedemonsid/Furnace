"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  label: string;
  key: string;
  color?: string;
  children: React.ReactNode;
  href: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  color,
  children,
  href,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href;

  const handleClick = () => {
    router.push(href);
  };

  return (
    <li
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 py-1 px-2 text-sm cursor-pointer rounded-md transition-colors duration-200",
        color ? color : "text-gray-600",
        isActive ? "text-black bg-slate-50" : "hover:text-black"
      )}
    >
      {children}
      {label}
    </li>
  );
};
