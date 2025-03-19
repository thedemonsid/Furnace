"use client";
import {
  BookOpen,
  FileText,
  Folder,
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
import { ModeToggle } from "../mode-toggle";

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
          src="/logo.jpeg"
          width={30}
          height={30}
          alt="Logo"
          className="h-5 w-5 rounded-full"
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
          <button
            onClick={handleSignIn}
            className="cursor-pointer hover:text-primary transition-colors"
            aria-label="Sign in with GitHub"
          >
            <span className="dark:hidden">
              <GithubIconLight />
            </span>
            <span className="hidden dark:block">
              <GithubIconDark />
            </span>
          </button>
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
      <div className="text-left pr-3">
        {" "}
        <ModeToggle></ModeToggle>{" "}
        {/** //Todo: Hydration warning + Allignment */}
      </div>
    </div>
  );
}

const GithubIconLight = () => {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#000000">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
};
const GithubIconDark = () => {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#ffffff">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
};
