import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importar el hook
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { Store, Search } from 'lucide-react';
import { ProductCard } from '../UI/ProductCard';

export function CatalogPage({ isLoggedIn, user, userRole, onLogout, onLoginClick }) {
  const navigate = useNavigate(); // 2. Inicializar el navigate
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

  // 3. Función para manejar el clic en el botón
  const handleProductAction = (productId) => {
    if (!isLoggedIn) {
      // Si no hay sesión, mandarlo al login
      navigate('/login');
    } else {
      // Si hay sesión, aquí iría la lógica para añadir al carrito o ver detalles
      console.log("Añadiendo al carrito o viendo producto:", productId);
    }
  };

  // Lógica de filtrado
  const filteredProducts = filter === 'Todos' 
    ? products 
    : products.filter(p => p.categoria?.nombre === filter);

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Nuestro Catálogo</h1>
          <p className="text-slate-600">Encuentra los lentes perfectos para tu estilo y salud visual.</p>
        </div>

        {/* Barra de Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
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
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id_producto} 
                className="bg-white rounded-[35px] p-6 shadow-xl shadow-blue-100/50 border border-white hover:scale-105 transition-transform group"
              >
                <div className="bg-slate-50 rounded-[25px] h-48 mb-4 flex items-center justify-center relative overflow-hidden">
                  <Eye className="text-slate-200 w-20 h-20" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                    {product.categoria?.nombre || 'General'}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 truncate">{product.nombre}</h3>
                  <p className="text-2xl font-black text-blue-600">${product.precio}</p>
                  
                  <div className="pt-4">
                    {/* 4. Aplicar el onClick al botón */}
                    <Button 
                      onClick={() => handleProductAction(product.id_producto)}
                      className="w-full rounded-full gap-2"
                    >
                      <ShoppingCart size={18} />
                      {isLoggedIn ? 'Añadir al carrito' : 'Ver detalles'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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