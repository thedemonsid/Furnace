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
  };
};
