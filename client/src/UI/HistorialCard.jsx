import React from 'react';
import { Clipboard, User, Calendar } from 'lucide-react';

export const HistorialCard = ({ receta }) => {
  const fecha = new Date(receta.fecha_registro).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="bg-white rounded-[3rem] p-8 border border-white shadow-xl shadow-blue-900/5 relative overflow-hidden group hover:scale-[1.01] transition-all">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
        <Clipboard size={120}/>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-md">
            Folio Receta #{receta.id_receta}
          </span>
          <div className="flex items-center gap-2 mt-3 text-slate-400">
            <Calendar size={14} />
            <span className="text-xs font-black uppercase tracking-tighter">{fecha}</span>
          </div>
        </div>
        <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Distancia Pupilar</p>
            <p className="text-2xl font-black text-blue-600 tracking-tighter">{receta.dp} <span className="text-sm">mm</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Ojo Derecho */}
        <div className="bg-slate-50 p-6 rounded-[2rem] border border-white shadow-inner">
          <h4 className="text-[10px] font-black text-blue-600 uppercase mb-4 flex items-center gap-2">
             <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div> Ojo Derecho (OD)
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white p-2 rounded-xl shadow-sm"><p className="text-[9px] font-black text-slate-400 uppercase">Esf</p><p className="font-black text-slate-800">{receta.esf_od}</p></div>
            <div className="bg-white p-2 rounded-xl shadow-sm"><p className="text-[9px] font-black text-slate-400 uppercase">Cil</p><p className="font-black text-slate-800">{receta.cil_od}</p></div>
            <div className="bg-white p-2 rounded-xl shadow-sm"><p className="text-[9px] font-black text-slate-400 uppercase">Eje</p><p className="font-black text-slate-800">{receta.eje_od}°</p></div>
          </div>
        </div>

        {/* Ojo Izquierdo */}
        <div className="bg-slate-50 p-6 rounded-[2rem] border border-white shadow-inner">
          <h4 className="text-[10px] font-black text-indigo-600 uppercase mb-4 flex items-center gap-2">
            <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div> Ojo Izquierdo (OI)
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white p-2 rounded-xl shadow-sm"><p className="text-[9px] font-black text-slate-400 uppercase">Esf</p><p className="font-black text-slate-800">{receta.esf_oi}</p></div>
            <div className="bg-white p-2 rounded-xl shadow-sm"><p className="text-[9px] font-black text-slate-400 uppercase">Cil</p><p className="font-black text-slate-800">{receta.cil_oi}</p></div>
            <div className="bg-white p-2 rounded-xl shadow-sm"><p className="text-[9px] font-black text-slate-400 uppercase">Eje</p><p className="font-black text-slate-800">{receta.eje_oi}°</p></div>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t border-slate-100 pt-6">
        <div>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Motivo de la consulta</p>
          <p className="text-sm font-bold text-slate-700">{receta.motivo}</p>
        </div>
        <div>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Observaciones del especialista</p>
          <p className="text-sm font-bold text-slate-500 leading-relaxed italic">"{receta.observaciones}"</p>
        </div>
        <div className="flex items-center gap-2 pt-4">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <User size={14} />
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Atendido por: {receta.atendido_por}</span>
        </div>
      </div>
    </div>
  );
};