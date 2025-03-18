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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createBlog } from "@/actions/blog/createBlog";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

// Schema for blog creation - using a separate declaration for reusability
const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description is too long"),
  content: z.string().min(1, "Basic content template is required"),
  imageUrl: z.string().url("Image URL must be valid").optional().nullish(),
});

// TypeScript type derived from the schema
type FormValues = z.infer<typeof createBlogSchema>;

// Default MDX template for new blogs
const DEFAULT_MDX_TEMPLATE = `# Your Blog Title

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

Happy writing!`;

const CreateBlogButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      description: "",
      content: DEFAULT_MDX_TEMPLATE,
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
        form.reset(); // Reset form after successful submission

        // Close dialog after successful submission with a delay
        setTimeout(() => {
          setIsOpen(false);
          // Redirect to editor could be added here
          // if (result.blog?.id) router.push(`/blogs/edit/${result.blog.id}`);
        }, 2000);
      } else {
        setError(result.message || "Failed to create blog");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Blog creation error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset error/success messages and form when dialog is closed
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setError(null);
      setSuccess(null);
      if (!isSubmitting) form.reset();
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a catchy title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a clear, engaging title for your blog post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief summary of your blog (min 10 characters)"
                      className="min-h-[80px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Write a short description to attract readers (10-500
                    characters).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Add a link to an image that represents your blog (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hidden content field - not shown to user but included in form */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => <input type="hidden" {...field} />}
            />

            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm mb-2 font-medium">Content Editing</p>
              <p className="text-xs text-muted-foreground">
                After creating your blog, you&apos;ll be able to edit the full
                content using our MDX editor. This will allow you to format
                text, add code blocks, and include interactive components.
              </p>
            </div>

            {error && (
              <div className="text-sm p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-500">
                {success}
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Blog"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogButton;
