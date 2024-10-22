import { AppBar, Link, Toolbar, Typography } from "@mui/material";

const JournalHeader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Multi-User Journal
        </Typography>
        <Link href="#all-posts" color="inherit">All Entries</Link>
        <Link href="#user-posts" color="inherit" sx={{ ml: 2 }}>My Entries</Link>
        <Link href="#post-entry" color="inherit" sx={{ ml: 2 }}>Add Entry</Link>
      </Toolbar>
    </AppBar>
  );
};

export default JournalHeader;