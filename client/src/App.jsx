import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Toaster } from './components/Toaster'; // Según tu captura está en components
import { AuthComponent } from './components/AuthComponent';
// Dashboards temporales o importados (asegúrate de que existan en components)
import { ClientDashboard } from './components/ClientDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LandingPage } from './pages/Home'; // Apunta a Home.jsx en la carpeta pages

const projectId = "elfjdjvqiyzbhmansocl";
const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZmpkanZxaXl6YmhtYW5zb2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MjQwOTIsImV4cCI6MjA4MzIwMDA5Mn0.VWRqoccwsb4MEX7zsUwOUUFoFK6kE8ea4LMxdqNUCLA";

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

function App() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
      if (session?.user) {
        setShowAuth(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = (userData, sessionData) => {
    setUser(userData);
    setSession(sessionData);
    setShowAuth(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setShowAuth(false);
  };

  const handleLoginClick = () => {
    setShowAuth(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (showAuth && !user) {
    return (
      <>
        <AuthComponent onAuthSuccess={handleAuthSuccess} />
        <button
          onClick={() => setShowAuth(false)}
          className="fixed bottom-4 left-4 px-4 py-2 bg-white rounded-full shadow-lg text-sm text-blue-600 font-bold"
        >
          ← Volver
        </button>
        <Toaster />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <LandingPage onLoginClick={handleLoginClick} />
        <Toaster />
      </>
    );
  }

  const userRole = user.user_metadata?.role || 'socio';

  return (
    <>
      {userRole === 'administrador' || userRole === 'staff' ? (
        <AdminDashboard user={user} onLogout={handleLogout} />
      ) : (
        <ClientDashboard user={user} onLogout={handleLogout} />
      )}
      <Toaster />
    </>
  );
}

export default App;