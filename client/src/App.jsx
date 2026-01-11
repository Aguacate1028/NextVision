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
// Administrador
import FinanzasPage from './pages/admin/Finanzas';
import InventarioAdmin from './pages/admin/Inventario';
import Empleados from './pages/admin/Empleados';
import Horarios from './pages/admin/Horarios';

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

  // --- LÓGICA DE SESIÓN REAL ---
  useEffect(() => {
    // 1. Verificar sesión actual al cargar
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    checkSession();

    // 2. Escuchar cambios de estado (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- REDIRECCIÓN DINÁMICA POR ROL ---
  const redirectByRole = (role) => {
    switch (role) {
      case 'Administrador':
        navigate('/finanzas'); // O a tu panel principal de admin
        break;
      case 'Empleado':
        navigate('/admin-inventario'); // O la ruta que definas para empleado
        break;
      case 'Cliente':
        navigate('/catalogo');
        break;
      default:
        navigate('/');
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    const role = userData?.user_metadata?.rol || 'Cliente';
    redirectByRole(role);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
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
      <Header 
        isLoggedIn={!!user} 
        user={user} 
        userRole={userRole} 
        onLogout={handleLogout} 
      />
      
      <Routes>
        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />

        {/* ---- R U T A S - P U B L I C A S */}
        <Route path="/" element={<HomePage isLoggedIn={!!user} user={user} userRole={userRole} onLogout={handleLogout} />} />
        <Route path="/catalogo" element={<CatalogPage isLoggedIn={!!user} user={user} userRole={userRole} onLogout={handleLogout} />} />
        
        {/* LOGIN CON REDIRECCIÓN INTELIGENTE */}
        <Route path="/login" element={
          !user ? (
            <AuthAccount onAuthSuccess={handleAuthSuccess} />
          ) : (
            // Si el usuario ya está logueado e intenta entrar a /login, lo mandamos a su sitio
            userRole === 'Administrador' ? <Navigate to="/finanzas" /> : <Navigate to="/catalogo" />
          )
        } />

        {/* ---- R U T A S - A D M I N I S T R A D O R */}
        <Route 
          path="/finanzas" 
          element={user && userRole === 'Administrador' ? <FinanzasPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin-inventario" 
          element={user && (userRole === 'Administrador' || userRole === 'Empleado') ? <InventarioAdmin /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin-empleados" 
          element={user && userRole === 'Administrador' ? <Empleados /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin-horarios" 
          element={user && userRole === 'Administrador' ? <Horarios /> : <Navigate to="/login" />} 
        />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;