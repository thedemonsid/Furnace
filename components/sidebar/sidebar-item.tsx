"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export function NavItem({ icon, label, href }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={href}>
          <Button
            variant="ghost"
            className={cn(
              "flex justify-center w-full items-center  gap-2 p-2 text-sidebar-foreground hover:text-sidebar-accent-foreground",
              {
                "bg-sidebar-accent text-sidebar-accent-foreground": isActive,
              }
            )}
          >
            {icon}
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        className="text-primary bg-primary-foreground p-2 rounded-md"
      >
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
