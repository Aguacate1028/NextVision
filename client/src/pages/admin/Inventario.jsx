import React, { useState, useEffect } from 'react';
import { Plus, Search, Loader2 } from 'lucide-react';
import { InventoryCard } from '../../UI/InventoryCard';
import { InventoryModal } from '../../UI/InventoryModal';
import toast from 'react-hot-toast';

const Inventario = () => {
  const [activeTab, setActiveTab] = useState('productos');
  const [items, setItems] = useState({ productos: [], categorias: [] });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null); 
  const [editingItem, setEditingItem] = useState(null);

  // --- 1. CARGA DE DATOS DESDE EL BACKEND ---
const fetchInventario = async () => {
  try {
    setLoading(true);
    
    // Ejecutamos ambas peticiones en paralelo para que sea más rápido
    const [resCat, resProd] = await Promise.all([
      fetch('http://localhost:5000/api/users/'),
      fetch('http://localhost:5000/api/users/productos')
    ]);

    const dataCat = await resCat.json();
    const dataProd = await resProd.json();

    setItems({
      categorias: Array.isArray(dataCat) ? dataCat : [],
      productos: Array.isArray(dataProd) ? dataProd : []
    });
    
  } catch (error) {
    console.error("Error cargando inventario:", error);
    toast.error("Error al conectar con el servidor");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchInventario();
  }, []);

  // --- 2. GESTIÓN DE MODALES ---
  const openCreateModal = () => { 
    setEditingItem(null); 
    setShowModal(true); 
  };

  const openEditModal = (item) => { 
    setEditingItem(item); 
    setShowModal(true); 
  };

  const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            toast.success("Categoría eliminada correctamente");
            setConfirmDelete(null); // Cerramos el estado de confirmación
            fetchInventario();      // Recargamos la lista automáticamente
        } else {
            const errorData = await response.json();
            toast.error(errorData.error || "No se pudo eliminar");
        }
    } catch (error) {
        console.error("Error al eliminar:", error);
        toast.error("Error de conexión con el servidor");
    }
};

  // --- 3. FILTRADO ---
  const filteredItems = activeTab === 'productos' 
  ? items.productos.filter(p => p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()))
  : items.categorias.filter(c => c.nombre?.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0F7FF] font-sans">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
      <h2 className="text-xl font-black text-slate-700 tracking-tight italic">Sincronizando catálogo...</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
              {activeTab === 'productos' ? 'Inventario' : 'Categorías'} <span className="text-blue-600">Pro</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs tracking-[0.2em] mt-1 uppercase">
              {activeTab === 'productos' ? 'Gestión de Stock Óptico' : 'Gestión de Categorías de Venta'}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder={`Buscar en ${activeTab}...`}
                className="pl-12 pr-6 py-4 bg-white border-none rounded-[1.5rem] shadow-sm outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={openCreateModal} 
              className="bg-blue-600 text-white px-6 py-4 rounded-[1.5rem] shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-widest shrink-0"
            >
              <Plus size={18} /> Agregar {activeTab === 'productos' ? 'Producto' : 'Categoría'}
            </button>
          </div>
        </header>

        {/* SELECTOR DE PESTAÑAS (TABS) */}
        <div className="flex gap-2 mb-10 bg-slate-200/50 p-1.5 rounded-[2rem] w-fit border border-white">
          {['productos', 'categorias'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-10 py-3 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all ${
                activeTab === tab 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'productos' ? 'Inventario' : 'Categorías'}
            </button>
          ))}
        </div>

        {/* LISTADO DINÁMICO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <InventoryCard 
              key={activeTab === 'productos' ? item.id_producto : item.id_categoria}
              item={item}
              type={activeTab}
              onEdit={openEditModal}
              
              // ESTO ES LO QUE HACE QUE EL BOTÓN FUNCIONE:
              onDelete={() => handleDelete(activeTab === 'productos' ? item.id_producto : item.id_categoria)}
              
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
            />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white/40 rounded-[3rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">
                No hay {activeTab} registrados
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL PARA CREAR/EDITAR */}
      <InventoryModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        activeTab={activeTab} 
        editingItem={editingItem}
<<<<<<< HEAD
        onSuccess={fetchInventario} // Esta función recarga la lista al guardar
=======
        categorias={items.categorias}
>>>>>>> origin/main
      />
    </div>
  );
};

export default Inventario;