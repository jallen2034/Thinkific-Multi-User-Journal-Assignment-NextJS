import { ChangeEvent, FormEvent, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const JournalForm = () => {
  const [entry, setEntry] = useState("");
  
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEntry(e.target.value);
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Logic to submit the journal entry will go here later
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit} className="journal-form" sx={{ my: 3 }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={entry}
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