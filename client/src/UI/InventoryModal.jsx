import React, { useState, useEffect } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const InventoryModal = ({ isOpen, onClose, activeTab, editingItem, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  // Limpiar o cargar datos al abrir el modal
  useEffect(() => {
    if (editingItem) {
      setFormData({
        nombre: editingItem.nombre || '',
        descripcion: editingItem.descripcion || ''
      });
    } else {
      setFormData({ nombre: '', descripcion: '' });
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Si hay editingItem, usamos PUT y añadimos el ID a la URL
  // Si no, usamos POST a la raíz
  const isEditing = !!editingItem;
  const url = isEditing 
    ? `http://localhost:5000/api/users/${editingItem.id_categoria}` 
    : 'http://localhost:5000/api/users/';
  
  const method = isEditing ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: formData.nombre,
        descripcion: formData.descripcion
      })
    });

    if (response.ok) {
      toast.success(isEditing ? "Categoría actualizada" : "Categoría registrada");
      onSuccess(); // Recarga la lista de Inventario.jsx
      onClose();   // Cierra el modal
    } else {
      const errorData = await response.json();
      toast.error(errorData.error || "Error en la operación");
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Error de conexión");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-[3rem] p-12 shadow-2xl relative border border-white">
        <button onClick={onClose} className="absolute top-10 right-10 text-slate-300 hover:text-red-500 transition-colors">
          <X size={28}/>
        </button>
import React, { useState, useRef } from 'react';
import { X, Check, Upload, Image as ImageIcon } from 'lucide-react';

export const InventoryModal = ({ isOpen, onClose, activeTab, editingItem }) => {
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
            {editingItem ? 'Editar' : 'Nueva'} Categoría
          </h2>
        </header>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
              required
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              type="text" 
              className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-8 py-5 font-bold text-slate-700 outline-none focus:border-blue-100 focus:bg-white transition-all shadow-inner" 
              placeholder="Ej: Armazones Premium" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Descripción corta</label>
            <textarea 
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-8 py-5 font-bold text-slate-700 outline-none focus:border-blue-100 focus:bg-white transition-all shadow-inner h-24 resize-none" 
              placeholder="Detalles técnicos o de estilo..." 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.25em] shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all mt-6 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Check size={20}/>}
            {editingItem ? 'Actualizar' : 'Confirmar Registro'}
          </button>
        </form>
      </div>
    </div>
  );
};