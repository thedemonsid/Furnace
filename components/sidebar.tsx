import React from "react";
import {
  BookOpen,
  FileText,
  Folder,
  List,
  NotebookPen,
  Settings,
  LucideIcon,
} from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  key: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label }) => (
  <li className="text-gray-600 cursor-pointer text-sm flex items-center gap-2 py-1 rounded-md hover:bg-slate-50">
    <Icon className="w-4 h-4" />
    {label}
  </li>
);

const sidebarItems = [
  { key: "projects", icon: Folder, label: "Projects" },
  { key: "tasks", icon: List, label: "Tasks" },
  { key: "blogs", icon: BookOpen, label: "Blogs" },
  { key: "resources", icon: FileText, label: "Resources" },
  { key: "notes", icon: NotebookPen, label: "Notes" },
  { key: "settings", icon: Settings, label: "Settings" },
];

const Sidebar = () => {
  return (
    <aside className="min-w-48 bg-gray-100/5 py-8 px-4 border-r">
      <h1 className="font-mono font-bold mb-4 py-2 text-sm">
        <span className="py-4">Project Management</span>
      </h1>
      <ul className="space-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.key} icon={item.icon} label={item.label} />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
