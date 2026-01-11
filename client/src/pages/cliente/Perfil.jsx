import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Lock, Save, Loader2, ShieldCheck } from 'lucide-react';
import { perfilMock } from '../../mocks/perfilMock';
import { Input } from '../../UI/input';

const Perfil = () => {
  const [perfil, setPerfil] = useState(perfilMock);
  const [loading, setLoading] = useState(false);

  const iniciales = (perfil.nombres.charAt(0) + perfil.apellidos.charAt(0)).toUpperCase();

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("¡Perfil actualizado con éxito!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center gap-8">
          {/* Avatar con Iniciales */}
          <div className="w-32 h-32 bg-blue-600 rounded-[3rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-200 border-4 border-white animate-in zoom-in duration-500">
            {iniciales}
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
              Mi <span className="text-blue-600">Perfil</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs tracking-[0.2em] mt-1 uppercase">
              Gestiona tu información y seguridad
            </p>
          </div>
        </header>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* SECCIÓN 1: Información Personal */}
          <section className="bg-white p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-white space-y-6">
            <div className="flex items-center gap-3 border-b border-blue-50 pb-4 mb-4">
              <User size={20} className="text-blue-600" />
              <h3 className="font-black text-slate-800 uppercase text-sm tracking-widest">Datos Personales</h3>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Nombre(s)</label>
              <Input defaultValue={perfil.nombres} placeholder="Nombres" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Apellidos</label>
              <Input defaultValue={perfil.apellidos} placeholder="Apellidos" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Teléfono de contacto</label>
              <Input defaultValue={perfil.telefono} placeholder="Teléfono" icon={<Phone size={14}/>} />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Dirección de envío/domicilio</label>
              <textarea 
                className="w-full mt-2 bg-slate-50 border-none rounded-[2rem] px-8 py-5 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 h-24 resize-none shadow-inner"
                defaultValue={perfil.direccion}
              />
            </div>
          </section>

          {/* SECCIÓN 2: Seguridad y Cuenta */}
          <div className="space-y-8">
            <section className="bg-white p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-white space-y-6">
              <div className="flex items-center gap-3 border-b border-blue-50 pb-4 mb-4">
                <ShieldCheck size={20} className="text-blue-600" />
                <h3 className="font-black text-slate-800 uppercase text-sm tracking-widest">Seguridad</h3>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Correo Electrónico</label>
                <div className="relative opacity-60">
                  <Input value={perfil.email} disabled className="bg-slate-100" />
                  <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Nueva Contraseña</label>
                <Input type="password" placeholder="••••••••" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-5">Confirmar Contraseña</label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </section>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.25em] shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:bg-slate-300"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Guardar Cambios
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Perfil;