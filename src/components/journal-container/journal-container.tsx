"use client";

import React, { useEffect, useState } from "react";
import { Post } from "@/app/journal/types";
import PostList from "@/components/post-list/post-list";
import { Box, CircularProgress } from "@mui/material";
import JournalForm from "@/components/journal-form/journal-form";
import { HandleSubmitCB, JournalFormState, UpdateJournalFormStateCB } from "@/components/journal-container/types";
import { postJournalEntry } from "@/components/journal-container/helpers";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import './journal-container.scss';

interface JournalContainerProps {
  initialPosts: Post[];
}

const JournalContainer: React.FC<JournalContainerProps> = ({ initialPosts }: JournalContainerProps) => {
  // Client-side state to manage loading state.
  const [loading, setLoading] = useState<boolean>(false);
  
  // Client-side state to hold the posts, initialized with the fetched posts.
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  
  // Client-side state to keep track of the form input.
  const [journalFormState, setJournalFormState] = useState<JournalFormState>({
    postText: "",
    user: "Anonymous" // Default user.
  });
  
  // Effect hook to synchronize the client-side state with the initial posts fetched server-side.
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);
  
  // Handle form submission for the journal entry.
  const handleSubmit: HandleSubmitCB = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while the API call is in progress.
    
    try {
      const { posts } = await postJournalEntry(journalFormState);
      
      // Update the posts state with the new posts.
      setPosts((prevPosts: Post[]) => [...prevPosts, ...posts]);
    } catch (error) {
      console.error("Failed to submit journal entry:", error);
      enqueueSnackbar('Failed to submit journal entry. Please try again.', { variant: 'error' });
    } finally {
      enqueueSnackbar('Journal entry submitted successfully!', { variant: 'success' });
      setJournalFormState((prevState: JournalFormState) => ({
        ...prevState,
        postText: "", // Clear the entry after submission.
      }));
    }
    
    setLoading(false);
  };
  
  // Callback function to update the journal form state.
  const updateJournalFormState: UpdateJournalFormStateCB = (
    newState: Partial<JournalFormState>
  ) => {
    setJournalFormState((prevState: JournalFormState) => ({
      ...prevState,
      ...newState,
    }));
  };
  
  console.log(posts)
  
  return (
    <Box className="journal-container" sx={{ p: 3 }}>
      <SnackbarProvider />
      <JournalForm
        {...{
          journalFormState,
          updateJournalFormState,
          handleSubmit
        }}
      />
      <h2 className="journal-title">Journal Entries</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <PostList {...{ posts }} />
      )}
    </Box>
  );
};

export default JournalContainer;