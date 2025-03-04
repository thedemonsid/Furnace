import React from "react";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Ellipsis, Plus, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const mockColumns = [
  {
    name: "Not Started",
    color: "bg-blue-100",
    dotColor: "bg-blue-400",
    count: 1,
  },
  {
    name: "Planning",
    color: "bg-orange-100",
    dotColor: "bg-orange-400",
    count: 0,
  },
  {
    name: "Awaiting Kick Off",
    color: "bg-green-100",
    dotColor: "bg-green-400",
    count: 0,
  },
  {
    name: "In Progress",
    color: "bg-purple-100",
    dotColor: "bg-purple-400",
    count: 0,
  },
  {
    name: "In Review",
    color: "bg-yellow-100",
    dotColor: "bg-yellow-400",
    count: 0,
  },
];
const Dashboard = () => {
  return (
    <main className="flex-1 p-6 bg-background">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 p-2 px-4">
        <div className="relative w-1/3">
          <Input
            placeholder="Find a project"
            className="w-full text-sm pl-10"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="text-sm">
            Filter
          </Button>
          <Button className="text-sm bg-green-400 text-black hover:bg-green-500">
            New Project
          </Button>
        </div>
      </div>

      {/* Project Columns */}
      <div className="flex justify-start gap-2 p-2">
        {mockColumns.map((stage, index) => (
          <Column key={index} stage={stage} index={index} />
        ))}
      </div>
    </main>
  );
};
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
function Column({
  stage,
  index,
}: {
  stage: { name: string; color: string; dotColor: string };
  index: number;
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

      <ProjectCard
        project={{
          name: "Project 1",
          description: "This is a sample project",
        }}
      />
      <Button
        variant="link"
        className="text-xs text-gray-400 font-semibold hover:bg-gray-100 w-full justify-start"
      >
        + New Project
      </Button>
    </div>
  );
}

function ProjectCard({
  project,
}: {
  project: { name: string; description: string };
}) {
  return (
    <Card className="cursor-pointer hover:shadow-md border border-gray-200 hover:border-gray-400 transform hover:scale-105 transition-transform duration-700">
      <CardHeader className="p-4">
        <h3 className="font-bold text-sm py-1">{project.name}</h3>
        {/* Card Description */}
        <CardDescription>
          <p className="text-gray-500 text-xs m-0 p-0">{project.description}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default Dashboard;
