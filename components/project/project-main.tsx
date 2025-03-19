"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Column } from "./column";
import { Search, ZoomIn, ZoomOut, Plus } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useProjectManager } from "@/hooks/use-column";
import { useRef, useState } from "react";
import { EditProjectDialog } from "./edit-project-dialog";
import { DeleteProjectDialog } from "./delete-project-dialog";
import { AddProjectDialog } from "./add-project-dialog";
import { ClientOnly } from "@/components/client-only";

const ProjectComponent = () => {
  const {
    columns,
    zoom,
    handleZoomIn,
    handleZoomOut,
    moveProject,
    editProject,
    deleteProject,
    addProject,
  } = useProjectManager();
  const containerRef = useRef<HTMLDivElement>(null);

  // State for dialogs
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addProjectDialogOpen, setAddProjectDialogOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Generate column colors map
  const columnColors: Record<number, string> = {};
  columns.forEach((column, index) => {
    columnColors[index] = column.color || "#ec4899"; // Default to pink if no color specified
  });

  // Handle edit project
  const handleEditProject = (columnIndex: number, projectIndex: number) => {
    setSelectedColumn(columnIndex);
    setSelectedProject(projectIndex);
    setEditDialogOpen(true);
  };

  // Handle delete project
  const handleDeleteProject = (columnIndex: number, projectIndex: number) => {
    setSelectedColumn(columnIndex);
    setSelectedProject(projectIndex);
    setDeleteDialogOpen(true);
  };

  // Handle add project
  const handleAddProject = (columnIndex: number) => {
    setSelectedColumn(columnIndex);
    setAddProjectDialogOpen(true);
  };

  return (
    <main className="flex flex-col justify-start p-6 bg-background text-foreground h-screen">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 p-2 px-4 w-full">
        <div className="flex space-x-4 w-full md:w-1/2 mb-4 md:mb-0">
          <div className="relative">
            <Input
              placeholder="Find a project"
              className="w-full text-sm pl-10 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
          <Button
            variant="outline"
            className="text-sm bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Filter
          </Button>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="text-sm bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            onClick={handleZoomOut}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="text-sm bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            onClick={handleZoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button className="text-sm bg-pink-600 text-white hover:bg-pink-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Column</span>
          </Button>
        </div>
      </div>

      {/* Project Columns */}
      <ScrollArea className="w-full h-full rounded-md border border-gray-200 dark:border-gray-700">
        <ClientOnly>
          <div
            className="flex p-5 pb-10 overflow-x-auto"
            style={{ gap: "32px" }}
            ref={containerRef}
          >
            {columns.map((stage, index) => (
              <div
                key={index}
                className="transition-transform h-fit shrink-0"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "top left",
                }}
              >
                <Column
                  stage={{
                    ...stage,
                    color: stage.color || "#ec4899",
                    dotColor: stage.dotColor || "#ec4899",
                  }}
                  index={index}
                  projects={stage.projects}
                  zoom={zoom}
                  onMoveProject={moveProject}
                  onEditProject={handleEditProject}
                  onDeleteProject={handleDeleteProject}
                  onAddProject={handleAddProject}
                  columnColors={columnColors}
                />
              </div>
            ))}
          </div>
        </ClientOnly>
        <ScrollBar orientation={"horizontal"} />
      </ScrollArea>

      {/* Dialogs - styled with new theme */}
      {editDialogOpen &&
        selectedColumn !== null &&
        selectedProject !== null && (
          <EditProjectDialog
            isOpen={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            onConfirm={(updatedProject) => {
              editProject(selectedColumn!, selectedProject!, updatedProject);
              setEditDialogOpen(false);
            }}
            project={columns[selectedColumn!].projects[selectedProject!]}
          />
        )}

      {deleteDialogOpen &&
        selectedColumn !== null &&
        selectedProject !== null && (
          <DeleteProjectDialog
            isOpen={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            onConfirm={() => {
              deleteProject(selectedColumn!, selectedProject!);
              setDeleteDialogOpen(false);
            }}
            projectName={
              columns[selectedColumn!].projects[selectedProject!].name
            }
          />
        )}

      {addProjectDialogOpen && selectedColumn !== null && (
        <AddProjectDialog
          isOpen={addProjectDialogOpen}
          onClose={() => setAddProjectDialogOpen(false)}
          onConfirm={(newProject) => {
            addProject(selectedColumn!, newProject);
            setAddProjectDialogOpen(false);
          }}
        />
      )}
    </main>
  );
};

export default ProjectComponent;
