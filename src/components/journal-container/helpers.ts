// API request helper function
import {
  JournalFormState,
  UserSelectOption,
} from "@/components/journal-container/types";
import { Author, Post } from "@/app/journal/types";

// Helper to make a fetch request to my Next.js server and update the DB with a new post.
const postJournalEntry = async (data: JournalFormState) => {
  try {
    // Retrieve the JWT from sessionStorage.
    const jwtToken = sessionStorage.getItem('token');
    
    const response: any = await fetch("/api/addJournalEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(jwtToken && { Authorization: `Bearer ${jwtToken}` }), // Add token if it exists.
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error posting journal entry:", error);
    throw error;
  }
};

const getUserSelectOptionsFromPosts = (posts: Post[]): UserSelectOption[] => {
  const seenUserIds = new Set<string>(); // Set to track seen user IDs.
  const reactSelectOptions: UserSelectOption[] = [];

  posts.forEach((post: Post) => {
    const { user }: Post = post; // Destructure the user property from the post

    // Guard clause: Ensure that the user exists and already has an id before proceeding further.
    if (!user || user.id === undefined) {
      return;
    }

    const { name, id }: Author = user;
    const userIdString: string = id.toString();

    // Guard clause: Verify that the user ID has already been seen, if it has skip adding it to the result.
    if (seenUserIds.has(userIdString)) {
      return;
    }

    // Mark this ID as seen if we get down to here.
    seenUserIds.add(userIdString);

    reactSelectOptions.push({
      value: userIdString, // Add user ID to value
      label: name ?? "Anonymous", // Use a fallback for name
    });
  });

  return reactSelectOptions; // Return the unique options
};

const createPostsFilteredByUser = (
  originalPosts: Post[],
  selectedOption: UserSelectOption | null,
): Post[] | null => {
  // Destructure value from selectedOption if it exists, otherwise default to undefined.
  const value = selectedOption?.value;

  // If no user is selected (i.e., value is undefined or null), log this situation and return the original posts.
  if (!value) {
    return originalPosts; // Return the original posts instead of null
  }

  // Return the filtered posts, which may be an empty array if no matches were found.
  return originalPosts.filter((post: Post) => {
    const { userId }: Post = post;
    return userId === Number(value); // Return true if the post matches the selected user
  });
};

export {
  postJournalEntry,
  getUserSelectOptionsFromPosts,
  createPostsFilteredByUser,
};
