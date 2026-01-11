import React, { useState, useRef } from 'react';
import { X, Check, Upload, Image as ImageIcon, ChevronDown } from 'lucide-react';

export const InventoryModal = ({ isOpen, onClose, activeTab, editingItem, categorias = [] }) => {
  const [imagePreview, setImagePreview] = useState(editingItem?.imagen_producto || null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-[3rem] p-12 shadow-2xl relative border border-white overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-10 right-10 text-slate-300 hover:text-red-500 transition-colors"><X size={28}/></button>
        
        <header className="mb-10">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2 block italic">Registro de Datos</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            {editingItem ? 'Editar' : 'Nueva'} {activeTab === 'productos' ? 'Pieza' : 'Categoría'}
          </h2>
        </header>
        
        <div className="space-y-6">
          {/* SECCIÓN DE IMAGEN (Solo para productos) */}
          {activeTab === 'productos' && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Imagen del Producto</label>
              <div 
                onClick={() => fileInputRef.current.click()}
                className="w-full h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all overflow-hidden group"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload className="text-slate-300 group-hover:text-blue-400 mb-2" size={32} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subir Fotografía</span>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Nombre Principal</label>
            <input 
              defaultValue={editingItem?.nombre || ''}
              type="text" 
              className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-8 py-5 font-bold text-slate-700 outline-none focus:border-blue-100 focus:bg-white transition-all shadow-inner" 
              placeholder="Ej: Ray-Ban Aviator / Armazones Premium" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Descripción corta</label>
            <textarea 
              defaultValue={editingItem?.descripcion || ''}
              className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-8 py-5 font-bold text-slate-700 outline-none focus:border-blue-100 focus:bg-white transition-all shadow-inner h-24 resize-none" 
              placeholder="Detalles técnicos o de estilo..." 
            />
          </div>

          {/* SELECT DE CATEGORÍA (Solo para productos) */}
          {activeTab === 'productos' && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Categoría</label>
              <div className="relative">
                <select 
                  defaultValue={editingItem?.id_categoria || ''}
                  className="w-full bg-blue-50 border-none rounded-[1.5rem] px-8 py-4 font-black text-blue-600 outline-none appearance-none cursor-pointer shadow-sm focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  <option value="" disabled>Seleccionar categoría...</option>
                  {categorias.map(cat => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" />
              </div>
            </div>
          )}

          {activeTab === 'productos' && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Precio Final ($)</label>
                <input 
                  defaultValue={editingItem?.precio || ''}
                  type="number" 
                  className="w-full bg-slate-50 border-none rounded-[1.5rem] px-8 py-5 font-black text-slate-900 text-xl outline-none shadow-inner" 
                  placeholder="0.00" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Stock Disponible</label>
                <input 
                  defaultValue={editingItem?.stock || ''}
                  type="number" 
                  className="w-full bg-slate-50 border-none rounded-[1.5rem] px-8 py-5 font-black text-slate-900 text-xl outline-none shadow-inner" 
                  placeholder="0" 
                />
              </div>
            </div>
          )}

          <button className="w-full bg-blue-600 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.25em] shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all mt-6 flex items-center justify-center gap-3">
            <Check size={20}/> {editingItem ? 'Actualizar' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
};