"use client";

import React, { useEffect, useState } from "react";
import { Post } from "@/app/journal/types";
import PostList from "@/components/post-list/post-list";

interface JournalContainerProps {
  initialPosts: Post[];
}

const JournalContainer: React.FC<JournalContainerProps> = ({ initialPosts }: JournalContainerProps) => {
  // Client-side State to hold the posts, initialized with the fetched posts
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  
  // Effect hook to synchronize the client-side state with the initial posts fetched server-side.
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);
  
  return (
    <div className="journal-container">
      <h2>Posts</h2>
      {/* Render posts in a user-friendly way */}
      <PostList {...{ posts }}/>
    </div>
  );
};

export default JournalContainer;
