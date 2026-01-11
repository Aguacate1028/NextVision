import React from 'react';
import { ShoppingCart, Image as ImageIcon } from 'lucide-react';

export const VentaCard = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white hover:scale-[1.02] transition-all group">
      <div className="h-44 bg-slate-50 rounded-3xl mb-6 flex items-center justify-center relative group-hover:bg-blue-50 transition-colors">
        <ImageIcon size={48} className="text-slate-200 group-hover:text-blue-200 transition-colors" />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full border border-blue-50">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
            Stock: {item.stock}
          </span>
        </div>
      </div>
      
      <h3 className="text-lg font-black text-slate-800 tracking-tight mb-1">{item.nombre}</h3>
      <p className="text-xs font-bold text-slate-400 mb-6 line-clamp-1 italic">{item.descripcion}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <span className="text-2xl font-black text-slate-900 tracking-tighter">${item.precio}</span>
        <button 
          onClick={() => onAddToCart(item)}
          disabled={item.stock <= 0}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-2 disabled:bg-slate-200 disabled:translate-y-0"
        >
          <ShoppingCart size={14}/> Agregar
        </button>
      </div>
    </div>
  );
};