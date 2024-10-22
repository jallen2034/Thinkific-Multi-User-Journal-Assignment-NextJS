import prisma from "../../lib/prisma";

export const fetchPosts = async () => {
  try {
    console.log("Fetching posts from the database...");
    return await prisma.post.findMany({
      include: { author: true },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Could not fetch posts");
  }
};

export const findPost = async (id: string) => {
  try {
    return await prisma.post.findUnique({
      where: { id: Number(id) },
      include: { author: true },
    });
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw new Error("Could not fetch the post");
  }
};