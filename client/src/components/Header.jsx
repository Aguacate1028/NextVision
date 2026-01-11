import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, ShoppingBag, Calendar, FileClock, ClipboardList, 
  Users, BadgeDollarSign, LayoutDashboard, TrendingUp, 
  LogOut, User, ChevronDown, Clock
} from 'lucide-react';
import logoImg from '../assets/logo.png';

const Header = ({ 
    isLoggedIn, 
    user,         
    userRole, // 'Cliente', 'Empleado', 'Administrador'
    onLogout 
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    // --- MANEJADORES DE NAVEGACIÓN ---
    const handleLogoClick = () => {
        if (!isLoggedIn) {
            navigate('/');
        }
    };

    const handleLoginClick = () => navigate('/login');

    const menuItems = useMemo(() => {
        if (!isLoggedIn) return [
            { id: 'home', label: 'Inicio', icon: Home, path: '/' },
            { id: 'catalogo', label: 'Catálogo', icon: ShoppingBag, path: '/catalogo' },
        ];

        const roles = {
            Cliente: [
                { id: 'u-citas', label: 'Citas', icon: Calendar, path: '/citas' },
                { id: 'u-historial', label: 'Historial', icon: FileClock, path: '/historial' },
                { id: 'u-catalogo', label: 'Catálogo', icon: ShoppingBag, path: '/catalogo' },
            ],
            Empleado: [
                { id: 'e-agenda', label: 'Agenda', icon: Calendar, path: '/agenda' },
                { id: 'e-clientes', label: 'Clientes', icon: Users, path: '/clientes' },
                { id: 'e-ventas', label: 'Ventas', icon: BadgeDollarSign, path: '/ventas' },
                { id: 'e-consulta', label: 'Consulta', icon: ClipboardList, path: '/consulta' },
            ],
            Administrador: [
                { id: 'a-finanzas', label: 'Finanzas', icon: TrendingUp, path: '/finanzas' },
                { id: 'a-inventario', label: 'Inventario', icon: ShoppingBag, path: '/admin-inventario' },
                { id: 'a-empleados', label: 'Empleados', icon: Users, path: '/admin-empleados' },
                { id: 'a-horarios', label: 'Horarios', icon: Clock, path: '/admin-horarios' },
            ]
        };

        return roles[userRole] || [];
    }, [isLoggedIn, userRole]);

    const handleNavigation = (path) => {
        navigate(path);
        setShowProfileDropdown(false);
    };

    const displayName = useMemo(() => {
    const email = user?.email || '';
    if (email) {
        return email.split('@')[0]; 
    }
    return 'Usuario';
}, [user]);

    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-blue-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                
                {/* LOGO */}
                <div 
                    onClick={handleLogoClick} 
                    className={`flex items-center gap-2 ${!isLoggedIn ? 'cursor-pointer group' : 'cursor-default'}`}
                >
                    <img 
                        src={logoImg} 
                        alt="NextVision Logo" 
                        className={`h-10 object-contain ${!isLoggedIn ? 'group-hover:scale-110 transition-transform' : ''}`} 
                    />
                    <span className="text-xl font-black text-slate-900 hidden sm:block">
                        Next<span className="text-blue-600">Vision</span>
                    </span>
                </div>

                {/* NAVEGACIÓN CENTRAL */}
                <nav className="hidden md:flex items-center gap-1">
                    {menuItems.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item.path)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                                    active 
                                    ? 'bg-blue-50 text-blue-600' 
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                                }`}
                            >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* ACCIONES DERECHA */}
                <div className="flex items-center gap-4">
                    {!isLoggedIn ? (
                        <button 
                            onClick={handleLoginClick} 
                            className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                        >
                            Iniciar Sesión
                        </button>
                    ) : (
                        <div className="relative">
                            <button 
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                className="flex items-center gap-2 p-1 pr-3 bg-slate-50 rounded-full border border-slate-200 hover:border-blue-300 transition-all"
                            >
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-black shadow-sm uppercase">
                                    {displayName.charAt(0)}
                                </div>
                                <div className="hidden lg:block text-left">
                                    <p className="text-[11px] font-black text-slate-900 leading-none mb-0.5">{displayName}</p>
                                    <p className="text-[9px] text-blue-600 font-black uppercase tracking-wider">{userRole}</p>
                                </div>
                                <ChevronDown size={14} className={`text-slate-400 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {showProfileDropdown && (
                                <div className="absolute right-0 mt-3 w-48 bg-white rounded-[25px] shadow-xl border border-blue-50 py-3 z-[60] animate-in fade-in zoom-in duration-200 origin-top-right">
                                    
                                    {/* SECCIÓN CONDICIONAL: Solo para Clientes */}
                                    {userRole === 'Cliente' && (
                                        <button 
                                            onClick={() => handleNavigation('/dashboard')} 
                                            className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all font-black"
                                        >
                                            <User size={16} /> Mi Perfil
                                        </button>
                                    )}
                                    
                                    <button 
                                        onClick={() => { 
                                            setShowProfileDropdown(false);
                                            onLogout();
                                        }} 
                                        className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 font-black transition-all ${userRole === 'Cliente' ? 'border-t border-slate-50' : ''}`}
                                    >
                                        <LogOut size={16} /> Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;