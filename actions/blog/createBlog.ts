"use server";

import { getUserSession } from "../auth.action";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description is too long"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  imageUrl: z.string().url("Image URL must be valid").optional().nullable(),
  // author: z.string().min(1, "Author name is required"),
});

export const createBlog = async (
  blogData: z.infer<typeof createBlogSchema>
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

    const validationResult = createBlogSchema.safeParse(blogData);

    if (!validationResult.success) {
      return {
        success: false,
        message: `${validationResult.error.flatten().fieldErrors}`,
        blog: null,
      };
    }

    const validatedData = validationResult.data;

    const blog = await prisma.blog.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        content: validatedData.content,
        imageUrl: validatedData.imageUrl || null,
        author: session.user.name,
        userId: session.user.id,
      },
    });

    return {
      success: true,
      message: "Blog created successfully",
      blog,
    };
  } catch (error) {
    console.error("Error creating blog:", error);
    return {
      success: false,
      message: "An error occurred while creating the blog",
      blog: null,
    };
  }
};
