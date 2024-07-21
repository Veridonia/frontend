import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface GuestSessionContextProps {
  isGuest: boolean;
  startGuestSession: () => Promise<void>;
  endGuestSession: () => Promise<void>;
}

const GuestSessionContext = createContext<GuestSessionContextProps | undefined>(undefined);

export const GuestSessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isGuest, setIsGuest] = useState<boolean>(false);

  useEffect(() => {
    const sessionId = Cookies.get('sessionId');
    if (sessionId) {
      setIsGuest(true);
    }
  }, []);

  const startGuestSession = async () => {
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'start' }),
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      Cookies.set('sessionId', data.sessionId);
      setIsGuest(true);
    }
  };

  const endGuestSession = async () => {
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'end' }),
      credentials: 'include',
    });
    if (response.ok) {
      Cookies.remove('sessionId');
      setIsGuest(false);
    }
  };

  return (
    <GuestSessionContext.Provider value={{ isGuest, startGuestSession, endGuestSession }}>
      {children}
    </GuestSessionContext.Provider>
  );
};

export const useGuestSession = (): GuestSessionContextProps => {
  const context = useContext(GuestSessionContext);
  if (!context) {
    throw new Error('useGuestSession must be used within a GuestSessionProvider');
  }
  return context;
};