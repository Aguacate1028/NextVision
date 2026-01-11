import React from 'react';
import { Clock, Calendar as CalIcon, Trash2, CheckCircle2, User } from 'lucide-react';

export const CitaClienteCard = ({ cita, onCancel }) => {
  const isCompleted = cita.estado === 'Completada';
  const date = new Date(cita.fecha_hora);

  return (
    <div className={`p-8 bg-white rounded-[3rem] border-2 transition-all relative overflow-hidden ${
      isCompleted ? 'border-transparent opacity-75 shadow-sm' : 'border-blue-50 shadow-xl shadow-blue-900/5'
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
          isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
        }`}>
          {cita.estado}
        </div>
        {isCompleted && <CheckCircle2 className="text-green-500" size={20} />}
      </div>

      <div className="space-y-1 mb-6">
        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none">Motivo</p>
        <h3 className="text-xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
          {cita.descripcion}
        </h3>
      </div>
      
      <div className="flex flex-col gap-3 mb-8 bg-slate-50 p-4 rounded-3xl border border-white shadow-inner">
        <div className="flex items-center gap-3 text-slate-500">
          <CalIcon size={16} className="text-blue-600" />
          <span className="text-xs font-black uppercase tracking-tighter">{date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <Clock size={16} className="text-blue-600" />
          <span className="text-xs font-black text-slate-700 tracking-widest">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} HRS</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500 border-t border-slate-200 pt-2 mt-1">
          <User size={16} className="text-blue-600" />
          <span className="text-[10px] font-bold text-slate-500 uppercase italic">Atendido por: {cita.personal.nombres}</span>
        </div>
      </div>

      {!isCompleted && (
        <button 
          onClick={() => onCancel(cita)}
          className="w-full py-4 bg-red-50 text-red-500 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <Trash2 size={14} /> Cancelar Cita
        </button>
      )}
    </div>
  );
};