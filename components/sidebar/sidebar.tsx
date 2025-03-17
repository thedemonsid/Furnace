"use client";
import {
  BookOpen,
  FileText,
  Folder,
  // Github,
  GithubIcon,
  List,
  // LogInIcon,
  NotebookPen,
  Settings,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "../ui/tooltip";
import { NavItem } from "./sidebar-item";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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

export function Sidebar() {
  const {
    data: session,
    isPending, //loading state
    // error, //error object
    // refetch, //refetch the session
  } = authClient.useSession();
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Reset error after 5 seconds
  useEffect(() => {
    if (authError) {
      const timer = setTimeout(() => {
        setAuthError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [authError]);

  const handleSignIn = async () => {
    try {
      setIsAuthenticating(true);
      setAuthError(null);

      // Simulate network delay for testing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      setAuthError("Authentication failed. Please try again.");
      console.error("Sign in error:", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsAuthenticating(true);

      // Simulate network delay for testing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/dashboard");
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="relative flex h-screen flex-col gap-4 bg-sidebar-background p-4 text-sidebar-foreground w-[60px] border pt-9">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <Image
          src="/favicon.ico"
          width={30}
          height={30}
          alt="Logo"
          className="h-5 w-5"
        />
      </div>
      {/* Navigation */}
      <TooltipProvider>
        <nav className="flex flex-col gap-y-1">
          {sidebarItems.map((item) => (
            <NavItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              href={item.href}
            />
          ))}
        </nav>
      </TooltipProvider>
      <Separator className="my-2 bg-sidebar-border" />

      {/* Auth section - show loading states for both initial load and during auth actions */}
      {(isPending || isAuthenticating) && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Show auth error if exists */}
      {authError && !isPending && !isAuthenticating && (
        <div className="absolute bottom-16 left-16 z-50 bg-destructive text-destructive-foreground px-3 py-2 rounded-md text-xs whitespace-nowrap">
          {authError}
        </div>
      )}

      {/* Show login button when not authenticated and not loading */}
      {!session && !isPending && !isAuthenticating && (
        <div className="flex items-center justify-center">
          <GithubIcon
            className="w-5 h-5 cursor-pointer hover:text-primary transition-colors"
            onClick={handleSignIn}
          />
        </div>
      )}

      {/* Show user avatar when authenticated and not loading */}
      {session && !isPending && !isAuthenticating && (
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={handleSignOut}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user.image || mockUser.avatar} />
            <AvatarFallback>
              {session.user.name?.slice(0, 2) || "US"}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
}
