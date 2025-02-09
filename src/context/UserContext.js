'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);
  const [fetchingLoggedUser, setFetchingLoggedUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    getLoggedUser();
  }, [user]);

  const getLoggedUser = async () => {
    try {
      setFetchingLoggedUser(true);
      const response = await fetch(`/api/user/${user.id}`);
      if (!response.ok) throw new Error('Failed to fetch user');

      const data = await response.json();
      setLoggedUser(data.user);
    } catch (error) {
      console.error('Error fetching logged user:', error);
    } finally {
      setFetchingLoggedUser(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loggedUser,
        setLoggedUser,
        loading,
        fetchingLoggedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
