import { FormEvent } from "react";

export interface JournalFormState {
  postText: string;
  user: string; // Consider using a more specific type if you have a user type
}

// Type for the function that updates the journal form state
export type UpdateJournalFormStateCB = (newState: Partial<JournalFormState>) => void;

// Type for the submit handler function
export type HandleSubmitCB = (event: FormEvent<HTMLFormElement>) => Promise<void>;

export type UserSelectOption = {
  value: string; // This will be the user ID.
  label: string; // This will be the display name of the user.
};