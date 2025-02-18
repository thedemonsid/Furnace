import { useState } from "react";

interface Project {
  name: string;
  description: string;
}

interface Column {
  name: string;
  color: string;
  dotColor: string;
  count: number;
  projects: Project[];
}

const initialColumns: Column[] = [
  {
    name: "Not Started",
    color: "bg-blue-100",
    dotColor: "bg-blue-400",
    count: 1,
    projects: [
      {
        name: "Authentication System",
        description: "Implement user authentication and authorization",
      },
      {
        name: "Database Schema Design",
        description: "Design the database schema for the application",
      },
      {
        name: "API Documentation",
        description: "Create comprehensive API documentation",
      },
    ],
  },
  {
    name: "Planning",
    color: "bg-orange-100",
    dotColor: "bg-orange-400",
    count: 0,
    projects: [
      {
        name: "UI/UX Design",
        description: "Design the user interface and user experience",
      },
      {
        name: "Project Roadmap",
        description: "Create a detailed project roadmap",
      },
    ],
  },
  {
    name: "Awaiting Kick Off",
    color: "bg-green-100",
    dotColor: "bg-green-400",
    count: 0,
    projects: [
      { name: "Server Setup", description: "Set up the server infrastructure" },
    ],
  },
  {
    name: "In Progress",
    color: "bg-purple-100",
    dotColor: "bg-purple-400",
    count: 0,
    projects: [
      {
        name: "Frontend Development",
        description: "Develop the frontend of the application",
      },
      {
        name: "Backend Development",
        description: "Develop the backend of the application",
      },
      {
        name: "Integration Testing",
        description: "Perform integration testing",
      },
      {
        name: "Continuous Deployment",
        description: "Set up continuous deployment pipeline",
      },
    ],
  },
  {
    name: "In Review",
    color: "bg-yellow-100",
    dotColor: "bg-yellow-400",
    count: 0,
    projects: [
      {
        name: "Code Review",
        description: "Review the code for quality and standards",
      },
      {
        name: "User Acceptance Testing",
        description: "Conduct user acceptance testing",
      },
    ],
  },
];

export const useProjectManager = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
  };

  const addProject = (columnIndex: number, project: Project) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[columnIndex].projects.push(project);
      newColumns[columnIndex].count += 1;
      return newColumns;
    });
  };

  const editProject = (columnIndex: number, projectIndex: number, updatedProject: Project) => {
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
      newColumns[columnIndex].count -= 1;
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
  };
};