// Helper function to create a post and fetch updated posts
import { fetchPosts, makeNewPostToDbForAnonUser, makeNewPostToDbForEmailUser } from "../../../../prisma/helpers/post";

import { sortPostsByDate } from "@/app/journal/helpers";
import { Post } from "@/app/journal/types";

const createPostAndFetchUpdatedPosts = async (postText: string, userId?: number) => {
  if (userId) {
    await makeNewPostToDbForEmailUser(postText, userId);
  } else {
    await makeNewPostToDbForAnonUser(postText);
  }
  const updatedPosts: Post[] = await fetchPosts(); // Fetch updated posts after creation
  return sortPostsByDate(updatedPosts);
};

export { createPostAndFetchUpdatedPosts }