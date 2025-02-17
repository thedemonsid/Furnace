"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Column } from "./column";
import { Search, ZoomIn, ZoomOut } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const mockColumns = [
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

const ProjectComponent = () => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
  };

  return (
    <main className="flex flex-col justify-start p-6 bg-white h-screen">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 p-2 px-4 w-full">
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
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
          <Button variant="outline" className="text-sm" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="text-sm" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="text-sm">
            Filter
          </Button>
          <Button className="text-sm bg-green-300 text-black hover:bg-green-400">
            New Project
          </Button>
        </div>
      </div>

      {/* Project Columns */}
      <ScrollArea className="w-full h-full rounded-md border">
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 p-2">
          {[...mockColumns, ...mockColumns].map((stage, index) => (
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
              />
            </div>
          ))}
        </div>
        <ScrollBar hidden orientation={"horizontal"} />
      </ScrollArea>
    </main>
  );
};

export default ProjectComponent;
