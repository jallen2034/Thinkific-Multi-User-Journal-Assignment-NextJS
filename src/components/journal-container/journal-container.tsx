"use client";

import React, { useEffect, useState } from "react";
import { Post } from "@/app/journal/types";
import PostList from "@/components/post-list/post-list";
import { Box } from "@mui/material";
import JournalForm from "@/components/journal-form/journal-form";
import './journal-container.scss';

interface JournalContainerProps {
  initialPosts: Post[];
}

const JournalContainer: React.FC<JournalContainerProps> = ({ initialPosts }: JournalContainerProps) => {
  // Client-side State to hold the posts, initialized with the fetched posts
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  
  console.log("posts: ", posts);
  
  // Effect hook to synchronize the client-side state with the initial posts fetched server-side.
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);
  
  return (
    <Box className="journal-container" sx={{ p: 3 }}>
      <JournalForm />
      <h2 className="journal-title">Journal Entries</h2> {/* Use a class name for the title */}
      <PostList {...{ posts }} />
    </Box>
  );
};

export default JournalContainer;
