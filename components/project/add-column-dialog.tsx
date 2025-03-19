"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Column } from "./column";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface Project {
  id: string;
  title: string;
  description?: string;
}

interface Column {
  name: string;
  count: number;
  color: string;
  dotColor: string;
  projects: Project[];
}

export function AddColumnDialog({
  addColumn,
}: {
  addColumn: (column: Column) => void;
}) {
  const [newColumnName, setNewColumnName] = useState("");
  const handleAddColumn = () => {
    addColumn({
      name: newColumnName,
      count: 0,
      color: "bg-blue-100",
      dotColor: "bg-blue-400",
      projects: [],
    });
    setNewColumnName("");
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="text-sm p-2 bg-green-300 rounded-md cursor-pointer hover:bg-green-400">
          Add Column
        </div>
      </DialogTrigger>
      <DialogContent className="font-mono">
        <DialogHeader>
          <DialogTitle>New Column</DialogTitle>
          <DialogDescription>
            Add a new column to the project board
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Column Name"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            className="border border-green-300 rounded-md p-2"
          />
          <Button
            className="bg-green-300 text-black hover:bg-green-400"
            onClick={handleAddColumn}
          >
            Create Column
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
