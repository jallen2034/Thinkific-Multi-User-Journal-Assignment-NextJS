// API route in Next.js server to handle client-side requests to make a new post to the database.
import { NextRequest, NextResponse } from "next/server";
import { JournalFormState } from "@/components/journal-container/types";
import { fetchPosts, makeNewPostToDbForAnonUser } from "../../../../prisma/helpers/post";
import { Post } from "@/app/journal/types";
import { sortPostsByDate } from "@/app/journal/helpers";

export async function POST(request: NextRequest) {
  try {
    const body: JournalFormState = await request.json();
    const { postText, user }: JournalFormState = body; // Destructure postText and user
    
    // Conditional check for anonymous user
    if (user === "Anonymous") {
      await makeNewPostToDbForAnonUser(postText);
      const updatedPosts: Post[] = await fetchPosts(); // Fetch updated posts after creation
      const sortedUpdatedPosts: Post[] = sortPostsByDate(updatedPosts);
      return new NextResponse(JSON.stringify({
        message: "Journal entry submitted successfully!", posts: sortedUpdatedPosts
      }), { status: 200 });
    }
    
    // Respond with a success message
    return new NextResponse(JSON.stringify({
      message: "No journal entries done yet but we're working on it!"
    }), { status: 200 });
  } catch (error) {
    console.error("Error handling journal entry submission:", error);
    
    // Return an error response with status code 500
    return new NextResponse(JSON.stringify({
      error: "An error occurred while submitting your journal entry."
    }), { status: 500 });
  }
}