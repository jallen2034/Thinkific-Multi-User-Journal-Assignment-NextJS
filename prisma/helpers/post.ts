import prisma from "../../lib/prisma";
import { Post } from "@/app/journal/types";

const ANON_USER_ID: number = 0;

// Helper function to fetch existing posts from the DB using the prisma ORM.
export const fetchPosts = async () => {
  try {
    console.log("Fetching posts from the database...");
    const posts: Post[] = await prisma.post.findMany({
      include: { user: true },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Could not fetch posts");
  }
};

// Helper function to find an existing post in the database.
export const findPost = async (id: string) => {
  try {
    return await prisma.post.findUnique({
      where: { id: Number(id) },
      include: { user: true },
    });
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw new Error("Could not fetch the post");
  }
};

// Helper function to allow the user to post a new Journal Entry to the Db for Anonymous users.
export const makeNewPostToDbForAnonUser = async (content: string) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        title: "Anonymous Post",
        content: content,
        datePosted: new Date(),
        userId: ANON_USER_ID, // All anon users have a user ID of 0.
      },
    });
    console.log("New anonymous post created:", newPost);
  } catch (error) {
    console.error("Error creating new post for anonymous user:", error);
    throw new Error("Could not create a new post");
  }
};

export const makeNewPostToDbForEmailUser = async (content: string, userId: number) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        title: "User Post",  // Can modify the title as needed
        content: content,
        datePosted: new Date(),
        userId: userId,  // Use the provided userId for the authenticated user
      },
    });
    console.log("New post created for user:", newPost);
  } catch (error) {
    console.error("Error creating new post for authenticated user:", error);
    throw new Error("Could not create a new post");
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error(`Error finding user with email ${email}:`, error);
    throw new Error("Could not find user");
  }
};

// Helper function to fetch all users from the database.
export const fetchUsers = async () => {
  try {
    console.log("Fetching all users from the database...");
    return await prisma.user.findMany();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
  }
};

export const createUser = async (
  name: string,
  email: string,
  passwordHash: string,
) => {
  try {
    return await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });
  } catch (error) {
    console.error("Error creating new user:", error);
    throw new Error("Could not create user");
  }
};