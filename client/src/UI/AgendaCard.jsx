import React from 'react';
import { Clock, Phone, Calendar as CalIcon, Edit, CheckCircle } from 'lucide-react';

export const AgendaCard = ({ cita, onRechedule }) => {
  // Ajustamos para que reconozca 'Finalizada' (de tu DB) o 'Completada'
  const isCompleted = cita.estado === 'Finalizada' || cita.estado === 'Completada';
  const date = new Date(cita.fecha_hora);

  return (
    <div className={`p-6 rounded-[2.5rem] border-2 transition-all ${
      isCompleted 
        ? 'bg-white border-green-100 shadow-sm' // Borde suave verde si está terminada
        : 'bg-white border-blue-50 shadow-xl shadow-blue-900/5'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          isCompleted 
            ? 'bg-green-100 text-green-600' 
            : 'bg-blue-100 text-blue-600'
        }`}>
          {/* Mostramos 'Completada' visualmente aunque en DB diga 'Finalizada' */}
          {isCompleted ? 'Completada' : cita.estado}
        </div>
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">
          ID-00{cita.id_consulta}
        </span>
      </div>

      <h3 className="text-lg font-black text-slate-900 leading-tight mb-1">
        {/* Usamos encadenamiento opcional ?. por si el objeto usuario/cliente viene nulo */}
        {cita.usuario?.email.split('@')[0] || 'Paciente'} 
      </h3>
      
      <div className="flex items-center gap-2 text-blue-600 mb-4">
        <Phone size={14} />
        <span className="text-xs font-bold">{cita.cliente?.telefono || 'Sin teléfono'}</span>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-3 text-slate-500">
          <CalIcon size={16} />
          <span className="text-xs font-bold">{date.toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <Clock size={16} />
          <span className="text-xs font-black text-slate-700">
            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} hrs
          </span>
        </div>
      </div>

      {/* Solo mostramos el botón si la cita NO está completada/finalizada */}
      {!isCompleted ? (
        <button 
          onClick={() => onRechedule(cita)}
          className="w-full py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
        >
          <Edit size={14} /> Reagendar
        </button>
      ) : (
        <div className="w-full py-3 bg-green-50 text-green-600 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 border border-green-100">
          <CheckCircle size={14} /> Consulta Exitosa
        </div>
      )}
    </div>
  );
};