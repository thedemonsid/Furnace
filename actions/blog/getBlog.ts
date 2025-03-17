"use server";

import { z } from "zod";
import { getUserSession } from "../auth.action";
import { prisma } from "@/lib/prisma";

const getBlogByIdSchema = z.object({
  id: z.string().trim().min(1, "Blog ID is required"),
});

export const getBlogById = async ({ id }: { id: string }) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return {
        success: false,
        message: "User is not authenticated",
        blog: null,
      };
    }
    const validationResult = getBlogByIdSchema.safeParse({ id });

    if (!validationResult.success) {
      return {
        success: false,
        message: `${validationResult.error.flatten().fieldErrors}`,
        blog: null,
      };
    }

    const validatedId = validationResult.data.id;

    const blog = await prisma.blog.findUnique({
      where: {
        id: validatedId,
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        content: true,
        author: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!blog) {
      return {
        success: false,
        message: "Blog not found or you don't have permission to view it",
        blog: null,
      };
    }

    return {
      success: true,
      message: "Blog fetched successfully",
      blog,
    };
  } catch (error) {
    console.error("Error fetching the blog:", error);
    return {
      success: false,
      message: "An error occurred while fetching the blog",
      blog: null,
    };
  }
};
