"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import {
  startGuestSession as startGuestSessionRequest,
  endGuestSession as endGuestSessionRequest,
  checkGuestSession as checkGuestSessionRequest,
} from "@/utils/fetchers";

interface GuestSessionContextProps {
  isGuest: boolean;
  username: string;
  sessionId: string;
  startGuestSession: () => Promise<void>;
  endGuestSession: () => Promise<void>;
  checkGuestSession: () => Promise<void>;
}

const GuestSessionContext = createContext<GuestSessionContextProps | undefined>(undefined);

export const GuestSessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (sessionId) {
      checkGuestSession();
    } else {
      startGuestSession();
    }
  }, [isGuest]);

  const startGuestSession = async () => {
    try {
      const { data } = await startGuestSessionRequest();
      Cookies.set("sessionId", data.sessionId);
      setIsGuest(true);
      setUsername(data.username);
      setSessionId(data.sessionId);
    } catch (error) {
      console.error("Failed to start guest session", error);
    }
  };

  const endGuestSession = async () => {
    const sessionId = Cookies.get("sessionId");

    if(!sessionId) {
      console.error('There is no session to end')
      return;
    }

    try {
      await endGuestSessionRequest(sessionId);
      Cookies.remove("sessionId");
      setIsGuest(false);
      setUsername("");
      setSessionId("");
    } catch (error) {
      console.error("Failed to end guest session", error);
    }
  };

  const checkGuestSession = async () => {
    const sessionId = Cookies.get("sessionId");

    if(!sessionId) {
      console.error('There is no session to check')
      return;
    }

    try {
      const { data } = await checkGuestSessionRequest(sessionId);
      if (data.isGuest) {
        setIsGuest(true);
        setUsername(data.username);
        setSessionId(data.sessionId);
        return;
      }
    } catch (error) {
      console.error("Failed to check guest session", error);
    }

    setIsGuest(false);
    setUsername("");
    setSessionId("");
  };

  return (
    <GuestSessionContext.Provider
      value={{ isGuest, sessionId, username, startGuestSession, endGuestSession, checkGuestSession }}
    >
      {children}
    </GuestSessionContext.Provider>
  );
};

export const useGuestSession = (): GuestSessionContextProps => {
  const context = useContext(GuestSessionContext);
  if (!context) {
    throw new Error("useGuestSession must be used within a GuestSessionProvider");
  }
  return context;
};
