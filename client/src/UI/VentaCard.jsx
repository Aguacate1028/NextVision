import React from 'react';
import { ShoppingCart, Image as ImageIcon, AlertCircle } from 'lucide-react';

export const VentaCard = ({ item, onAddToCart }) => {
  // Verificamos si hay stock disponible
  const sinStock = item.stock <= 0;

  return (
    <div className={`bg-white p-6 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white hover:scale-[1.02] transition-all group ${sinStock ? 'opacity-75 grayscale-[0.5]' : ''}`}>
      
      {/* Contenedor de Imagen */}
      <div className="h-44 bg-slate-50 rounded-3xl mb-6 flex items-center justify-center relative overflow-hidden group-hover:bg-blue-50 transition-colors">
        {item.imagen_producto ? (
          <img 
            src={item.imagen_producto} 
            alt={item.nombre} 
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <ImageIcon size={48} className="text-slate-200 group-hover:text-blue-200 transition-colors" />
        )}

        {/* Badge de Stock Dinámico */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border shadow-sm ${
          sinStock 
          ? 'bg-red-50 border-red-100 text-red-600' 
          : 'bg-white/90 border-blue-50 text-blue-600'
        }`}>
          <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            {sinStock && <AlertCircle size={10} />}
            Stock: {item.stock}
          </span>
        </div>
      </div>
      
      {/* Información del Producto */}
      <div className="space-y-1 mb-6">
        <h3 className="text-lg font-black text-slate-800 tracking-tight line-clamp-1">
          {item.nombre}
        </h3>
        <p className="text-xs font-bold text-slate-400 line-clamp-2 min-h-[2.5rem] italic">
          {item.descripcion || "Sin descripción disponible"}
        </p>
      </div>
      
      {/* Footer de la Card: Precio y Acción */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Precio</span>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">
            ${Number(item.precio).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <button 
          onClick={() => onAddToCart(item)}
          disabled={sinStock}
          className={`px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 
            ${sinStock 
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 shadow-lg shadow-blue-200'
            }`}
        >
          {sinStock ? 'Agotado' : <><ShoppingCart size={14}/> Agregar</>}
        </button>
      </div>
    </div>
  );
};