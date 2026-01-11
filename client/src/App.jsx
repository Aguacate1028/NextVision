import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Componentes
import Toaster from './components/Toaster';
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas Públicas
import { HomePage } from './pages/Home';
import { AuthAccount } from './pages/AuthAccount';
import { CatalogPage } from './pages/Catalogo';

// --- SECCIÓN ADMIN ---
import FinanzasPage from './pages/admin/Finanzas'; 
import InventarioAdmin from './pages/admin/Inventario';
import Empleados from './pages/admin/Empleados';
import Horarios from './pages/admin/Horarios';

// --- SECCIÓN EMPLEADO ---
import Agenda from './pages/empleado/Agenda';
import Clientes from './pages/empleado/Clientes';
import Ventas from './pages/empleado/Ventas';
import Consulta from './pages/empleado/Consulta';

// --- SECCIÓN CLIENTE ---
import Citas from './pages/cliente/Citas';
import Historial from './pages/cliente/Historial';

const projectId = "elfjdjvqiyzbhmansocl";
const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZmpkanZxaXl6YmhtYW5zb2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MjQwOTIsImV4cCI6MjA4MzIwMDA5Mn0.VWRqoccwsb4MEX7zsUwOUUFoFK6kE8ea4LMxdqNUCLA";

const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey);

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- MOCK / SESIÓN ---
  useEffect(() => {
    const checkSession = async () => {
      const savedUser = localStorage.getItem('sessionUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Mock inicial para desarrollo:
        setUser({
          email: 'cliente@test.com',
          user_metadata: {
            nombre: 'Dylan Cliente',
            rol: 'Administrador' 
          }
        });
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('sessionUser', JSON.stringify(userData));
    const role = userData?.user_metadata?.rol || 'Cliente';
    
    if (role === 'Administrador') navigate('/finanzas');
    else if (role === 'Empleado') navigate('/agenda');
    else navigate('/catalogo');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
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

  const userRole = user?.user_metadata?.rol || 'Cliente';

  return (
    <>
      <Header isLoggedIn={!!user} user={user} userRole={userRole} onLogout={handleLogout} />

      <Routes>
        {/* ---- RUTAS PÚBLICAS ---- */}
        <Route path="/" element={<HomePage isLoggedIn={!!user} user={user} userRole={userRole} />} />
        <Route path="/catalogo" element={<CatalogPage isLoggedIn={!!user} user={user} userRole={userRole} />} />
        <Route 
          path="/login" 
          element={!user ? <AuthAccount onAuthSuccess={handleAuthSuccess} /> : <Navigate to="/" replace />} 
        />

        {/* ---- RUTAS CLIENTE ---- */}
        <Route 
          path="/citas" 
          element={user && userRole === 'Cliente' ? <Citas /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/historial" 
          element={user && userRole === 'Cliente' ? <Historial /> : <Navigate to="/login" />} 
        />

        {/* ---- RUTAS ADMINISTRADOR ---- */}
        <Route 
          path="/finanzas" 
          element={user && userRole === 'Administrador' ? <FinanzasPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin-empleados" 
          element={user && userRole === 'Administrador' ? <Empleados /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin-horarios" 
          element={user && userRole === 'Administrador' ? <Horarios /> : <Navigate to="/login" />} 
        />

        {/* ---- RUTAS EMPLEADO ---- */}
        <Route 
          path="/agenda" 
          element={user && userRole === 'Empleado' ? <Agenda /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/clientes" 
          element={user && userRole === 'Empleado' ? <Clientes /> : <Navigate to="/login" />} 
        />

        {/* ---- RUTAS MIXTAS (ADMIN Y EMPLEADO) ---- */}
        <Route 
          path="/admin-inventario" 
          element={user && (userRole === 'Administrador' || userRole === 'Empleado') ? <InventarioAdmin /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/ventas" 
          element={user && (userRole === 'Empleado' || userRole === 'Administrador') ? <Ventas /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/consulta" 
          element={user && (userRole === 'Empleado' || userRole === 'Administrador') ? <Consulta /> : <Navigate to="/login" />} 
        />

        {/* Redirección global por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
      <Toaster />
    </>
  );
}

export default App;