import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Column } from "./column";
import { Search } from "lucide-react";
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
  return (
    <main className="flex-1 p-6 bg-white">
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
          <Button className="text-sm bg-green-300 text-black hover:bg-green-400">
            New Project
          </Button>
        </div>
      </div>

      {/* Project Columns */}
      <div className="flex justify-start gap-4 p-2">
        {mockColumns.map((stage, index) => (
          <Column
            key={index}
            stage={stage}
            index={index}
            projects={stage.projects}
          />
        ))}
      </div>
    </main>
  );
};

export default ProjectComponent;
