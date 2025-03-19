"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Column } from "./column";
import { Search, ZoomIn, ZoomOut } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useProjectManager } from "@/hooks/use-column";
import { AddColumnDialog } from "./add-column-dialog";
import { useEffect, useRef, useState } from "react";
import { EditProjectDialog } from "./edit-project-dialog";
import { DeleteProjectDialog } from "./delete-project-dialog";
import { AddProjectDialog } from "./add-project-dialog";

const ProjectComponent = () => {
  const {
    columns,
    zoom,
    handleZoomIn,
    handleZoomOut,
    addColumn,
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
    columnColors[index] = column.color;
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

  // This effect sets up the global drop detection
  useEffect(() => {
    const handleDragEnd = (e: MouseEvent) => {
      // Find the nearest column based on mouse position
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (!containerRef.current) return;

      // Find all column elements
      const columns = containerRef.current.querySelectorAll(
        "[data-column-index]"
      );
      let closestColumn = null;
      let closestDistance = Infinity;

      columns.forEach((column) => {
        const rect = column.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from mouse to column center
        const distance = Math.sqrt(
          Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestColumn = column;
        }
      });

      if (
        closestColumn &&
        e.target &&
        (e.target as HTMLElement).hasAttribute("data-column-index")
      ) {
        const sourceColumnIndex = parseInt(
          (e.target as HTMLElement).getAttribute("data-column-index")!
        );
        const projectIndex = parseInt(
          (e.target as HTMLElement).getAttribute("data-project-index")!
        );
        const destinationColumnIndex = parseInt(
          (closestColumn as HTMLElement).getAttribute("data-column-index")!
        );

        if (sourceColumnIndex !== destinationColumnIndex) {
          moveProject(sourceColumnIndex, projectIndex, destinationColumnIndex);
        }
      }
    };

    document.addEventListener("mouseup", handleDragEnd);
    return () => document.removeEventListener("mouseup", handleDragEnd);
  }, [moveProject]);

  return (
    <main className="flex flex-col justify-start p-6 bg-background text-foreground h-screen">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 p-2 px-4 w-full">
        <div className="flex space-x-4 w-full md:w-1/2 mb-4 md:mb-0">
          <div className="relative">
            <Input
              placeholder="Find a project"
              className="w-full text-sm pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
          <Button variant="outline" className="text-sm">
            Filter
          </Button>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="text-sm" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="text-sm" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <AddColumnDialog addColumn={addColumn} />
        </div>
      </div>

      {/* Project Columns */}
      <ScrollArea className="w-full h-full rounded-md border">
        <div className="flex flex-wrap justify-around" ref={containerRef}>
          {columns.map((stage, index) => (
            <div
              key={index}
              className="break-inside-avoid transition-transform h-fit"
              style={{ transform: `scale(${zoom})` }}
            >
              <Column
                stage={stage}
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
        <ScrollBar orientation={"horizontal"} />
      </ScrollArea>

      {/* Dialogs - render only when needed */}
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
