"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface AuthButtonsProps {
  isLoggedIn: boolean;
  pathname: string;
  handleNavigation: any;
  handleSignOut: any;
}

// Separate component for rendering authentication buttons
const AuthButtons = ({
  isLoggedIn,
  pathname,
  handleNavigation,
  handleSignOut,
}: AuthButtonsProps) => (
  <>
    {pathname !== "/" && (
      <Button color="inherit" onClick={() => handleNavigation("/")}>
        Return to Home
      </Button>
    )}
    {isLoggedIn ? (
      <>
        <Button color="inherit" onClick={handleSignOut}>
          Sign Out
        </Button>
      </>
    ) : (
      <Button color="inherit" onClick={() => handleNavigation("/login")}>
        Login
      </Button>
    )}
  </>
);

export default function ButtonAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null); // State to hold the user's email
  const router = useRouter();
  const pathname = usePathname();

  // Check if user is logged in by retrieving the JWT token from sessionStorage.
  useEffect(() => {
    const jwtToken = sessionStorage.getItem("token");
    if (jwtToken) {
      setIsLoggedIn(true);
      const decodedToken: any = jwtDecode(jwtToken); // Decode the JWT token.
      setUserEmail(decodedToken.email);
    } else {
      setIsLoggedIn(false);
      setUserEmail(null);
    }
  }, []);

  // Function to handle navigation to a specific route.
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Function to handle sign out
  const handleSignOut = () => {
    sessionStorage.removeItem("token"); // Remove the JWT token from sessionStorage.
    setIsLoggedIn(false);
    setUserEmail(null);
    router.push("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="toolbar">
          {/* Display welcome message if user is logged in */}
          {isLoggedIn && (
            <Typography variant="body1" className="welcome-message">
              Signed in as: {userEmail}
            </Typography>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {pathname === "/login" || pathname === "/registration" ? (
            <Button color="inherit" onClick={() => handleNavigation("/")}>
              Return to Home
            </Button>
          ) : (
            <AuthButtons
              {...{
                isLoggedIn,
                pathname,
                handleNavigation,
                handleSignOut,
              }}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
