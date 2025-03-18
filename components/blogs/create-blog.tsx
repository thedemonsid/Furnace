"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createBlog } from "@/actions/blog/createBlog";
import { useState } from "react";

// Modified schema without requiring detailed content
const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description is too long"),
  content: z.string().min(1, "Basic content template is required"),
  imageUrl: z.string().url("Image URL must be valid").optional().nullable(),
});

type FormValues = z.infer<typeof createBlogSchema>;

const CreateBlogButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      description: "",
      content: `# Your Blog Title

This is a starter template for your MDX blog.

## Getting Started

- Use markdown formatting for headings, lists, and emphasis
- Insert code blocks with triple backticks
- Add images with ![alt text](url)
- Create links with [text](url)

## MDX Features

MDX lets you use React components in your markdown:

- Import and use custom components
- Add interactive elements
- Style your content with tailwind classes

Happy writing!`,
      imageUrl: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await createBlog(data);

      if (result.success) {
        setSuccess(
          `${result.message} - You can now edit the full content in the editor.`
        );
        reset();
        // Close dialog after successful submission (optional)
        setTimeout(() => {
          setIsOpen(false);
          // Here you could redirect to the blog editor with the new blog ID
          // if (result.blog?.id) {
          //   router.push(`/blogs/edit/${result.blog.id}`);
          // }
        }, 2000);
      } else {
        setError(result.message || "Failed to create blog");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">New Blog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Blog</DialogTitle>
          <DialogDescription>
            Start by providing basic details for your blog. You&apos;ll be able
            to edit the full content later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-left">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter a catchy title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Brief summary of your blog (min 10 characters)"
              className="min-h-[80px]"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="imageUrl" className="text-left">
              Featured Image URL (optional)
            </Label>
            <Input
              id="imageUrl"
              placeholder="https://example.com/image.jpg"
              {...register("imageUrl")}
            />
            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>

          <div className="bg-muted p-4 rounded-md">
            <p className="text-sm mb-2 font-medium">Content Editing</p>
            <p className="text-xs text-muted-foreground">
              After creating your blog, you&apos;ll be able to edit the full
              content using our MDX editor. This will allow you to format text,
              add code blocks, and include interactive components.
            </p>
            <input type="hidden" {...register("content")} />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Blog"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogButton;
