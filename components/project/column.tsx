"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { ProjectCard } from "./project-card";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

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
  const columnRef = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [isDragTarget, setIsDragTarget] = useState(false);

  // Simpler approach - we'll handle this from the card's side instead
  const handleDragOver = () => setIsDragTarget(true);
  const handleDragLeave = () => setIsDragTarget(false);

  return (
    <motion.div
      ref={columnRef}
      className={`
        p-4 flex flex-col
        transition-all duration-300
        ${
          isOver
            ? "bg-pink-50/50 dark:bg-gray-800/50"
            : "bg-white dark:bg-gray-900"
        }
        ${
          isDragTarget
            ? "bg-pink-50/80 dark:bg-gray-800/80 shadow-lg ring-2 ring-pink-200 dark:ring-pink-900/30"
            : ""
        }
        border border-gray-200 dark:border-gray-700
        rounded-lg shadow-sm
        w-[280px] min-w-[280px] max-w-[280px]
        min-h-[200px] relative
      `}
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: "top left",
        borderLeft: `3px solid ${stage.color || "#ec4899"}`,
      }}
      data-column-index={index}
      onHoverStart={() => setIsOver(true)}
      onHoverEnd={() => setIsOver(false)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={() => setIsDragTarget(false)}
    >
      {/* Column Header */}
      <div className="flex justify-between items-center mb-3 sticky top-0 bg-inherit">
        <div className="flex items-center gap-2">
          <div
            className="size-3 rounded-full"
            style={{ background: stage.dotColor || "#ec4899" }}
          />
          <p className="font-medium text-sm text-gray-900 dark:text-white">
            {stage.name}
          </p>
          {projects.length > 0 && (
            <span className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full w-5 h-5 text-xs font-medium text-gray-700 dark:text-gray-300">
              {projects.length}
            </span>
          )}
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 p-0 flex items-center justify-center text-xs rounded-full hover:bg-pink-100 hover:text-pink-700 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => onAddProject(index)}
        >
          <Plus className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Projects List with fixed height and scrolling */}
      <div
        className="flex flex-col gap-4 overflow-y-auto min-h-[100px] max-h-[calc(100vh-250px)] pr-1 scroll-smooth custom-scrollbar"
        data-column-drop-area={index}
      >
        <AnimatePresence>
          {projects.map((project, projectIndex) => (
            <motion.div
              key={projectIndex}
              className="pt-2 pb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard
                project={project}
                columnIndex={index}
                projectIndex={projectIndex}
                onDragEnd={({ source, destination, projectIndex }) => {
                  setIsDragTarget(false);
                  onMoveProject(source, projectIndex, destination);
                }}
                onEdit={onEditProject}
                onDelete={onDeleteProject}
                columnColors={columnColors}
                onDragTargetChange={(columnIndex: number | null) => {
                  setIsDragTarget(
                    Boolean(columnIndex && columnIndex === index)
                  );
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty state with consistent height */}
        {projects.length === 0 && (
          <motion.div
            className="flex items-center justify-center h-[100px] text-center text-gray-400 dark:text-gray-500 text-sm italic border border-dashed border-gray-200 dark:border-gray-700 rounded-lg"
            animate={
              isDragTarget
                ? {
                    scale: [1, 1.03, 1],
                    borderColor: ["#e5e7eb", stage.color, "#e5e7eb"],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Drop card here
          </motion.div>
        )}
      </div>

      {/* Add Project Button */}
      <div
        className="text-xs text-gray-400 dark:text-gray-500 font-medium hover:bg-pink-50 dark:hover:bg-gray-800 w-full text-center px-3 py-2 rounded-lg cursor-pointer mt-3 border border-dashed border-gray-200 dark:border-gray-700"
        onClick={() => onAddProject(index)}
      >
        + Add Project
      </div>

      {/* Visual drop indicator - simplified */}
      <AnimatePresence>
        {isDragTarget && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              boxShadow: `inset 0 0 0 2px ${stage.color || "#ec4899"}`,
            }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
