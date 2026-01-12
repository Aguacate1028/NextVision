import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Store, Search, ImageIcon, ShoppingCart, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function CatalogPage({ isLoggedIn }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Todos']); // Estado para categorías dinámicas
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todos');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // 1. Obtener Productos con su categoría (JOIN)
        const { data: prodData, error: prodError } = await supabase
          .from('producto')
          .select('*, categoria(nombre)');
        
        // 2. Obtener todas las Categorías existentes para los botones de filtro
        const { data: catData, error: catError } = await supabase
          .from('categoria')
          .select('nombre');

        if (prodError || catError) throw prodError || catError;

        setProducts(prodData || []);
        
        // Creamos la lista de filtros: 'Todos' + las categorías de la DB
        if (catData) {
          const names = catData.map(c => c.nombre);
          setCategories(['Todos', ...names]);
        }
      } catch (error) {
        console.error("Error al cargar catálogo:", error.message);
        toast.error("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleProductAction = (productId) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      toast.success("Producto visualizado");
      // Lógica de carrito aquí
    }
  };

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

        {/* Filtros Dinámicos */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
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

        {/* Estado de Carga */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <Loader2 className="animate-spin text-blue-600" size={48} />
            <p className="text-blue-600 font-bold animate-pulse uppercase tracking-widest text-xs">Cargando catálogo real...</p>
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id_producto} 
                    className="bg-white rounded-[35px] p-6 shadow-xl shadow-blue-100/50 border border-white hover:scale-105 transition-transform group flex flex-col"
                  >
                    {/* Contenedor de Imagen Actualizado */}
                    <div className="bg-slate-50 rounded-[25px] h-48 mb-4 flex items-center justify-center relative overflow-hidden">
                      {product.imagen_producto ? (
                        <img 
                          src={product.imagen_producto} 
                          alt={product.nombre}
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <ImageIcon className="text-slate-200 w-16 h-16" />
                      )}
                      
                      {/* Badge de Stock */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-slate-100">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                          Stock: {product.stock}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 flex-1 flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                        {product.categoria?.nombre || 'General'}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{product.nombre}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 italic mb-2">
                        {product.descripcion || "Sin descripción disponible"}
                      </p>
                      
                      <div className="mt-auto pt-4 flex flex-col gap-3">
                        <p className="text-2xl font-black text-slate-900">
                          ${Number(product.precio).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </p>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
                <Search className="mx-auto text-slate-200 w-16 h-16 mb-4" />
                <p className="text-slate-400 font-bold uppercase tracking-widest">No hay productos en esta categoría</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}