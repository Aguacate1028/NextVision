import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Importación de Componentes
import Toaster from './components/Toaster';
import Header from './components/Header';
import Footer from './components/Footer';

// Importación de Páginas
import { HomePage } from './pages/Home';
import { AuthAccount } from './pages/AuthAccount';
import { CatalogPage } from './pages/Catalogo';
import { ClientDashboard } from './components/ClientDashboard';
import { AdminDashboard } from './components/AdminDashboard';

// Configuración de Supabase
const projectId = "elfjdjvqiyzbhmansocl";
const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZmpkanZxaXl6YmhtYW5zb2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MjQwOTIsImV4cCI6MjA4MzIwMDA5Mn0.VWRqoccwsb4MEX7zsUwOUUFoFK6kE8ea4LMxdqNUCLA";

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- MOCK DE USUARIO PARA PRUEBAS ---
  // Este efecto simula una sesión activa sin llamar a la base de datos
  useEffect(() => {
    setLoading(false);
    setUser({
      email: 'cliente@test.com',
      user_metadata: {
        nombre: 'Dylan Cliente',
        rol: 'Cliente' // Cambia a 'Administrador' o 'Empleado' para probar otras vistas
      }
    });
  }, []);

  // Comentamos temporalmente la lógica real de Supabase para que no interfiera con el Mock
  /*
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);
  */

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    navigate('/dashboard'); 
  };

  const handleLogout = async () => {
    // Si usas el mock, simplemente limpia el estado
    setUser(null);
    navigate('/');
    // await supabase.auth.signOut(); // Descomentar cuando uses la DB real
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const userRole = user?.user_metadata?.rol || 'Cliente';

  return (
    <>
      <Header 
        isLoggedIn={!!user} 
        user={user} 
        userRole={userRole} 
        onLogout={handleLogout} 
      />
      
      <Routes>
        {/* HomePage necesita los datos para que su Header interno sepa quién está logueado */}
        <Route path="/" element={
          <HomePage 
            isLoggedIn={!!user} 
            user={user} 
            userRole={userRole} 
            onLogout={handleLogout} 
          />
        } />
        
        <Route path="/catalogo" element={
          <CatalogPage 
            isLoggedIn={!!user} 
            user={user} 
            userRole={userRole} 
            onLogout={handleLogout} 
          />
        } />

        {/* AuthAccount (Login) normalmente no lleva el menú completo, pero si lo requiere: */}
        <Route path="/login" element={
            !user ? <AuthAccount onAuthSuccess={handleAuthSuccess} /> : <Navigate to="/dashboard" />
        } />

        {/* Dashboards ya suelen recibir el user, pero asegúrate de pasar userRole */}
        <Route path="/dashboard" element={
          user ? (
            userRole === 'Administrador' || userRole === 'Empleado' 
              ? <AdminDashboard user={user} userRole={userRole} onLogout={handleLogout} /> 
              : <ClientDashboard user={user} userRole={userRole} onLogout={handleLogout} />
          ) : <Navigate to="/login" />
        } />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;