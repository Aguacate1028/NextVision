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
        
        <header className="mb-10">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2 block italic">Registro de Datos</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            {editingItem ? 'Editar' : 'Nueva'} Categoría
          </h2>
        </header>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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