import React from 'react';
import { Edit3, Trash2, Layers, AlertCircle, Image as ImageIcon } from 'lucide-react';

export const InventoryCard = ({ item, type, onEdit, onDelete, confirmDelete, setConfirmDelete }) => {
  const isProduct = type === 'productos';
  const itemId = isProduct ? item.id_producto : item.id_categoria;

  return (
    <div className="relative group">
      {/* Botón Eliminar Flotante */}
      <button 
        onClick={() => setConfirmDelete(itemId)}
        className="absolute -top-3 -right-3 z-10 p-3 bg-white text-slate-300 hover:text-red-500 rounded-2xl shadow-lg border border-slate-50 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
      >
        <Trash2 size={16} />
      </button>

      {/* Label de Confirmación de Borrado */}
      {confirmDelete === itemId && (
        <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-200">
          <AlertCircle className="text-red-500 mb-2" size={32} />
          <p className="text-sm font-black text-slate-900 uppercase tracking-tighter leading-tight">¿Eliminar este registro?</p>
          <p className="text-[10px] font-bold text-slate-400 mb-4 uppercase">Esta acción no se puede deshacer</p>
          <div className="flex gap-2 w-full">
            <button onClick={() => setConfirmDelete(null)} className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-200 transition-all">Cancelar</button>
            <button onClick={onDelete} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-red-200 hover:bg-red-600 transition-all">Eliminar</button>
          </div>
        </div>
      )}

      {isProduct ? (
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white">
          <div className="h-44 bg-slate-50 rounded-3xl mb-6 flex items-center justify-center relative group-hover:bg-blue-50 transition-colors">
            <ImageIcon size={48} className="text-slate-200 group-hover:text-blue-200 transition-colors" />
            <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full border border-blue-50">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Stock: {item.stock}</span>
            </div>
          </div>
          <h3 className="text-lg font-black text-slate-800 tracking-tight mb-1">{item.nombre}</h3>
          <p className="text-xs font-bold text-slate-400 mb-6 line-clamp-1 italic">{item.descripcion}</p>
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <span className="text-2xl font-black text-slate-900 tracking-tighter">${item.precio}</span>
            <button onClick={() => onEdit(item)} className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2">
              <Edit3 size={14}/> Editar
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white flex justify-between items-center group/cat">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers size={20}/>
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">{item.nombre}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.descripcion}</p>
            </div>
          </div>
          <button onClick={() => onEdit(item)} className="p-3 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
            <Edit3 size={18}/>
          </button>
        </div>
      )}
    </div>
  );
};