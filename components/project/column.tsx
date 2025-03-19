import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { ProjectCard } from "./project-card";

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
import { motion } from "framer-motion";
import { useState, useRef } from "react";

function MyDialog() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = () => {
    //* A dummy function to simulate the creation of a project
    console.log("Create project:", projectName, projectDescription);
    setIsOpen(false);
    setProjectName("");
    setProjectDescription("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="text-xs text-gray-400 font-semibold hover:bg-gray-100 w-full justify-start px-2 py-1 rounded-lg cursor-pointer">
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
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <Textarea
            placeholder="Project Description"
            className="border border-green-300 rounded-md p-2"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          ></Textarea>
          <Button
            className="bg-green-300 text-black hover:bg-green-400"
            onClick={handleCreate}
            disabled={!projectName.trim()}
          >
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
  onMoveProject,
  onEditProject,
  onDeleteProject,
  onAddProject,
  columnColors,
}: {
  stage: { name: string; color: string; dotColor: string };
  index: number;
  projects: { name: string; description: string }[];
  zoom: number;
  onMoveProject: (
    sourceColumnIndex: number,
    projectIndex: number,
    destinationColumnIndex: number
  ) => void;
  onEditProject: (columnIndex: number, projectIndex: number) => void;
  onDeleteProject: (columnIndex: number, projectIndex: number) => void;
  onAddProject: (columnIndex: number) => void;
  columnColors: Record<number, string>;
}) {
  const columnRef = useRef(null);
  const [isOver, setIsOver] = useState(false);

  return (
    <div
      key={index}
      className={`p-4 min-w-72 flex flex-col gap-4 h-fit max-w-80 transition-all duration-300 ${
        isOver ? "bg-gray-50" : ""
      }`}
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: "top left",
        borderLeft: `3px solid ${stage.color}`,
      }}
      ref={columnRef}
      data-column-index={index}
    >
      <div className="flex justify-between gap-2 items-center mb-4">
        <div className="flex items-center gap-2">
          <div
            className="size-3 rounded-full"
            style={{ background: stage.dotColor }}
          />
          <p className="font-medium text-sm">{stage.name}</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-xs  rounded-full hover:text-white hover:bg-gray-700 hover:scale-105"
            onClick={() => onAddProject(index)}
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
      <motion.div
        className="flex flex-col gap-3"
        onHoverStart={() => setIsOver(true)}
        onHoverEnd={() => setIsOver(false)}
      >
        {projects.map((project, projectIndex) => (
          <ProjectCard
            key={projectIndex}
            project={project}
            columnIndex={index}
            projectIndex={projectIndex}
            onDragEnd={({ source, destination, projectIndex }) => {
              if (destination !== source) {
                onMoveProject(source, projectIndex, destination);
              }
            }}
            onEdit={onEditProject}
            onDelete={onDeleteProject}
            columnColors={columnColors}
          />
        ))}
      </motion.div>
      <MyDialog />
    </div>
  );
}
