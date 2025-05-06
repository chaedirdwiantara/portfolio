'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/app/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [envStatus, setEnvStatus] = useState<string | null>(null);
  const [supabaseStatus, setSupabaseStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const router = useRouter();

  useEffect(() => {
    // Check Supabase connection
    const checkSupabaseConnection = async () => {
      try {
        const supabase = createBrowserClient();
        
        // Simple ping query to check connection
        const { data, error } = await supabase.from('projects').select('count', { count: 'exact', head: true });
        
        if (error) {
          console.error("Supabase connection error:", error);
          setSupabaseStatus('error');
          setError("Could not connect to Supabase: " + error.message);
        } else {
          console.log("Supabase connected successfully");
          setSupabaseStatus('connected');
        }
      } catch (err) {
        console.error("Supabase client error:", err);
        setSupabaseStatus('error');
        setError("Failed to create Supabase client");
      }
    };
    
    // Check if already logged in
    const checkExistingSession = async () => {
      try {
        const supabase = createBrowserClient();
        const { data, error } = await supabase.auth.getSession();
        
        if (data.session) {
          console.log("Existing session found, redirecting to admin");
          router.push('/admin');
        }
      } catch (err) {
        console.error("Error checking existing session:", err);
      }
    };
    
    checkSupabaseConnection();
    checkExistingSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log('Attempting to log in with:', { email });
      const supabase = createBrowserClient();
      
      // Sign in with email/password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (!data.session) {
        throw new Error('Login successful but no session created');
      }
      
      console.log('Login successful, redirecting to admin');
      router.push('/admin');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        
        {/* Connection Status */}
        <div className="mb-4 p-3 rounded bg-gray-100 dark:bg-gray-700">
          <div className="flex items-center gap-2">
            <span>Supabase Status:</span>
            {supabaseStatus === 'checking' && <span className="text-yellow-500">Checking...</span>}
            {supabaseStatus === 'connected' && <span className="text-green-500">Connected</span>}
            {supabaseStatus === 'error' && <span className="text-red-500">Error</span>}
          </div>
          <div className="text-xs mt-1">
            URL: {process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20)}...
          </div>
        </div>
        
        {envStatus && (
          <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 p-3 rounded mb-4">
            Warning: {envStatus}
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              defaultValue=""
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
              autoComplete="off"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              defaultValue=""
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
              autoComplete="new-password"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || supabaseStatus === 'error' || supabaseStatus === 'checking'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-medium disabled:opacity-70"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
} 