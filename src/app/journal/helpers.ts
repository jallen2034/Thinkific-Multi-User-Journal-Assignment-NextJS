import { Post } from "@/app/journal/types";

/* Helper function to sort posts by their creation date in descending order.
 * @param posts - Array of posts to be sorted.
 * @returns A new array of posts sorted by date in descending order. */
export const sortPostsByDate = (posts: Post[]): Post[] => {
  return posts.slice().sort((a: Post, b: Post): number => {
    const dateA: number = a.datePosted ? new Date(a.datePosted).getTime() : 0;
    const dateB: number = b.datePosted ? new Date(b.datePosted).getTime() : 0;
    
    return dateB - dateA;
  });
};