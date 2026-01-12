import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Loader2, Upload, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

export const InventoryModal = ({ isOpen, onClose, activeTab, editingItem, categorias = [], onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    id_categoria: ''
  });

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
        // Limpia el formulario al abrir para "Nuevo Producto"
        setFormData({ nombre: '', descripcion: '', precio: '', stock: '', id_categoria: '' });
        setImagePreview(null);
      }
    }
  }, [editingItem, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("La imagen es muy pesada (máx 2MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isProduct = activeTab === 'productos';
    const isEditing = !!editingItem;
    
    // Configuración de URL dinámica
    const baseUrl = 'http://localhost:5000/api/users';
    const endpoint = isProduct ? '/productos' : ''; 
    
    // Si editamos: baseUrl/productos/id. Si creamos: baseUrl/productos
    const url = isEditing 
      ? `${baseUrl}${endpoint}/${isProduct ? editingItem.id_producto : editingItem.id_categoria}`
      : `${baseUrl}${endpoint}`;

    const bodyPayload = isProduct ? {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock),
      id_categoria: parseInt(formData.id_categoria),
      imagen_producto: imagePreview 
    } : {
      nombre: formData.nombre,
      descripcion: formData.descripcion
    };

    try {
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      // Manejo de errores de ruta (HTML en lugar de JSON)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Error del servidor (no es JSON):", await response.text());
        throw new Error(`Error ${response.status}: Ruta '${url}' no encontrada en el servidor.`);
      }

      const result = await response.json();

      if (response.ok) {
        toast.success(`Registro ${isEditing ? 'actualizado' : 'creado'} con éxito`);
        if (onSuccess) onSuccess();
        onClose();
      } else {
        throw new Error(result.error || "Error en el servidor");
      }
    } catch (error) {
      console.error("Error en submit:", error);
      toast.error(error.message);
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
            INVENTARIO PRO
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            {editingItem ? 'Editar' : 'Nuevo'} {activeTab === 'productos' ? 'Producto' : 'Categoría'}
          </h2>
        </header>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'productos' && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Fotografía</label>
              <div 
                onClick={() => fileInputRef.current.click()}
                className="w-full h-48 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-all overflow-hidden group"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload className="text-slate-300 group-hover:text-blue-400 mb-2" size={32} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subir Imagen</span>
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
              className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-8 py-5 font-bold text-slate-700 outline-none focus:border-blue-100" 
              placeholder="Ej. Armazón Premium" 
            />
          </div>

          {activeTab === 'productos' && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Categoría</label>
              <div className="relative">
                <select 
                  required
                  value={formData.id_categoria}
                  onChange={(e) => setFormData({...formData, id_categoria: e.target.value})}
                  className="w-full bg-blue-50 border-none rounded-[1.5rem] px-8 py-5 font-black text-blue-600 outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled>Seleccionar categoría...</option>
                  {categorias.map(cat => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" />
              </div>
            </div>
          )}

          {activeTab === 'productos' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Precio</label>
                <input 
                  required type="number" step="0.01" value={formData.precio}
                  onChange={(e) => setFormData({...formData, precio: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-8 py-5 font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Stock</label>
                <input 
                  required type="number" value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-8 py-5 font-bold" 
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Descripción</label>
            <textarea 
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-8 py-5 font-bold h-28 resize-none" 
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.25em] shadow-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Check size={20}/>}
            {editingItem ? 'Actualizar Registro' : 'Confirmar Registro'}
          </button>
        </form>
      </div>
    </div>
  );
};