import {
  BookOpen,
  FileText,
  Folder,
  List,
  NotebookPen,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarItem } from "./sidebar-item";

const sidebarItems = [
  {
    key: "projects",
    icon: <Folder className="w-4 h-4" />,
    label: "Projects",
    href: "/dashboard/projects",
  },
  {
    key: "tasks",
    icon: <List className="w-4 h-4" />,
    label: "Tasks",
    href: "/dashboard/tasks",
  },
  {
    key: "blogs",
    icon: <BookOpen className="w-4 h-4" />,
    label: "Blogs",
    href: "/dashboard/blogs",
  },
  {
    key: "resources",
    icon: <FileText className="w-4 h-4" />,
    label: "Resources",
    href: "/dashboard/resources",
  },
  {
    key: "notes",
    icon: <NotebookPen className="w-4 h-4" />,
    label: "Notes",
    href: "/dashboard/notes",
  },
  {
    key: "settings",
    icon: <Settings className="w-4 h-4" />,
    label: "Settings",
    href: "/dashboard/settings",
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
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 px-1 py-1.5 mb-4 text-sm cursor-pointer">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
            <AvatarFallback className="rounded-lg">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 grid text-left font-sans">
            <span className="font-semibold">{mockUser.name}</span>
            <span className="text-xs">{mockUser.email}</span>
          </div>
        </div>
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <SidebarItem key={item.key} label={item.label} href={item.href}>
              {item.icon}
            </SidebarItem>
          ))}
        </ul>
      </div>
      <div>
        <SidebarItem
          key="logout"
          label="Logout"
          color="text-red-600 text-md"
          href="/logout"
        >
          <LogOut className="w-5 h-5" />
        </SidebarItem>
      </div>
    </aside>
  );
};

export default Sidebar;
