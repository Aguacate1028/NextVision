import React from 'react';
import { X, Minus, Plus, CreditCard, Trash2, ShoppingCart } from 'lucide-react';

export const CartModal = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, onConfirm, total }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Contenedor Blanco Principal: Aseguramos que siempre tenga ancho y alto */}
      <div className="bg-white h-screen w-full max-w-md shadow-2xl relative flex flex-col animate-in slide-in-from-right duration-500">
        
        <header className="p-8 border-b border-slate-50 flex justify-between items-center bg-white shrink-0">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Carrito de <span className="text-blue-600">Venta</span></h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Resumen de transacción</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24}/>
          </button>
        </header>

        {/* Cuerpo del carrito */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-300">
              <div className="bg-slate-50 p-8 rounded-[3rem] flex flex-col items-center border border-dashed border-slate-200">
                <ShoppingCart size={64} className="mb-4 opacity-20" />
                <p className="font-black uppercase tracking-widest text-sm">El carrito está vacío</p>
                <p className="text-[10px] font-bold text-slate-400 mt-2">AGREGA PRODUCTOS PARA CONTINUAR</p>
              </div>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id_producto} className="bg-slate-50 rounded-3xl p-4 flex gap-4 items-center border border-white shadow-sm">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-blue-50 shadow-sm shrink-0 font-black text-blue-600">
                  {item.cantidad}x
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-slate-800 leading-tight">{item.nombre}</h4>
                  <p className="text-xs font-bold text-blue-600 tracking-tighter">${item.precio} c/u</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center bg-white rounded-xl border border-blue-100 p-1">
                    <button onClick={() => updateQuantity(item.id_producto, -1)} className="p-1 hover:text-blue-600"><Minus size={14}/></button>
                    <span className="px-2 font-black text-xs">{item.cantidad}</span>
                    <button onClick={() => updateQuantity(item.id_producto, 1)} className="p-1 hover:text-blue-600"><Plus size={14}/></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id_producto)} className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 size={14}/>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer siempre visible al fondo */}
        <footer className="p-8 bg-slate-50 border-t border-slate-100 rounded-t-[3rem] space-y-6 shrink-0">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total a pagar</span>
            <span className="text-4xl font-black text-slate-900 tracking-tighter">
              ${total.toFixed(2)}
            </span>
          </div>
          <button 
            disabled={cart.length === 0}
            onClick={onConfirm}
            className="w-full bg-blue-600 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.25em] shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 disabled:translate-y-0 disabled:shadow-none"
          >
            <CreditCard size={20}/> Confirmar Venta
          </button>
        </footer>
      </div>
    </div>
  );
};