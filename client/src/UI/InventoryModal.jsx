import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Loader2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export const InventoryModal = ({ isOpen, onClose, activeTab, editingItem, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Estado inicial del formulario adaptado a ambas tablas
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    id_categoria: ''
  });

  // Efecto para limpiar o cargar datos al abrir/editar
  useEffect(() => {
    if (isOpen) {
      if (editingItem) {
        setFormData({
          nombre: editingItem.nombre || '',
          descripcion: editingItem.descripcion || '',
          precio: editingItem.precio || '',
          stock: editingItem.stock || '',
          id_categoria: editingItem.id_categoria || ''
        });
        setImagePreview(editingItem.imagen_producto || null);
      } else {
        setFormData({ nombre: '', descripcion: '', precio: '', stock: '', id_categoria: '' });
        setImagePreview(null);
      }
    }
  }, [editingItem, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isEditing = !!editingItem;
    const isProduct = activeTab === 'productos';
    
    // Configuración de URL según el tipo y si es edición
    const baseUrl = 'http://localhost:5000/api/users';
    const endpoint = isProduct ? '/productos' : '';
    const id = isEditing ? (isProduct ? editingItem.id_producto : editingItem.id_categoria) : '';
    
    const url = isEditing ? `${baseUrl}${endpoint}/${id}` : `${baseUrl}${endpoint}/`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          imagen_producto: imagePreview // Enviamos la imagen en base64
        })
      });

      if (response.ok) {
        toast.success(`${isProduct ? 'Producto' : 'Categoría'} guardada con éxito`);
        onSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Error en la operación");
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-[3rem] p-12 shadow-2xl relative border border-white overflow-y-auto max-h-[90vh]">
        
        <button onClick={onClose} className="absolute top-10 right-10 text-slate-300 hover:text-red-500 transition-colors">
          <X size={28}/>
        </button>
        
        <header className="mb-10">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2 block italic">
            Gestión de {activeTab}
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            {editingItem ? 'Editar' : 'Nuevo'} {activeTab === 'productos' ? 'Producto' : 'Categoría'}
          </h2>
        </header>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
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
                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Nombre</label>
            <input 
              required
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-8 py-5 font-bold text-slate-700 outline-none focus:border-blue-100 focus:bg-white transition-all shadow-inner" 
              placeholder="Ej: Armazones Premium" 
            />
          </div>

          {activeTab === 'productos' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Precio</label>
                <input 
                  required
                  type="number"
                  value={formData.precio}
                  onChange={(e) => setFormData({...formData, precio: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-8 py-5 font-bold text-slate-700 outline-none focus:border-blue-100 shadow-inner" 
                  placeholder="0.00" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Stock</label>
                <input 
                  required
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-8 py-5 font-bold text-slate-700 outline-none focus:border-blue-100 shadow-inner" 
                  placeholder="0" 
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Descripción</label>
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
            className="w-full bg-blue-600 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.25em] shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all mt-6 flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Check size={20}/>}
            {editingItem ? 'Actualizar Registro' : 'Confirmar Registro'}
          </button>
        </form>
      </div>
    </div>
  );
};