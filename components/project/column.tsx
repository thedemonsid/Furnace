import { Ellipsis } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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
function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="text-xs text-gray-400 font-semibold hover:bg-gray-100 w-full justify-start px-2 py-1 rounded-lg">
          + New Project
        </div>
      </DialogTrigger>
      <DialogContent className="font-mono">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>Add a new project to the column</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Project Name"
            className="border border-green-300 rounded-md p-2"
          />
          <Textarea
            placeholder="Project Description"
            className="border border-green-300 rounded-md p-2"
          ></Textarea>
          <Button className="bg-green-300 text-black hover:bg-green-400">
            Create Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export function Column({
  stage,
  index,
  projects,
  zoom,
}: {
  stage: { name: string; color: string; dotColor: string };
  index: number;
  projects: { name: string; description: string }[];
  zoom: number;
}) {
  return (
    <div
      key={index}
      className="p-4 min-w-72 flex flex-col gap-4 h-fit max-w-80"
      style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
    >
      <div className="flex justify-between gap-2 items-center mb-4">
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
      <MyDialog />
    </div>
  );
}
