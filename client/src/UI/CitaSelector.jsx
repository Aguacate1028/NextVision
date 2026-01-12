import React from 'react';
import { User, Clock, ChevronRight } from 'lucide-react';

export const CitaSelector = ({ cita, onSelect, isSelected }) => {
  // Usamos 'usuario' que es como viene de tu tabla, y agregamos fallback 'P' por si no hay nombre
  const nombreCiente = cita?.usuario?.email || 'Paciente';
  const inicial = nombreCiente.charAt(0).toUpperCase();

  return (
    <button 
      onClick={() => onSelect(cita)}
      className={`w-full p-5 rounded-[2rem] border-2 transition-all flex items-center justify-between group ${
        isSelected 
          ? 'border-blue-600 bg-blue-50 shadow-lg scale-[1.02]' 
          : 'border-transparent bg-white hover:border-blue-100 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-colors ${
          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
        }`}>
          {inicial}
        </div>
        <div className="text-left">
          <p className="text-sm font-black text-slate-800 uppercase tracking-tighter">
            {nombreCiente}
          </p>
          <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
            <Clock size={10} /> 
            {cita?.fecha_hora 
              ? new Date(cita.fecha_hora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
              : '--:--'} hrs
          </p>
        </div>
      </div>
      <ChevronRight size={18} className={isSelected ? 'text-blue-600' : 'text-slate-200'} />
    </button>
  );
};