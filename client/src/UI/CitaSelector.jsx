import React from 'react';
import { User, Clock, ChevronRight } from 'lucide-react';

export const CitaSelector = ({ cita, onSelect, isSelected }) => (
  <button 
    onClick={() => onSelect(cita)}
    className={`w-full p-5 rounded-[2rem] border-2 transition-all flex items-center justify-between group ${
      isSelected ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-transparent bg-white hover:border-blue-100 shadow-sm'
    }`}
  >
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
        {cita.cliente.nombres.charAt(0)}
      </div>
      <div className="text-left">
        <p className="text-sm font-black text-slate-800 uppercase tracking-tighter">
          {cita.cliente.nombres} {cita.cliente.apellidos}
        </p>
        <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
          <Clock size={10} /> {new Date(cita.fecha_hora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} hrs
        </p>
      </div>
    </div>
    <ChevronRight size={18} className={isSelected ? 'text-blue-600' : 'text-slate-200'} />
  </button>
);