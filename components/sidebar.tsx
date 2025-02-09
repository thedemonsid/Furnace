import React from "react";
import {
  BookOpen,
  FileText,
  Folder,
  List,
  NotebookPen,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  label: string;
  key: string;
  color?: string;
  children: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  color,
  children,
}) => (
  <li
    className={cn(
      "flex items-center gap-2 py-1 px-2 text-sm cursor-pointer rounded-md transition-colors duration-200",
      color ? color : "text-gray-600"
    )}
  >
    {children}
    {label}
  </li>
);

const sidebarItems = [
    {
        key: "projects",
        icon: (
            <div className="animate-in">
                <Folder className="w-4 h-4" />
            </div>
        ),
        label: "Projects",
    },
    {
        key: "tasks",
        icon: (
            <div className="animate-in">
                <List className="w-4 h-4" />
            </div>
        ),
        label: "Tasks",
    },
    {
        key: "blogs",
        icon: (
            <div className="animate-in">
                <BookOpen className="w-4 h-4" />
            </div>
        ),
        label: "Blogs",
    },
    {
        key: "resources",
        icon: (
            <div className="animate-in">
                <FileText className="w-4 h-4" />
            </div>
        ),
        label: "Resources",
    },
    {
        key: "notes",
        icon: (
            <div className="animate-in">
                <NotebookPen className="w-4 h-4" />
            </div>
        ),
        label: "Notes",
    },
    {
        key: "settings",
        icon: (
            <div className="animate-in">
                <Settings className="w-4 h-4" />
            </div>
        ),
        label: "Settings",
    },
];

const mockUser = {
  name: "Siddhesh Shrirame",
  email: "siddheshshrirame@gmail.com",
  avatar: "https://avatars.githubusercontent.com/u/128967580?v=4",
};

const Sidebar = () => {
  return (
    <aside className="flex flex-col justify-between min-w-56 py-8 px-2 border-r bg-gray-100/5">
      <div>
        <div className="flex items-center gap-2 px-1 py-1.5 mb-4 text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
            <AvatarFallback className="rounded-lg">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 grid text-left leading-tight">
            <span className="truncate font-semibold">{mockUser.name}</span>
            <span className="truncate text-xs">{mockUser.email}</span>
          </div>
        </div>
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <SidebarItem key={item.key} label={item.label}>
              {item.icon}
            </SidebarItem>
          ))}
        </ul>
      </div>
      <div>
        <SidebarItem key="logout" label="Logout" color="text-red-600">
          <LogOut className="w-4 h-4" />
        </SidebarItem>
      </div>
    </aside>
  );
};

export default Sidebar;
