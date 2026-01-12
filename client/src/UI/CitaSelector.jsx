import React from 'react';
import { Clock, ChevronRight, Hash } from 'lucide-react';

export const CitaSelector = ({ cita, onSelect, isSelected }) => {
  // Extraemos el nombre o email
  const emailCliente = cita?.usuario?.email || 'Sin Correo';
  const nombreMostrable = emailCliente.split('@')[0]; // Opcional: muestra "santiago" en vez de "santiago@mail.com"
  const inicial = nombreMostrable.charAt(0).toUpperCase();

  return (
    <button 
      onClick={() => onSelect(cita)}
      // Añadimos mb-3 para que no se peguen en la lista
      className={`w-full p-5 rounded-[2.2rem] border-2 transition-all flex items-center justify-between group mb-3 ${
        isSelected 
          ? 'border-blue-600 bg-blue-50 shadow-xl shadow-blue-900/10 scale-[1.02]' 
          : 'border-transparent bg-white hover:border-blue-100 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Avatar con rotación ligera si está seleccionado para dar dinamismo */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all ${
          isSelected ? 'bg-blue-600 text-white rotate-3' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100'
        }`}>
          {inicial}
        </div>

        <div className="text-left">
          <div className="flex items-center gap-2">
            <p className={`text-sm font-black uppercase tracking-tighter ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
              {nombreMostrable}
            </p>
            {/* Pequeño badge con el ID para diferenciar citas del mismo usuario */}
            <span className="text-[9px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded font-bold">
              #{cita?.id_consulta}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-1">
             <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
              <Clock size={10} className={isSelected ? 'text-blue-500' : ''} /> 
              {cita?.fecha_hora 
                ? new Date(cita.fecha_hora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
                : '--:--'} HRS
            </p>
          </div>
        </div>
      </div>
      
      <div className={`transition-transform duration-300 ${isSelected ? 'translate-x-1' : ''}`}>
        <ChevronRight size={18} className={isSelected ? 'text-blue-600' : 'text-slate-200'} />
      </div>
    </button>
  );
};