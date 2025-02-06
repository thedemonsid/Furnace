import { ProjectCard } from "@/components/project-card";

const sampleProject = {
  title: "Redesign Homepage",
  description:
    "Update the company's homepage with a modern design and improved user experience.",
  dueDate: new Date(2023, 11, 31), // December 31, 2023
  members: [
    {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      name: "Bob Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "4",
      name: "Alice Brown",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "5",
      name: "Charlie Davis",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  labels: ["Design", "Frontend", "High Priority"],
};

export default function Home() {
  return (
    <main className="p-4 space-y-4">
      <ProjectCard {...sampleProject} />
      <ProjectCard {...sampleProject} />
      <ProjectCard {...sampleProject} />
    </main>
  );
}
