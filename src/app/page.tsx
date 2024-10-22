"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation"; // Import from next/navigation in App Router
import "./app.scss";

export default function Home() {
  const router = useRouter();
  
  // Navigate to the /journal route when the button is clicked.
  const handleButtonClick = (): void => {
    router.push("/journal");
  };
  
  return (
    <main className="main">
      <div className="description">
        <Typography variant="h4" className="homepageHeading" gutterBottom>
          Multi-User Journal Application
        </Typography>
        <Typography variant="body1" className="descriptionText" paragraph>
          Contribute to our collaborative journal. Share your thoughts anonymously or log in to track your posts.
          Explore entries from others, sorted by the latest contributions.
        </Typography>
        <Box className="buttonWrapper">
          <Button
            variant="contained"
            color="primary"
            className="journalButton"
            onClick={handleButtonClick}
          >
            Launch Journal
          </Button>
        </Box>
      </div>
    </main>
  );
}
