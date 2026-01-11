import React from 'react';
import { Eye } from 'lucide-react';

export function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-[35px] p-6 shadow-xl shadow-blue-100/50 border border-white hover:scale-105 transition-transform group">
      {/* Imagen del Producto */}
      <div className="bg-slate-50 rounded-[25px] h-48 mb-4 flex items-center justify-center relative overflow-hidden">
        {product.imagen_producto ? (
          <img 
            src={product.imagen_producto} 
            alt={product.nombre} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <Eye className="text-slate-200 w-20 h-20" />
        )}
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors" />
      </div>

      <div className="space-y-3">
        {/* Etiquetas superiores */}
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
            {product.categoria?.nombre || 'General'}
          </span>
          {product.stock > 0 ? (
             <span className="text-[9px] font-black text-green-500 uppercase tracking-tighter">En Existencia</span>
          ) : (
             <span className="text-[9px] font-black text-red-400 uppercase tracking-tighter">Agotado</span>
          )}
        </div>
        
        {/* Título y Descripción */}
        <div>
          <h3 className="text-lg font-black text-slate-900 truncate leading-tight">{product.nombre}</h3>
          <p className="text-xs font-bold text-slate-400 line-clamp-2 mt-1 leading-snug">
            {product.descripcion || 'Sin descripción disponible.'}
          </p>
        </div>
        
        {/* Precio - Único elemento al final */}
        <div className="pt-2 border-t border-slate-50 flex justify-center">
          <p className="text-3xl font-black text-blue-600 tracking-tighter">${product.precio}</p>
        </div>
      </div>
    </div>
  );
}