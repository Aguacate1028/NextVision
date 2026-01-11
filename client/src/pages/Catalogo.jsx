import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Store, Search } from 'lucide-react';
import { ProductCard } from '../UI/ProductCard';

export function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todos');

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

  // Lógica de filtrado
  const filteredProducts = filter === 'Todos' 
    ? products 
    : products.filter(p => p.categoria?.nombre === filter);

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-col font-sans">
      <main className="flex-1 container mx-auto px-4 py-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Nuestro <span className="text-blue-600">Catálogo</span>
          </h1>
          <p className="text-slate-600 font-medium">
            Explora nuestra colección. Recuerda que la venta y graduación se realiza de forma personalizada en nuestra 
            <span className="text-blue-600 font-bold"> sucursal física</span>.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-100">
            <Store size={14} /> Compra únicamente en tienda
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['Todos', 'Armazones', 'Lentes de Sol', 'Accesorios'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                filter === cat 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 -translate-y-1' 
                : 'bg-white text-slate-400 hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grilla */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-blue-600 font-bold animate-pulse">Cargando productos...</p>
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id_producto} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
                <Search className="mx-auto text-slate-200 w-16 h-16 mb-4" />
                <p className="text-slate-400 font-bold uppercase tracking-widest">No se encontraron productos en esta categoría</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}