import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { ShoppingCart, Search, Filter, Eye } from 'lucide-react';
import { Button } from '../UI/button';

export function CatalogPage({ isLoggedIn, user, userRole, onLogout, onLoginClick }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todos');

  // Carga de productos desde tu tabla 'producto'
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('producto')
        .select('*, categoria(nombre)');
      if (!error) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-col">

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Encabezado del Catálogo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Nuestro Catálogo</h1>
          <p className="text-slate-600">Encuentra los lentes perfectos para tu estilo y salud visual.</p>
        </div>

        {/* Barra de Filtros Estilo Burbuja */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {['Todos', 'Armazones', 'Lentes de Sol', 'Accesorios'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                filter === cat 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-slate-600 hover:bg-blue-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grilla de Productos */}
        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product.id_producto} 
                className="bg-white rounded-[35px] p-6 shadow-xl shadow-blue-100/50 border border-white hover:scale-105 transition-transform group"
              >
                {/* Imagen del Producto (Placeholder) */}
                <div className="bg-slate-50 rounded-[25px] h-48 mb-4 flex items-center justify-center relative overflow-hidden">
                  <Eye className="text-slate-200 w-20 h-20" />
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                    {product.categoria?.nombre || 'General'}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 truncate">{product.nombre}</h3>
                  <p className="text-2xl font-black text-blue-600">${product.precio}</p>
                  
                  <div className="pt-4">
                    <Button className="w-full rounded-full gap-2">
                      <ShoppingCart size={18} />
                      {isLoggedIn ? 'Añadir al carrito' : 'Ver detalles'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}