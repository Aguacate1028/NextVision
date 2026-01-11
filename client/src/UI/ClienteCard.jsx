import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, Trash2, AlertCircle } from 'lucide-react';

export const ClienteCard = ({ cliente, onOpenRecetas, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white hover:scale-[1.02] transition-all group relative overflow-hidden">
      
      {/* Burbuja de Confirmación de Borrado */}
      {confirmDelete && (
        <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-200">
          <AlertCircle className="text-red-500 mb-2" size={32} />
          <p className="text-sm font-black text-slate-900 uppercase tracking-tighter leading-tight">¿Eliminar Cliente?</p>
          <p className="text-[10px] font-bold text-slate-400 mb-4 uppercase">Se borrarán todas sus recetas y citas</p>
          <div className="flex gap-2 w-full">
            <button 
              onClick={() => setConfirmDelete(false)} 
              className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              Cancelar
            </button>
            <button 
              onClick={() => {
                onDelete(cliente.id_cliente);
                setConfirmDelete(false);
              }}
              className="flex-1 py-3 bg-red-500 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-red-200 hover:bg-red-600 transition-all"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">
          {cliente.nombres.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-black text-slate-900 leading-tight">{cliente.nombres} {cliente.apellidos}</h3>
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{cliente.email}</span>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3 text-slate-500 font-bold text-xs">
          <Phone size={14} className="text-blue-400" /> {cliente.telefono}
        </div>
        <div className="flex items-center gap-3 text-slate-500 font-bold text-xs">
          <MapPin size={14} className="text-blue-400" /> {cliente.direccion}
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => onOpenRecetas(cliente)}
          className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <FileText size={14}/> Ver Recetas
        </button>
        <button 
          onClick={() => setConfirmDelete(true)}
          className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
        >
          <Trash2 size={16}/>
        </button>
      </div>
    </div>
  );
};