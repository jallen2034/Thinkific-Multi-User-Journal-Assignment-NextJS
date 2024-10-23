import { ChangeEvent } from "react";
import { Box, Button, TextField } from "@mui/material";
import { HandleSubmitCB, JournalFormState, UpdateJournalFormStateCB } from "@/components/journal-container/types";

interface JournalFormProps {
  journalFormState: JournalFormState;
  updateJournalFormState: UpdateJournalFormStateCB;
  handleSubmit: HandleSubmitCB;
}

const JournalForm = ({
  journalFormState, updateJournalFormState, handleSubmit
}: JournalFormProps) => {
  // Destructure what I want from journalFormState.
  const { postText }: JournalFormState = journalFormState;
  
  // Handle when the user changes the text field.
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateJournalFormState({ postText: e.target.value });
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit} className="journal-form" sx={{ my: 3 }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={postText} // Use the state from props
        onChange={handleChange}
        placeholder="Write your journal entry here..."
        required
        variant="outlined"
        label="Journal Entry"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default JournalForm;
