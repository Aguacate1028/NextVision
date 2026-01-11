import React from 'react';
import { Edit3, Mail, Briefcase, UserCheck } from 'lucide-react';

export const EmployeeCard = ({ empleado, onEdit }) => {
  return (
    <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-white hover:scale-[1.02] transition-all group relative overflow-hidden">
      {/* Badge de Rol */}
      <div className="absolute top-6 right-8 bg-blue-50 px-4 py-1.5 rounded-full flex items-center gap-2">
        <UserCheck size={12} className="text-blue-600" />
        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
          {empleado.usuario.rol}
        </span>
      </div>

      <div className="flex flex-col items-center text-center">
        {/* Avatar Circular */}
        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
          <span className="text-2xl font-black uppercase">
            {empleado.nombres.charAt(0)}
          </span>
        </div>

        <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-1">
          {empleado.nombres}
        </h3>
        <p className="text-sm font-bold text-slate-400 mb-6 tracking-tight">
          {empleado.apellidos}
        </p>

        <div className="w-full space-y-3 mb-8">
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-white shadow-sm">
            <Briefcase size={16} className="text-blue-500" />
            <span className="text-xs font-bold text-slate-600">{empleado.puesto}</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-white shadow-sm">
            <Mail size={16} className="text-blue-500" />
            <span className="text-xs font-bold text-slate-600 truncate">{empleado.usuario.email}</span>
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