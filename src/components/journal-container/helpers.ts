// API request helper function
import { JournalFormState } from "@/components/journal-container/types";

// Helper to make a fetch request to my Next.js server and update the DB with a new post.
const postJournalEntry = async (data: JournalFormState) => {
  try {
    const response: any = await fetch('/api/addJournalEntry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export { postJournalEntry }