
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, Info } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api'; // Assuming API_BASE_URL is useful for context, though not directly for nav

const PublicLayout = () => {
  const navigate = useNavigate();

  // Helper to check if a token exists in localStorage
  const isAuthenticated = () => {
    return localStorage.getItem('ensemble_auth_token') !== null;
  };

  const handleNavClick = (path: string) => {
    if (path === '/auth' && isAuthenticated()) {
      // If already authenticated and tries to go to auth, redirect to dashboard
      navigate('/');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg px-4 py-3 shadow-sm transition-colors duration-300">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('/')}>
              <img src="/path/to/your/logo.png" alt="Ensemble Logo" className="h-8 w-auto" /> {/* Replace with actual logo path */}
              <span className="text-xl font-bold tracking-tight text-foreground">Ensemble</span>
            </div>
            
            <nav className="flex items-center space-x-6">
              <button
                onClick={() => handleNavClick('/about')}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1"
              >
                <Info className="h-4 w-4" />
                About
              </button>
              {/* Add other public nav items here if needed */}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated() ? (
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-border/50 shadow-md backdrop-blur-md"
                onClick={() => handleNavClick('/auth')}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login / Sign Up
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                className="rounded-xl shadow-md backdrop-blur-md"
                onClick={() => handleNavClick('/')} // Redirect to dashboard
              >
                Go to Dashboard
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center w-full">
        <Outlet /> {/* This is where the routed component (e.g., About) will render */}
      </main>

      {/* Optional: Footer for public pages */}
      <footer className="py-6 px-4 border-t border-border/40 bg-background/80 backdrop-blur-lg text-center text-sm text-muted-foreground">
        © 2024 Ensemble. All rights reserved.
      </footer>
    </div>
  );
};

export default PublicLayout;
