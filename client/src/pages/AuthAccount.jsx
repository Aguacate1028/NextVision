import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook necesario
import { supabase } from '../lib/supabaseClient';
import { toast } from 'sonner';
import mascotVideo from '../assets/mascota.mp4';
import '../styles/auth.css';

export function AuthAccount({ onAuthSuccess }) {
    const navigate = useNavigate(); // <-- Inicialización obligatoria
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    
    // Función corregida para el botón volver
    const handleHomeClick = () => navigate('/');
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nombre: '',
        apellidos: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Credenciales incorrectas');
        }

        // 1. Notificación de éxito
        toast.success("¡Bienvenido de nuevo!");
        
        // 2. Avisar a la App que el usuario ya entró (si usas esa función)
        if (onAuthSuccess) {
            onAuthSuccess(result.user, result.session);
        }

        // 3. ¡LA REDIRECCIÓN! 
        // Asegúrate de que '/' sea la ruta donde está tu Home.jsx

        const role = result.user?.user_metadata?.rol || 'Cliente';

        setTimeout(() => {
            if (role === 'Administrador') {
                navigate('/finanzas');
            } else if (role === 'Empleado') {
                navigate('/Empleado');
            } else {
                navigate('/catalogo'); // O '/' si quieres el Home para clientes
            }
        }, 500);

    } catch (error) {
        toast.error("Error: " + error.message);
    } finally {
        setIsLoading(false);
    }
};

    const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        // LLAMADA A TU BACKEND (Servidor Node.js)
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                nombre: formData.nombre,
                apellidos: formData.apellidos
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Error en el servidor');
        }

        toast.success("Cuenta creada en el servidor. ¡Inicia sesión!");
        setIsLogin(true);

    } catch (error) {
        toast.error(error.message);
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className="auth-page-container">
            
            <div className="auth-screen">
                <div className="auth-main-container">
                    <div className="video-section">
                        <video 
                            src={mascotVideo} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="mascot-video"
                        />
                    </div>

                    <div className="drop-container">
                        <div className="drop">
                            <div className="content">
                                <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
                                <form onSubmit={isLogin ? handleLogin : handleSignup}>
                                    {!isLogin && (
                                        <>
                                            <div className="inputBox">
                                                <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
                                            </div>
                                            <div className="inputBox">
                                                <input type="text" name="apellidos" placeholder="Apellidos" onChange={handleChange} required />
                                            </div>
                                        </>
                                    )}
                                    <div className="inputBox">
                                        <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
                                    </div>
                                    <div className="inputBox">
                                        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
                                    </div>
                                    <div className="inputBox submitBox">
                                        <input type="submit" value={isLoading ? "..." : (isLogin ? "Entrar" : "Registrar")} />
                                    </div>
                                </form>
                            </div>
                        </div>

                        <button 
                            className="btn-toggle-auth" 
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Crear Cuenta" : "Ya tengo cuenta"}
                        </button>
                    </div>
                </div>

                {/* Botón Volver Corregido */}
                <button 
                    onClick={handleHomeClick} 
                    className="fixed bottom-8 left-8 px-6 py-3 bg-white hover:bg-blue-50 transition-colors rounded-full shadow-2xl text-blue-600 font-black z-50 border border-blue-100 cursor-pointer"
                >
                    ← Volver
                </button>
            </div>
        </div>
    );
}