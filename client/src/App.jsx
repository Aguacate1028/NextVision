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

// --- SECCIÓN ADMIN / EMPLEADO ---
// Importamos Finanzas.jsx para el Administrador
import FinanzasPage from './pages/admin/Finanzas'; 
import InventarioAdmin from './pages/admin/Inventario';
import Empleados from './pages/admin/Empleados';
import Horarios from './pages/admin/Horarios';


const projectId = "elfjdjvqiyzbhmansocl";
const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZmpkanZxaXl6YmhtYW5zb2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MjQwOTIsImV4cCI6MjA4MzIwMDA5Mn0.VWRqoccwsb4MEX7zsUwOUUFoFK6kE8ea4LMxdqNUCLA";

const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey);

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const savedUser = localStorage.getItem('sessionUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  // 🔁 Lógica de redirección por Rol
  const redirectByRole = (role) => {
    switch (role) {
      case 'Administrador':
        navigate('/finanzas'); // <--- Manda al Admin a Finanzas
        break;
      case 'Empleado':
        navigate('/empleado');
        break;
      default:
        navigate('/catalogo');
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('sessionUser', JSON.stringify(userData));
    const role = userData?.user_metadata?.rol || 'Cliente';
    redirectByRole(role);
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
        {/* Rutas Públicas */}
        <Route path="/" element={<HomePage isLoggedIn={!!user} user={user} userRole={userRole} />} />
        <Route path="/catalogo" element={<CatalogPage isLoggedIn={!!user} user={user} userRole={userRole} />} />

        {/* 🔐 RUTA DE LOGIN (Control de acceso) */}
        <Route
          path="/login"
          element={
            !user ? (
              <AuthAccount onAuthSuccess={handleAuthSuccess} />
            ) : userRole === 'Administrador' ? (
              <Navigate to="/finanzas" replace /> // Redirige al Admin si ya está logueado
            ) : userRole === 'Empleado' ? (
              <Navigate to="/empleado" replace />
            ) : (
              <Navigate to="/catalogo" replace />
            )
          }
        />

        {/* 📊 RUTA DE FINANZAS (Solo Administrador) */}
        <Route
          path="/finanzas"
          element={
            user && userRole === 'Administrador'
              ? <FinanzasPage />
              : <Navigate to="/login" />
          }
        />

        {/* 👷 RUTA DE EMPLEADO (Solo Empleado) */}
        <Route
          path="/empleado"
          element={
            user && userRole === 'Empleado'
              ? <Empleados />
              : <Navigate to="/login" />
          }
        />

        {/* Otras rutas de administración */}
        <Route
          path="/admin-inventario"
          element={user && (userRole === 'Administrador' || userRole === 'Empleado') ? <InventarioAdmin /> : <Navigate to="/login" />}
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
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
      <Toaster />
    </>
  );
}

export default App;