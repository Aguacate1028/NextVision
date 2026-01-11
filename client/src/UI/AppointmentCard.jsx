import React from 'react';
import { Calendar, Clock, User, Phone, Edit2, CheckCircle2 } from 'lucide-react';

export const AppointmentCard = ({ cita, onReschedule }) => {
  const isCompleted = cita.estado === 'Completada';
  const date = new Date(cita.fecha_hora);

  return (
    <div className={`p-6 rounded-[2.5rem] bg-white border-2 transition-all hover:shadow-xl ${isCompleted ? 'border-green-100' : 'border-blue-50 shadow-blue-900/5'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-600 text-white'}`}>
          {cita.estado}
        </div>
        <div className="text-slate-400">
           {isCompleted ? <CheckCircle2 size={20} className="text-green-500" /> : <Clock size={20} />}
        </div>
      </div>

      <h3 className="text-lg font-black text-slate-900 tracking-tight mb-4 flex items-center gap-2">
        <User size={18} className="text-blue-600" />
        {cita.cliente.nombres} {cita.cliente.apellidos}
      </h3>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-slate-500">
          <Calendar size={14} />
          <span className="text-xs font-bold">{date.toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <Clock size={14} />
          <span className="text-xs font-bold">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <Phone size={14} />
          <span className="text-xs font-bold">{cita.cliente.telefono}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-50 flex gap-2">
        {!isCompleted && (
          <button 
            onClick={() => onReschedule(cita)}
            className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Edit2 size={14} /> Reagendar
          </button>
        )}
      </div>
    </div>
  );
};