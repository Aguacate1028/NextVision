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

  // 1. REEMPLAZAMOS EL MOCK: Ahora busca si hay una sesión guardada en el navegador
  useEffect(() => {
    const savedSession = localStorage.getItem('sessionUser');
    if (savedSession) {
      setUser(JSON.parse(savedSession));
    }
    setLoading(false);
  }, []);

  // 2. ACTUALIZAMOS EL ÉXITO: Recibe los datos del servidor y los guarda
  const handleAuthSuccess = (userData) => {
    const sessionData = {
      user_metadata: { 
      // Priorizamos el nombre real que viene del servidor
      nombre: userData.nombre, 
      rol: userData.rol 
      }
    };
    setUser(sessionData);
    localStorage.setItem('sessionUser', JSON.stringify(sessionData));
    navigate('/');
    
    // Redirigimos según el rol
    if (userData.rol === 'Administrador' || userData.rol === 'Empleado') {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  // 3. LOGOUT REAL: Limpia el estado y el almacenamiento
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sessionUser');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Extraemos el rol de los datos reales (por defecto Cliente si algo falla)
  const userRole = user?.user_metadata?.rol || 'Cliente';

  return (
    <>
      {/* Mantenemos tus componentes de Header/Footer tal cual */}
      <Header 
        isLoggedIn={!!user} 
        user={user} 
        userRole={userRole} 
        onLogout={handleLogout} 
      />
      
      <Routes>
        {/* Mantenemos todas tus rutas originales intactas */}
        <Route path="/" element={
          <HomePage isLoggedIn={!!user} user={user} userRole={userRole} onLogout={handleLogout} />
        } />
        
        <Route path="/catalogo" element={
          <CatalogPage isLoggedIn={!!user} user={user} userRole={userRole} onLogout={handleLogout} />
        } />

        <Route path="/login" element={
            !user ? <AuthAccount onAuthSuccess={handleAuthSuccess} /> : <Navigate to="/" />
        } />

        <Route path="/dashboard" element={
          user ? (
            userRole === 'Administrador' || userRole === 'Empleado' 
              ? <AdminDashboard user={user} userRole={userRole} onLogout={handleLogout} /> 
              : <ClientDashboard user={user} userRole={userRole} onLogout={handleLogout} />
          ) : <Navigate to="/login" />
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;