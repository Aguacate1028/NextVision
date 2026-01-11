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
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        if (error) {
            toast.error("Acceso denegado: " + error.message);
        } else {
            toast.success("¡Bienvenido a NextVision!");
            onAuthSuccess(data.user, data.session);
        }
        setIsLoading(false);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // 1. Crear en Supabase Auth con metadatos de rol
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: { 
                data: { 
                    nombre: formData.nombre,
                    rol: 'Cliente' 
                } 
            }
        });

        if (error) {
            toast.error(error.message);
            setIsLoading(false);
            return;
        }

        // 2. Insertar en tu tabla 'cliente' de la base de datos (Postgres)
        // Nota: Asegúrate que el nombre de la tabla sea 'cliente' (minúscula)
        if (data.user) {
            const { error: dbError } = await supabase
                .from('cliente') 
                .insert([{
                    nombres: formData.nombre,
                    apellidos: formData.apellidos,
                    id_usuario: data.user.id // Vinculación con la tabla usuario/auth
                }]);
                
            if (dbError) {
                console.error("Error vinculando tabla cliente:", dbError);
                toast.error("Error al guardar perfil de cliente.");
            } else {
                toast.success("Cuenta creada. ¡Por favor inicia sesión!");
                setIsLogin(true);
            }
        }
        
        setIsLoading(false);
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