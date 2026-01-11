import React from 'react';
import { X, UserCircle2, Clipboard } from 'lucide-react';

export const RecetasModal = ({ cliente, onClose }) => {
  if (!cliente) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] p-10 shadow-2xl relative border border-white overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-red-500"><X size={28}/></button>
        
        <div className="flex items-center gap-4 mb-10 border-b border-slate-50 pb-6">
          <UserCircle2 size={40} className="text-blue-600" />
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Historial Clínico</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cliente.nombres} {cliente.apellidos}</p>
          </div>
        </div>

        {cliente.recetas && cliente.recetas.length > 0 ? (
          <div className="space-y-6">
            {cliente.recetas.map(r => (
              <div key={r.id_receta} className="bg-slate-50 rounded-[2rem] p-8 border border-white shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5"><Clipboard size={80}/></div>
                <div className="flex justify-between items-start mb-6">
                  <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-md">Receta #{r.id_receta}</span>
                  <span className="text-xs font-black text-slate-400 uppercase">{new Date(r.fecha_registro).toLocaleDateString()}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <h4 className="text-[10px] font-black text-blue-600 uppercase mb-3 border-b border-blue-50 pb-1">Ojo Derecho (OD)</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div><p className="text-[9px] font-black text-slate-400">ESF</p><p className="font-black text-slate-800">{r.esf_od}</p></div>
                      <div><p className="text-[9px] font-black text-slate-400">CIL</p><p className="font-black text-slate-800">{r.cil_od}</p></div>
                      <div><p className="text-[9px] font-black text-slate-400">EJE</p><p className="font-black text-slate-800">{r.eje_od}°</p></div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <h4 className="text-[10px] font-black text-blue-600 uppercase mb-3 border-b border-blue-50 pb-1">Ojo Izquierdo (OI)</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div><p className="text-[9px] font-black text-slate-400">ESF</p><p className="font-black text-slate-800">{r.esf_oi}</p></div>
                      <div><p className="text-[9px] font-black text-slate-400">CIL</p><p className="font-black text-slate-800">{r.cil_oi}</p></div>
                      <div><p className="text-[9px] font-black text-slate-400">EJE</p><p className="font-black text-slate-800">{r.eje_oi}°</p></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-500"><span className="text-blue-600 font-black uppercase text-[10px] mr-2">Motivo:</span> {r.motivo}</p>
                  <p className="text-xs font-bold text-slate-500"><span className="text-blue-600 font-black uppercase text-[10px] mr-2">Observaciones:</span> {r.observaciones}</p>
                  <div className="pt-4 mt-4 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter italic">Atendido por: {r.atendido_por}</span>
                    <p className="text-[10px] font-black text-slate-800 uppercase">DP: {r.dp}mm</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[2rem]">
            <p className="font-black text-slate-300 uppercase tracking-widest">Este cliente no tiene recetas registradas</p>
          </div>
        )}
      </div>
    </div>
  );
};