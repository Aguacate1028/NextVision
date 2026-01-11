import React, { useState, useEffect } from 'react';
import { Search, Loader2, ShoppingCart } from 'lucide-react';
import { inventarioMock } from '../../mocks/inventarioMock';
import { VentaCard } from '../../UI/VentaCard';
import { CartModal } from '../../UI/CartModal';

const Ventas = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProductos(inventarioMock.productos);
      setLoading(false);
    }, 600);
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id_producto === product.id_producto);
      if (exists) {
        return prev.map(item => 
          item.id_producto === product.id_producto 
          ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id_producto === id) {
        const newQty = Math.max(1, item.cantidad + delta);
        return { ...item, cantidad: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id_producto !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  const filteredItems = productos.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Punto de <span className="text-blue-600">Venta</span></h1>
            <p className="text-slate-400 font-bold text-xs tracking-[0.2em] mt-1 uppercase">Registro presencial de transacciones</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder="Buscar producto..."
                className="pl-12 pr-6 py-4 bg-white border-none rounded-[1.5rem] shadow-sm outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowCart(true)}
              className="relative bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest"
            >
              <ShoppingCart size={18} /> 
              Carrito
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px]">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <VentaCard key={item.id_producto} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      </div>

      <CartModal 
        isOpen={showCart} 
        onClose={() => setShowCart(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        total={total}
        onConfirm={() => {
          console.log("Confirmando venta...", cart);
          setCart([]);
          setShowCart(false);
          alert("Venta registrada con éxito");
        }}
      />
    </div>
  );
};

export default Ventas;