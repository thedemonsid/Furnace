"use client";

import * as React from "react";
import {
  BookOpen,
  ChevronRight,
  FileText,
  Folder,
  List,
  NotebookPen,
  PanelLeft,
  PanelLeftClose,
  Settings,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  className?: string;
}

const sidebarItems = [
  {
    key: "projects",
    icon: <Folder className="w-5 h-5" />,
    label: "Projects",
    href: "/dashboard/projects",
  },
  {
    key: "tasks",
    icon: <List className="w-5 h-5" />,
    label: "Tasks",
    href: "/dashboard/tasks",
  },
  {
    key: "blogs",
    icon: <BookOpen className="w-5 h-5" />,
    label: "Blogs",
    href: "/dashboard/blogs",
  },
  {
    key: "resources",
    icon: <FileText className="w-5 h-5" />,
    label: "Resources",
    href: "/dashboard/resources",
  },
  {
    key: "notes",
    icon: <NotebookPen className="w-5 h-5" />,
    label: "Notes",
    href: "/dashboard/notes",
  },
  {
    key: "settings",
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
    href: "/dashboard/settings",
  },
];

const mockUser = {
  name: "Siddhesh Shrirame",
  email: "siddheshshrirame@gmail.com",
  avatar: "https://avatars.githubusercontent.com/u/128967580?v=4",
};

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className="relative flex h-screen flex-col gap-4 bg-sidebar-background p-4 text-sidebar-foreground w-[60px]">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <img src="/favicon.ico" alt="Logo" className="h-5 w-5" />
      </div>
      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {sidebarItems.map((item) => (
          <NavItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </nav>
      <Separator className="my-2 bg-sidebar-border" />

      {/* User Profile */}
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={mockUser.avatar} />
          <AvatarFallback>TD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

function NavItem({ icon, label, href }: NavItemProps) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={`flex w-full items-center justify-start gap-2 px-2 py-2 text-sidebar-foreground hover:text-sidebar-accent-foreground`}
      >
        {icon}
      </Button>
    </Link>
  );
}
