import { Post } from "@/app/journal/types";

export interface CreatePostApiResponse {
  message: string;
  posts: Post[];
}