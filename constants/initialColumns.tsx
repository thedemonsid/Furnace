export const initialColumns: Column[] = [
  {
    sortOrder: 0,
    name: "Not Started",
    color: "bg-blue-100",
    dotColor: "bg-blue-400",
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
    sortOrder: 1,
    name: "Planning",
    color: "bg-orange-100",
    dotColor: "bg-orange-400",
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
    sortOrder: 2,
    name: "Awaiting Kick Off",
    color: "bg-green-100",
    dotColor: "bg-green-400",
    projects: [
      { name: "Server Setup", description: "Set up the server infrastructure" },
    ],
  },
  {
    sortOrder: 3,
    name: "In Progress",
    color: "bg-purple-100",
    dotColor: "bg-purple-400",
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
    sortOrder: 4,
    name: "In Review",
    color: "bg-yellow-100",
    dotColor: "bg-yellow-400",
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
