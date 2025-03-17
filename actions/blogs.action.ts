"use server";

import { prisma } from "@/lib/prisma";
import { getUserSession } from "./auth.action";
import { z } from "zod";

export const getAllBlogsOfUser = async (limit: number = 20) => {
  try {
    const session = await getUserSession();

    if (!session) {
      return {
        success: false,
        message: "User is not authenticated",
        blogs: [],
      };
    }

    const safeLimit = Math.min(limit, 50); //* Cap at 50 for safety , in future will implement pagination

    const blogs = await prisma.blog.findMany({
      where: {
        userId: session.user.id,
      },
      take: safeLimit,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    if (blogs.length === 0) {
      return {
        success: false,
        message: "No blogs found",
        blogs: [],
      };
    }

    return {
      success: true,
      message: "Blogs of user fetched successfully",
      blogs,
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      success: false,
      message: "An error occurred while validating input",
      blogs: [],
    };
  }
};

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
        blog: {},
      };
    }
    const validationResult = getBlogByIdSchema.safeParse({ id });

    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.flatten().fieldErrors,
        blog: {},
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
        blog: {},
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
      blog: {},
    };
  }
};
