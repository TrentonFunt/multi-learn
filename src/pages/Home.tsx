import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthenticatedHome from '../components/home/AuthenticatedHome.tsx';
import UnauthenticatedHome from '../components/home/UnauthenticatedHome.tsx';

const Home: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      {isAuthenticated && user ? (
        <AuthenticatedHome user={user} />
      ) : (
        <UnauthenticatedHome />
      )}
    </div>
  );
};


export default Home;
