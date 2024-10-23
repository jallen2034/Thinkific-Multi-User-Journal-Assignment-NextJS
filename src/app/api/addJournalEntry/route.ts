import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // Ensure you import jwt
import { JournalFormState } from "@/components/journal-container/types";
import {
  fetchPosts,
  findUserByEmail,
  makeNewPostToDbForAnonUser,
  makeNewPostToDbForEmailUser,
} from "../../../../prisma/helpers/post";
import { Post } from "@/app/journal/types";
import { sortPostsByDate } from "@/app/journal/helpers";

const JWT_SECRET = process.env.JWT_SECRET! || "your_jwt_secret";

// Helper function to create a post and fetch updated posts
const createPostAndFetchUpdatedPosts = async (postText: string, userId?: number) => {
  if (userId) {
    await makeNewPostToDbForEmailUser(postText, userId);
  } else {
    await makeNewPostToDbForAnonUser(postText);
  }
  const updatedPosts: Post[] = await fetchPosts(); // Fetch updated posts after creation
  return sortPostsByDate(updatedPosts);
};

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization"); // Get the authorization header
    const token =
      authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    
    let userEmail = null;
    
    if (token) {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      userEmail = decoded.email; // Get the email from the decoded token
    }
    
    const body: JournalFormState = await request.json();
    const { postText, user }: JournalFormState = body; // Destructure postText and user
    
    // Conditional check for anonymous user
    if (!userEmail && user === "Anonymous") {
      const sortedUpdatedPosts = await createPostAndFetchUpdatedPosts(postText);
      return new NextResponse(
        JSON.stringify({
          message: "Journal entry submitted successfully!",
          posts: sortedUpdatedPosts,
        }),
        { status: 200 }
      );
    } else if (userEmail) {
      // Check if the user exists in the database.
      const existingUser = await findUserByEmail(userEmail);
      
      // Create a new post for the authenticated user.
      if (existingUser) {
        const sortedUpdatedPosts = await createPostAndFetchUpdatedPosts(postText, existingUser.id);
        return new NextResponse(
          JSON.stringify({
            message: "Journal entry submitted successfully!",
            posts: sortedUpdatedPosts,
          }),
          { status: 200 }
        );
      } else {
        return new NextResponse(
          JSON.stringify({
            error: "User not found.",
          }),
          { status: 404 }
        );
      }
    }
    
    // Respond with a success message
    return new NextResponse(
      JSON.stringify({
        message: "No journal entries done yet but we're working on it!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling journal entry submission:", error);
    
    // Return an error response with status code 500
    return new NextResponse(
      JSON.stringify({
        error: "An error occurred while submitting your journal entry.",
      }),
      { status: 500 }
    );
  }
}
