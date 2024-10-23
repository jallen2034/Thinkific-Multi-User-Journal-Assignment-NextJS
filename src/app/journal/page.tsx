import React from 'react';
import { fetchPosts } from "../../../prisma/helpers/post";
import { Post } from "@/app/journal/types";
import JournalContainer from "@/components/journal-container/journal-container";
import { sortPostsByDate } from "@/app/journal/helpers";

/* This component fetches posts from the database using Prisma on the server side
 * before rendering the JournalContainer component on the client side. */
const Page = async () => {
  let sortedPosts: Post[] = [];
  let errorMessage: string | null = null;
  
  // Fetch posts from the database server-side before the initial page load.
  try {
    const posts: Post[] = await fetchPosts();
    sortedPosts = sortPostsByDate(posts);
  } catch (error) {
    errorMessage = (error as Error).message; // Type assertion to access the message property.
  }
  
  // Render the JournalContainer with the fetched posts, or display an error message if the initial fetching failed.
  return (
    <div>
      {errorMessage ? (
        <div style={{ color: 'red' }}>
          <p>Error: {errorMessage}</p>
        </div>
      ) : (
        <JournalContainer {...{ initialPosts: sortedPosts }} />
      )}
    </div>
  );
};

export default Page;
