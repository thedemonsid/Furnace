"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Column } from "./column";
import { Search, ZoomIn, ZoomOut } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useProjectManager } from "@/hooks/use-column";
import { AddColumnDialog } from "./add-column-dialog";

const ProjectComponent = () => {
  const { columns, zoom, handleZoomIn, handleZoomOut, addColumn } =
    useProjectManager();

  return (
    <main className="flex flex-col justify-start p-6 bg-white h-screen">
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
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 p-2">
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
