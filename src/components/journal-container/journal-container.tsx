"use client";

import React, { useEffect, useState } from "react";
import { Post } from "@/app/journal/types";
import Select from "react-select";
import { Box, CircularProgress } from "@mui/material";
import JournalForm from "@/components/journal-form/journal-form";
import {
  HandleSubmitCB,
  JournalFormState,
  UpdateJournalFormStateCB,
  UserSelectOption,
} from "@/components/journal-container/types";
import {
  createPostsFilteredByUser,
  getUserSelectOptionsFromPosts,
  postJournalEntry,
} from "@/components/journal-container/helpers";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import PostList from "@/components/post-list/post-list";
import "./journal-container.scss";

interface JournalContainerProps {
  initialPosts: Post[];
}

const JournalContainer: React.FC<JournalContainerProps> = ({
  initialPosts,
}: JournalContainerProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // https://react-select.com/home
  const [selectedOption, setSelectedOption] = useState<UserSelectOption | null>(
    null,
  );
  const [userDropDownOptions, setUserDropDownOptions] = useState<
    UserSelectOption[]
  >([]);

  const [journalFormState, setJournalFormState] = useState<JournalFormState>({
    postText: "",
    user: "Anonymous",
  });

  // Effect to populate the dropdown menu data react-select needs to make every user selectable
  useEffect(() => {
    setPosts(initialPosts);
    const userDropDownOptions: UserSelectOption[] =
      getUserSelectOptionsFromPosts(initialPosts);
    setUserDropDownOptions(userDropDownOptions || []);
  }, [initialPosts]);

  // Effect hook to handle updating the UI once the user selects a user to filter the posts by.
  useEffect(() => {
    const filteredPosts: Post[] | null = createPostsFilteredByUser(
      posts,
      selectedOption,
    );
    setFilteredPosts(filteredPosts || []);
  }, [posts, selectedOption]);

  const handleSubmit: HandleSubmitCB = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { posts: newPosts } = await postJournalEntry(journalFormState);
      setPosts(newPosts);
    } catch (error) {
      console.error("Failed to submit journal entry:", error);
      enqueueSnackbar("Failed to submit journal entry. Please try again.", {
        variant: "error",
      });
    } finally {
      enqueueSnackbar("Journal entry submitted successfully!", {
        variant: "success",
      });
      setJournalFormState((prevState: JournalFormState) => ({
        ...prevState,
        postText: "",
      }));
    }

    setLoading(false);
  };

  const updateJournalFormState: UpdateJournalFormStateCB = (
    newState: Partial<JournalFormState>,
  ) => {
    setJournalFormState((prevState: JournalFormState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <Box className="journal-container" sx={{ p: 3 }}>
      <SnackbarProvider />
      <JournalForm
        {...{
          journalFormState,
          updateJournalFormState,
          handleSubmit,
        }}
      />
      <h2 className="journal-title">Journal Entries</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {userDropDownOptions.length > 0 ? (
            <Select
              options={userDropDownOptions}
              onChange={setSelectedOption}
              classNamePrefix="my-select"
              placeholder="Filter posts by a user"
            />
          ) : (
            <p>No users available</p>
          )}
          <PostList
            {...{
              posts: filteredPosts.length > 0 ? filteredPosts : posts,
            }}
          />
        </div>
      )}
    </Box>
  );
};

export default JournalContainer;
