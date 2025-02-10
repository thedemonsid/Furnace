import { Ellipsis, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
function Menu({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="pr-4 ml-8">
        <DropdownMenuItem className="font-mono text-xs font-semibold opacity-75 focus:text-green-500 focus:bg-white focus:opacity-100">
          Edit Column
        </DropdownMenuItem>
        <DropdownMenuItem className="font-mono text-xs font-semibold opacity-75 focus:text-green-500 focus:bg-white focus:opacity-100">
          Add Column
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-mono text-xs font-semibold opacity-75 focus:text-red-500 focus:bg-white focus:opacity-100">
          Delete Column
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export function Column({
  stage,
  index,
  projects,
}: {
  stage: { name: string; color: string; dotColor: string };
  index: number;
  projects: { name: string; description: string }[];
}) {
  return (
    <div key={index} className="p-4 min-w-72 flex flex-col gap-4">
      <div className="flex justify-start gap-2 items-center mb-4">
        <h2
          className={cn(
            "font-mono px-2 py-1 rounded-md flex justify-start items-center gap-1 text-sm w-3/4 cursor-move",
            stage.color
          )}
        >
          <span className="relative flex w-3 h-3">
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full",
                stage.dotColor,
                "opacity-75"
              )}
            ></span>
            <span
              className={cn(
                "relative inline-flex w-3 h-3 rounded-full",
                stage.dotColor
              )}
            ></span>
          </span>
          <span className="ml-2">{stage.name}</span>
        </h2>
        <div className={cn("flex gap-2")}>
          <Menu>
            <Plus
              size={18}
              strokeWidth={1}
              className="cursor-pointer transform hover:bg-gray-100 m-1 rounded-sm"
            ></Plus>
          </Menu>
          <Menu>
            <Ellipsis
              size={18}
              strokeWidth={1}
              className="cursor-pointer transform hover:bg-gray-100 m-1 rounded-sm"
            ></Ellipsis>
          </Menu>
        </div>
      </div>

      {/* Projects */}
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
      <Button
        variant="link"
        className="text-xs text-gray-400 font-semibold hover:bg-gray-100 w-full justify-start"
      >
        + New Project
      </Button>
    </div>
  );
}
