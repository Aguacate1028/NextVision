import React from 'react';
import { Edit3, Mail, Briefcase, UserCheck, Shield } from 'lucide-react';

export const EmployeeCard = ({ empleado, onEdit }) => {
  return (
    <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-white hover:scale-[1.02] transition-all group relative overflow-hidden">
      
      {/* Badge de Rol - CORREGIDO: empleado.rol en lugar de empleado.usuario.rol */}
      <div className={`absolute top-6 right-8 px-4 py-1.5 rounded-full flex items-center gap-2 ${
        empleado.rol === 'Administrador' ? 'bg-amber-50' : 'bg-blue-50'
      }`}>
        {empleado.rol === 'Administrador' ? (
            <Shield size={12} className="text-amber-600" />
        ) : (
            <UserCheck size={12} className="text-blue-600" />
        )}
        <span className={`text-[9px] font-black uppercase tracking-widest ${
            empleado.rol === 'Administrador' ? 'text-amber-600' : 'text-blue-600'
        }`}>
          {empleado.rol || 'Staff'}
        </span>
      </div>

      <div className="flex flex-col items-center text-center">
        {/* Avatar Circular */}
        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
          <span className="text-2xl font-black uppercase">
            {empleado.nombres ? empleado.nombres.charAt(0) : 'U'}
          </span>
        </div>

        <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-1">
          {empleado.nombres}
        </h3>
        <p className="text-sm font-bold text-slate-400 mb-6 tracking-tight">
          {empleado.apellidos}
        </p>

        <div className="w-full space-y-3 mb-8">
          {/* Puesto */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-white shadow-sm">
            <Briefcase size={16} className="text-blue-500" />
            <span className="text-xs font-bold text-slate-600">
                {empleado.puesto || 'Sin puesto asignado'}
            </span>
          </div>

          {/* Correo - CORREGIDO: empleado.correo en lugar de empleado.usuario.email */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-white shadow-sm">
            <Mail size={16} className="text-blue-500" />
            <span className="text-xs font-bold text-slate-600 truncate">
                {empleado.correo}
            </span>
          </div>
        </div>

        <button 
          onClick={() => onEdit(empleado)}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <Edit3 size={14} /> Editar Perfil
        </button>
      </div>
    </div>
  );
};