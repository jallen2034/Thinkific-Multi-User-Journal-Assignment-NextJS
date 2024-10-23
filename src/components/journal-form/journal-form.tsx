import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import {
  HandleSubmitCB,
  JournalFormState,
  UpdateJournalFormStateCB,
} from "@/components/journal-container/types";
import "./journal-form.scss";

interface JournalFormProps {
  journalFormState: JournalFormState;
  updateJournalFormState: UpdateJournalFormStateCB;
  handleSubmit: HandleSubmitCB;
}

const JournalForm = ({
  journalFormState,
  updateJournalFormState,
  handleSubmit,
}: JournalFormProps) => {
  const { postText }: JournalFormState = journalFormState;

  // State to hold the login status.
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check login status on component mount
  useEffect(() => {
    const jwtToken = sessionStorage.getItem("token");
    setIsLoggedIn(Boolean(jwtToken)); // Set state based on the presence of the token
  }, []);

  // Handle when the user changes the text field.
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateJournalFormState({ postText: e.target.value });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="journal-form"
      sx={{ my: 3 }}
    >
      <TextField
        fullWidth
        multiline
        rows={4}
        value={postText}
        onChange={handleChange}
        placeholder="Write your journal entry here..."
        required
        variant="outlined"
        label="Journal Entry"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {isLoggedIn ? "Submit as me" : "Submit as Anonymous"}
      </Button>
    </Box>
  );
};

export default JournalForm;
