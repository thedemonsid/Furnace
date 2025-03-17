"use server";

import { getUserSession } from "../auth.action";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateBlogSchema = z.object({
  id: z.string().min(1, "Blog ID is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title is too long")
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description is too long")
    .optional(),
  content: z
    .string()
    .min(50, "Content must be at least 50 characters")
    .optional(),
  imageUrl: z.string().url("Image URL must be valid").nullish(),
  author: z.string().min(1, "Author name is required").optional(),
});

export const updateBlog = async (
  blogData: z.infer<typeof updateBlogSchema>
) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return {
        success: false,
        message: "User is not authenticated",
        blog: null,
      };
    }

    const validationResult = updateBlogSchema.safeParse(blogData);

    if (!validationResult.success) {
      return {
        success: false,
        message: `${validationResult.error.flatten().fieldErrors}`,
        blog: null,
      };
    }

    const { id, ...dataToUpdate } = validationResult.data;

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return {
        success: false,
        message: "Blog not found",
        blog: null,
      };
    }

    if (existingBlog.userId !== session.user.id) {
      return {
        success: false,
        message: "You don't have permission to update this blog",
        blog: null,
      };
    }

    type UpdateData = {
      title?: string;
      description?: string;
      content?: string;
      imageUrl?: string | null;
      author?: string;
    };

    const updateData: UpdateData = {};

    if (dataToUpdate.title !== undefined) {
      updateData.title = dataToUpdate.title;
    }

    if (dataToUpdate.description !== undefined) {
      updateData.description = dataToUpdate.description;
    }

    if (dataToUpdate.content !== undefined) {
      updateData.content = dataToUpdate.content;
    }

    if (dataToUpdate.author !== undefined) {
      updateData.author = dataToUpdate.author;
    }

    //* Handling imageUrl separately since it can be null
    if ("imageUrl" in dataToUpdate) {
      updateData.imageUrl = dataToUpdate.imageUrl;
    }

    if (Object.keys(updateData).length === 0) {
      return {
        success: true,
        message: "No changes to update",
        blog: existingBlog,
      };
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: updateData,
    });

    return {
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    };
  } catch (error) {
    console.error("Error updating blog:", error);
    return {
      success: false,
      message: "An error occurred while updating the blog",
      blog: null,
    };
  }
};
