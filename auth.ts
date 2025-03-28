import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders: { 
        github: { 
         clientId: process.env.GITHUB_CLIENT_ID!, 
         clientSecret: process.env.GITHUB_CLIENT_SECRET!, 
        } 
     }, 
});