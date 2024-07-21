"use client";

import React from "react";
import { CssBaseline, Container } from "@mui/material";
import Header from "../components/Header";
import { SessionProvider } from "next-auth/react";
import { GuestSessionProvider } from "@/contexts/GuestSessionContext";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Veridonia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <SessionProvider>
          <GuestSessionProvider>
            <CssBaseline />
            <Header />
            <Container>{children}</Container>
          </GuestSessionProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
