import { initialColumns } from "@/constants/initialColumns";
import { useState } from "react";

export const useProjectManager = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
  };
  const addColumn = (column: Column) => {
    setColumns((prevColumns) => [...prevColumns, column]);
  };
  const editColumn = (columnIndex: number, updatedColumn: Column) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[columnIndex] = updatedColumn;
      return newColumns;
    });
  };
  const deleteColumn = (columnIndex: number) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns.splice(columnIndex, 1);
      return newColumns;
    });
  };
  const addProject = (columnIndex: number, project: Project) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[columnIndex].projects.push(project);
      return newColumns;
    });
  };

  const editProject = (
    columnIndex: number,
    projectIndex: number,
    updatedProject: Project
  ) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[columnIndex].projects[projectIndex] = updatedProject;
      return newColumns;
    });
  };

  const deleteProject = (columnIndex: number, projectIndex: number) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[columnIndex].projects.splice(projectIndex, 1);
      return newColumns;
    });
  };

  const moveProject = (
    sourceColumnIndex: number,
    projectIndex: number,
    destinationColumnIndex: number
  ) => {
    setColumns((prevColumns) => {
      try {
        const newColumns = [...prevColumns];

        // Check if indices are valid
        if (
          sourceColumnIndex < 0 ||
          sourceColumnIndex >= newColumns.length ||
          projectIndex < 0 ||
          projectIndex >=
            (newColumns[sourceColumnIndex]?.projects?.length || 0) ||
          destinationColumnIndex < 0 ||
          destinationColumnIndex >= newColumns.length
        ) {
          console.log("Invalid indices detected:", {
            sourceColumnIndex,
            projectIndex,
            destinationColumnIndex,
          });
          return prevColumns; // Return unchanged if indices are invalid
        }

        // Get the project to move
        const projectToMove = {
          ...newColumns[sourceColumnIndex].projects[projectIndex],
        };

        // Ensure the project has required properties
        if (!projectToMove?.name) {
          console.log("Invalid project detected:", projectToMove);
          return prevColumns; // Return unchanged if project is invalid
        }

        // Remove from source column
        newColumns[sourceColumnIndex].projects.splice(projectIndex, 1);

        // Add to destination column
        newColumns[destinationColumnIndex].projects.push(projectToMove);

        return newColumns;
      } catch (error) {
        console.error("Error in moveProject:", error);
        return prevColumns;
      }
    });
  };

  return {
    columns,
    zoom,
    handleZoomIn,
    handleZoomOut,
    addProject,
    editProject,
    deleteProject,
    addColumn,
    editColumn,
    deleteColumn,
    moveProject,
  };
};
