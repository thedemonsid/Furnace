"use server";

import { prisma } from "@/lib/prisma";
import { getUserSession } from "../auth.action";

export const getAllBlogsOfUser = async (limit: number = 20) => {
  try {
    const session = await getUserSession();

    if (!session) {
      return {
        success: false,
        message: "User is not authenticated",
        blogs: null,
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
        blogs: null,
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
      blogs: null,
    };
  }
};
