"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

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
    const response = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      const { data } = await response.json();
      Cookies.set("sessionId", data.sessionId);
      setIsGuest(true);
      setUsername(data.username);
      setSessionId(data.sessionId);
    }
  };

  const endGuestSession = async () => {
    const sessionId = Cookies.get("sessionId");

    const response = await fetch(`/api/session/${sessionId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      Cookies.remove("sessionId");
      setIsGuest(false);
      setUsername("");
      setSessionId("");
    }
  };

  const checkGuestSession = async () => {
    const sessionId = Cookies.get("sessionId");

    const response = await fetch(`/api/session/${sessionId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      const { data } = await response.json();
      if (data.isGuest) {
        setIsGuest(true);
        setUsername(data.username);
        setSessionId(data.sessionId);

        return;
      }
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
