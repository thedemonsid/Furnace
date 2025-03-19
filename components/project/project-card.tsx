"use client";

import { Edit, GripHorizontal, Trash2 } from "lucide-react";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";

export function ProjectCard({
  project,
  columnIndex,
  projectIndex,
  onDragEnd,
  onEdit,
  onDelete,
  columnColors = {}, // Provide default empty object
}: {
  project: { name: string; description: string };
  columnIndex: number;
  projectIndex: number;
  onDragEnd: (result: {
    source: number;
    destination: number;
    projectIndex: number;
  }) => void;
  onEdit: (columnIndex: number, projectIndex: number) => void;
  onDelete: (columnIndex: number, projectIndex: number) => void;
  columnColors?: Record<number, string>;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [nearestColumn, setNearestColumn] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle nearest column detection
  useEffect(() => {
    if (!isDragging) {
      setNearestColumn(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const columns = document.querySelectorAll("[data-column-index]");
      let closest = null;
      let closestDistance = Infinity;

      columns.forEach((column) => {
        const rect = column.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from mouse to column center
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closest = parseInt(
            (column as HTMLElement).getAttribute("data-column-index") || "0"
          );
        }
      });

      if (closest !== null && closest !== columnIndex) {
        setNearestColumn(closest);
      } else {
        setNearestColumn(null);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isDragging, columnIndex]);

  // Determine border color based on nearest column during drag
  const getBorderStyle = () => {
    // Use optional chaining and nullish coalescing to safely access properties
    const currentColor = columnColors?.[columnIndex] ?? "#e5e7eb";

    if (!isDragging || nearestColumn === null) {
      return { borderColor: currentColor };
    }

    const nearestColor = columnColors?.[nearestColumn] ?? "#e5e7eb";

    return {
      borderColor: nearestColor,
      borderWidth: "2px",
      boxShadow: `0 0 10px 1px ${nearestColor}40`,
    };
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      whileDrag={{ scale: 1.05, zIndex: 20 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);

        // Find the nearest column
        if (nearestColumn !== null && nearestColumn !== columnIndex) {
          onDragEnd({
            source: columnIndex,
            destination: nearestColumn,
            projectIndex,
          });
        }
      }}
      style={{
        position: "relative",
        transition: "border-color 0.3s, box-shadow 0.3s",
        ...getBorderStyle(),
      }}
      className={`${isDragging ? "z-50" : ""}`}
      dragMomentum={false}
      data-column-index={columnIndex}
      data-project-index={projectIndex}
    >
      <Card
        className={`
          cursor-grab active:cursor-grabbing
          hover:shadow-md
          border-2
          backdrop-blur-sm bg-white/85
          ${isDragging ? "" : "hover:border-gray-300"}
          transition-all duration-300
        `}
      >
        <CardHeader className="p-4 relative">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm py-1">{project.name}</h3>
            <GripHorizontal className="w-5 h-5 text-gray-400 hover:text-gray-700" />
          </div>
          <CardDescription>
            <p className="text-gray-500 text-xs m-0 p-0 mb-6">
              {project.description}
            </p>
          </CardDescription>

          {/* Edit and Delete buttons */}
          <div className="absolute bottom-2 right-2 flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(columnIndex, projectIndex);
              }}
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(columnIndex, projectIndex);
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
