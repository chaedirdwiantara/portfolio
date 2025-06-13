'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createBrowserClient } from '../lib/supabase/client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  
  // Auto-hide the announcement after 5 seconds
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setShowAnnouncement(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [user]);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication");
        const supabase = createBrowserClient();
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error);
          setError("Authentication error: " + error.message);
          // Don't redirect here, we'll handle it below
        }
        
        if (data?.session) {
          console.log("User authenticated:", data.session.user.email);
          setUser(data.session.user);
          
          // If on login page and authenticated, redirect to admin dashboard
          if (isLoginPage) {
            router.push('/admin');
          }
        } else {
          console.log("No session found");
          
          // If not on login page and not authenticated, redirect to login
          if (!isLoginPage) {
            router.push('/admin/login');
            return; // Important: return early to prevent rendering admin layout
          }
        }
      } catch (err) {
        console.error("Auth check error:", err);
        setError("Authentication check failed");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [router, isLoginPage]);
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="mb-4 text-lg">Loading...</div>
        {error && (
          <div className="text-red-500 bg-red-100 p-3 rounded">
            Error: {error}
          </div>
        )}
      </div>
    );
  }
  
  // If it's the login page or no user is authenticated, just render the children (login form)
  if (isLoginPage || !user) {
    return <>{children}</>;
  }
  
  // Otherwise render the admin layout with sidebar
  return (
    <div className="min-h-screen flex">
      {/* Announcement banner with transition */}
      {showAnnouncement && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-400 text-yellow-900 text-center py-1 text-sm transition-opacity duration-300 ease-in-out">
          Logged in as: {user.email}
        </div>
      )}
      
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4 mt-12">
        <h1 className="text-lg font-bold mb-6">Admin Panel</h1>
        <nav className="space-y-2">
          <a href="/admin/projects" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            Projects
          </a>
          <a href="/admin/skills" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            Skills
          </a>
          <a href="/admin/personal-info" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            Profile
          </a>
          <a href="/admin/experiences" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            Experience
          </a>
          <a href="/admin/contacts" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            Messages
          </a>
          <a href="/admin/contact-info" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            Contact Info
          </a>
        </nav>
        
        <div className="mt-8 pt-4 border-t">
          <button 
            onClick={async () => {
              try {
                const supabase = createBrowserClient();
                await supabase.auth.signOut();
                router.push('/admin/login');
              } catch (err) {
                console.error("Sign out error:", err);
              }
            }}
            className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 mt-12">
        {children}
      </main>
    </div>
  );
} 