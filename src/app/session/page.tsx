'use client';

import { useGuestSession } from '@/contexts/GuestSessionContext';
import { useSession } from 'next-auth/react';

const HomePage: React.FC = () => {
  const { data: session, status } = useSession();
  const { isGuest, startGuestSession, endGuestSession } = useGuestSession();

  if (status === 'loading') return <p>Loading...</p>;

  if (session) {
    return <p>Signed in as {session.user?.email}</p>;
  }

  if (isGuest) {
    return (
      <div>
        <p>You are browsing as a guest.</p>
        <button onClick={endGuestSession}>End Guest Session</button>
      </div>
    );
  }

  return (
    <div>
      <p>Not signed in</p>
      <button onClick={startGuestSession}>Continue as Guest</button>
    </div>
  );
};

export default HomePage;