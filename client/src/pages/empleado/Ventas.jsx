import React, { useState, useEffect } from 'react';
import { Search, Loader2, ShoppingCart, PackageX, ShoppingBag } from 'lucide-react';
import { VentaCard } from '../../UI/VentaCard';
import { CartModal } from '../../UI/CartModal';
import toast from 'react-hot-toast';

const Ventas = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // 1. Obtener productos desde el Backend
  const fetchProductos = async () => {
    try {
      setLoading(true);
      // Usamos la ruta sincronizada con tu userRoutes.js
      const response = await fetch('http://localhost:5000/api/users/productos-venta');
      if (!response.ok) throw new Error("Error al obtener el catálogo");
      
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      toast.error("No se pudo conectar con el inventario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // 2. Lógica para Agregar al Carrito con validación de Stock
  const addToCart = (product) => {
    const itemEnInventario = productos.find(p => p.id_producto === product.id_producto);
    
    if (!itemEnInventario || itemEnInventario.stock <= 0) {
      toast.error("Producto sin existencias");
      return;
    }

    setCart(prev => {
      const exists = prev.find(item => item.id_producto === product.id_producto);
      
      if (exists) {
        // Validar que no exceda el stock real al incrementar
        if (exists.cantidad >= itemEnInventario.stock) {
          toast.error(`Solo hay ${itemEnInventario.stock} unidades disponibles`);
          return prev;
        }
        return prev.map(item => 
          item.id_producto === product.id_producto 
          ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      
      toast.success(`${product.nombre} añadido`);
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  // 3. Actualizar cantidades dentro del carrito
  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id_producto === id) {
        const itemInv = productos.find(p => p.id_producto === id);
        const nuevaCant = item.cantidad + delta;

        if (nuevaCant > itemInv.stock) {
          toast.error("Límite de stock alcanzado");
          return item;
        }
        return { ...item, cantidad: Math.max(1, nuevaCant) };
      }
      return item;
    }));
  };

  // 4. Eliminar del carrito
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id_producto !== id));
    toast.error("Producto eliminado del carrito");
  };

  // 5. Cálculos Finales
  const total = cart.reduce((sum, item) => sum + (Number(item.precio) * item.cantidad), 0);

  const filteredItems = productos.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
      <div className="text-center">
        <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
        <p className="text-slate-500 font-black uppercase text-[10px] tracking-widest">Cargando Inventario...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
              <ShoppingBag className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Punto de <span className="text-blue-600">Venta</span>
              </h1>
              <p className="text-slate-400 font-bold text-[10px] tracking-[0.2em] mt-1 uppercase">
                Terminal de Salida de Inventario
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* BUSCADOR */}
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o descripción..."
                className="pl-12 pr-6 py-4 bg-white border-none rounded-[1.5rem] shadow-sm outline-none focus:ring-4 focus:ring-blue-100 font-bold text-xs w-full md:w-80 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* BOTÓN CARRITO */}
            <button 
              onClick={() => setShowCart(true)}
              className="relative bg-slate-900 text-white px-8 py-4 rounded-[1.5rem] shadow-xl hover:bg-blue-600 hover:-translate-y-1 transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest group"
            >
              <ShoppingCart size={18} className="group-hover:rotate-12 transition-transform" /> 
              Ver Carrito
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-[10px] border-4 border-[#F0F7FF] animate-bounce">
                  {cart.reduce((a, b) => a + b.cantidad, 0)}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* GRILLA DE PRODUCTOS */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map(item => (
              <VentaCard 
                key={item.id_producto} 
                item={item} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white/40 border-4 border-dashed border-white rounded-[4rem]">
            <PackageX size={80} className="text-slate-200 mb-6" />
            <h2 className="text-xl font-black text-slate-400 uppercase tracking-tighter">No hay coincidencias</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase mt-2">Intenta con otro término de búsqueda</p>
          </div>
        )}
      </div>

      {/* MODAL DEL CARRITO */}
      <CartModal 
        isOpen={showCart} 
        onClose={() => setShowCart(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        total={total}
        onConfirm={async () => {
          // Lógica futura: Aquí llamarás a un endpoint para registrar la venta
          console.log("Datos de la venta:", cart);
          toast.success("Venta procesada (Simulado)");
          setCart([]);
          setShowCart(false);
          fetchProductos(); // Recargar stock real tras la venta
        }}
      />
    </div>
  );
};

export default Ventas;