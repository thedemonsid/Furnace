"use client";

import { Edit, GripHorizontal, Trash2 } from "lucide-react";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { motion, useMotionValue } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";

export function ProjectCard({
  project,
  columnIndex,
  projectIndex,
  onDragEnd,
  onEdit,
  onDelete,
  columnColors = {},
  onDragStart,
  onDragTargetChange,
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
  onDragStart?: () => void;
  onDragTargetChange?: (columnIndex: number | null) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isNearScreenEdge, setIsNearScreenEdge] = useState(false);
  const [nearestColumn, setNearestColumn] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const deleteTimerRef = useRef<NodeJS.Timeout | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Handle double-click to edit
  const handleDoubleClick = () => {
    onEdit(columnIndex, projectIndex);
  };

  // Detect which column we're over while dragging
  useEffect(() => {
    if (!isDragging) {
      if (nearestColumn !== null) {
        setNearestColumn(null);
        if (onDragTargetChange) onDragTargetChange(null);
      }
      return;
    }

    const detectNearestColumn = (e: MouseEvent) => {
      // Find the column we're currently over
      const columns = document.querySelectorAll("[data-column-index]");
      let foundColumn: number | null = null;

      columns.forEach((column) => {
        // Skip if it's our own card (which also has data-column-index)
        if ((column as HTMLElement).hasAttribute("data-project-index")) {
          return;
        }

        const rect = column.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          foundColumn = parseInt(
            (column as HTMLElement).getAttribute("data-column-index") || "0",
            10
          );
        }
      });

      // Check if we're near the screen edge
      const edgeThreshold = 40;
      const newIsNearEdge =
        e.clientX < edgeThreshold ||
        e.clientY < edgeThreshold ||
        window.innerWidth - e.clientX < edgeThreshold ||
        window.innerHeight - e.clientY < edgeThreshold;

      // Handle screen edge detection for delete
      if (newIsNearEdge !== isNearScreenEdge) {
        setIsNearScreenEdge(newIsNearEdge);

        if (newIsNearEdge) {
          deleteTimerRef.current = setTimeout(() => {
            onDelete(columnIndex, projectIndex);
          }, 1000);
        } else if (deleteTimerRef.current) {
          clearTimeout(deleteTimerRef.current);
          deleteTimerRef.current = null;
        }
      }

      // Update nearest column if changed
      if (foundColumn !== nearestColumn) {
        setNearestColumn(foundColumn);
        if (onDragTargetChange) onDragTargetChange(foundColumn);
      }
    };

    window.addEventListener("mousemove", detectNearestColumn);
    return () => {
      window.removeEventListener("mousemove", detectNearestColumn);
      if (deleteTimerRef.current) {
        clearTimeout(deleteTimerRef.current);
      }
    };
  }, [
    isDragging,
    nearestColumn,
    isNearScreenEdge,
    columnIndex,
    onDelete,
    projectIndex,
    onDragTargetChange,
  ]);

  // Get border/visual style based on state
  const getBorderStyle = () => {
    const currentColor = columnColors?.[columnIndex] ?? "#ec4899";

    if (isNearScreenEdge) {
      return {
        borderColor: "#ef4444",
        borderWidth: "2px",
        boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
      };
    }

    if (!isDragging || nearestColumn === null) {
      return {
        borderColor: currentColor,
        boxShadow: isHovering
          ? `0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 2px ${currentColor}40`
          : "0 2px 5px rgba(0, 0, 0, 0.05)",
      };
    }

    const nearestColor = columnColors?.[nearestColumn] ?? "#ec4899";
    return {
      borderColor: nearestColor,
      borderWidth: "2px",
      boxShadow: `0 8px 16px rgba(0, 0, 0, 0.1), 0 0 0 2px ${nearestColor}60`,
    };
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragSnapToOrigin={false}
      style={{ x, y }}
      dragTransition={{
        bounceStiffness: 400,
        bounceDamping: 20,
        power: 0.2,
      }}
      whileDrag={{
        scale: 1.03,
        boxShadow: isNearScreenEdge
          ? "0 0 15px rgba(239, 68, 68, 0.5)"
          : "0 10px 20px rgba(0, 0, 0, 0.1)",
      }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      onDragStart={() => {
        setIsDragging(true);
        if (onDragStart) onDragStart();
      }}
      onDragEnd={() => {
        setIsDragging(false);
        setIsNearScreenEdge(false);

        if (deleteTimerRef.current) {
          clearTimeout(deleteTimerRef.current);
          deleteTimerRef.current = null;
        }

        if (nearestColumn !== null && nearestColumn !== columnIndex) {
          onDragEnd({
            source: columnIndex,
            destination: nearestColumn,
            projectIndex,
          });
        }

        // Reset motion values
        x.set(0);
        y.set(0);
      }}
      data-column-index={columnIndex}
      data-project-index={projectIndex}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ y: -3 }}
      className="cursor-grab active:cursor-grabbing touch-none"
    >
      <Card
        className={`
          border border-gray-200 dark:border-gray-700
          bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
          ${isNearScreenEdge ? "border-red-500" : ""}
          ${isDragging ? "shadow-lg" : ""}
          ${
            isHovering && !isDragging
              ? "border-pink-200 dark:border-pink-700"
              : ""
          }
          transition-all duration-200
          rounded-lg overflow-hidden
        `}
        style={getBorderStyle()}
        onDoubleClick={handleDoubleClick}
      >
        <CardHeader className="p-4 relative">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-sm py-1 text-gray-900 dark:text-white">
              {project.name}
            </h3>
            <div className="opacity-60 cursor-grab active:cursor-grabbing">
              <GripHorizontal className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <CardDescription>
            <p className="text-gray-500 dark:text-gray-400 text-xs m-0 p-0 mb-8">
              {project.description}
            </p>
          </CardDescription>

          {/* Button controls */}
          {(isHovering || isDragging) && (
            <motion.div
              className="absolute bottom-2 right-2 flex gap-1"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
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
            </motion.div>
          )}

          {/* Delete indicator when near screen edge */}
          {isNearScreenEdge && (
            <motion.div
              className="absolute inset-0 bg-red-100/40 dark:bg-red-900/30 rounded-lg flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Trash2 className="h-8 w-8 text-red-500" />
              </motion.div>
            </motion.div>
          )}

          {/* Column destination indicator */}
          {isDragging && nearestColumn !== null && !isNearScreenEdge && (
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              style={{
                borderColor: columnColors?.[nearestColumn] ?? "#ec4899",
                borderWidth: "2px",
                borderStyle: "dashed",
              }}
            />
          )}
        </CardHeader>
      </Card>
    </motion.div>
  );
}
