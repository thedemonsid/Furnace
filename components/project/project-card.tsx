import { GripHorizontal } from "lucide-react";
import { Card, CardDescription, CardHeader } from "../ui/card";

export function ProjectCard({
  project,
}: {
  project: { name: string; description: string };
}) {
  return (
    <Card className="cursor-pointer hover:shadow-md border border-gray-200 hover:border-gray-400 ">
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm py-1">{project.name}</h3>
          <GripHorizontal className="w-5 h-5 text-gray-400 hover:cursor-grab hover:text-gray-700"></GripHorizontal>
        </div>
        {/* Card Description */}
        <CardDescription>
          <p className="text-gray-500 text-xs m-0 p-0">{project.description}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
