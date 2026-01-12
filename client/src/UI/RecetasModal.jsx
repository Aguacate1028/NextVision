import React, { useState, useEffect } from 'react';
import { X, FileText, Loader2, Calendar, Eye, Clipboard, Hash } from 'lucide-react';

export const RecetasModal = ({ cliente, onClose }) => {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cliente?.id_usuario) {
      fetchHistorial();
    }
  }, [cliente]);

  const fetchHistorial = async () => {
    setLoading(true);
    try {
      // Esta ruta debe hacer el JOIN entre consulta y receta en tu backend
      const response = await fetch(`http://localhost:5000/api/users/recetas/usuario/${cliente.id_usuario}`);
      if (!response.ok) throw new Error('Error al obtener historial');
      const data = await response.json();
      setRecetas(data);
    } catch (error) {
      console.error("Error cargando historial:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!cliente) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col border border-white">
        
        {/* CABECERA */}
        <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-white">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-blue-200">
              <FileText size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Historial Clínico</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-blue-600 font-black text-xs uppercase tracking-[0.2em]">
                  {cliente.nombres} {cliente.apellidos}
                </p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-4 bg-slate-50 hover:bg-red-50 hover:text-red-500 text-slate-400 rounded-2xl transition-all duration-300">
            <X size={28} />
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="p-10 overflow-y-auto bg-[#FBFDFF] space-y-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="animate-spin mb-4 text-blue-600" size={48} />
              <p className="font-black text-xs uppercase tracking-widest text-slate-400">Sincronizando expedientes...</p>
            </div>
          ) : recetas.length > 0 ? (
            recetas.map((r) => (
              <div key={r.id_receta} className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                  <div className="flex items-center gap-3 bg-blue-50 px-6 py-2.5 rounded-full border border-blue-100/50">
                    <Calendar size={16} className="text-blue-600" />
                    <span className="text-blue-700 font-black text-[11px] uppercase tracking-widest">
                      {new Date(r.fecha_registro).toLocaleDateString('es-MX', { 
                        day: '2-digit', month: 'long', year: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="text-slate-300 font-black text-[10px] uppercase">
                    <Hash size={12} className="inline mr-1" /> ID-{r.id_receta}
                  </div>
                </div>

                {/* GRADUACIÓN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Ojo Derecho */}
                  <div className="bg-slate-50/50 p-6 rounded-[2.2rem] border border-white shadow-inner">
                    <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-4">Ojo Derecho (OD)</h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white p-3 rounded-2xl shadow-sm">
                        <p className="text-[9px] text-slate-400 font-black uppercase">Esf</p>
                        <p className="font-black text-slate-900">{r.esf_od}</p>
                      </div>
                      <div className="bg-white p-3 rounded-2xl shadow-sm">
                        <p className="text-[9px] text-slate-400 font-black uppercase">Cil</p>
                        <p className="font-black text-slate-900">{r.cil_od}</p>
                      </div>
                      <div className="bg-white p-3 rounded-2xl shadow-sm">
                        <p className="text-[9px] text-slate-400 font-black uppercase">Eje</p>
                        <p className="font-black text-slate-900">{r.eje_od}°</p>
                      </div>
                    </div>
                  </div>

                  {/* Ojo Izquierdo */}
                  <div className="bg-slate-50/50 p-6 rounded-[2.2rem] border border-white shadow-inner">
                    <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-4">Ojo Izquierdo (OI)</h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white p-3 rounded-2xl shadow-sm">
                        <p className="text-[9px] text-slate-400 font-black uppercase">Esf</p>
                        <p className="font-black text-slate-900">{r.esf_oi}</p>
                      </div>
                      <div className="bg-white p-3 rounded-2xl shadow-sm">
                        <p className="text-[9px] text-slate-400 font-black uppercase">Cil</p>
                        <p className="font-black text-slate-900">{r.cil_oi}</p>
                      </div>
                      <div className="bg-white p-3 rounded-2xl shadow-sm">
                        <p className="text-[9px] text-slate-400 font-black uppercase">Eje</p>
                        <p className="font-black text-slate-900">{r.eje_oi}°</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-blue-600 uppercase flex items-center gap-2">
                      <Eye size={12} /> DP: {r.dp} mm
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-black text-blue-600 uppercase flex items-center gap-2">
                      <Clipboard size={12} /> Motivo:
                    </span>
                    <p className="text-sm font-bold text-slate-700">{r.motivo || 'No especificado'}</p>
                  </div>
                </div>

                {r.observaciones && (
                  <div className="mt-4 p-4 bg-yellow-50/50 rounded-2xl border border-yellow-100">
                    <p className="text-xs text-slate-500 italic">"{r.observaciones}"</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-32 border-4 border-dashed border-slate-50 rounded-[4rem]">
              <FileText size={40} className="text-slate-200 mb-4" />
              <h3 className="text-xl font-black text-slate-400 uppercase">Sin registros</h3>
              <p className="text-slate-300 text-xs font-bold uppercase mt-2">No hay recetas para este paciente</p>
            </div>
          )}
        </div>

        <div className="p-8 bg-white border-t border-slate-50 text-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Sistema Óptico © 2026</p>
        </div>
      </div>
    </div>
  );
};