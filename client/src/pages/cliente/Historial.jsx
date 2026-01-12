import React, { useState, useEffect } from 'react';
import { FileText, Loader2, Search, ClipboardList, AlertCircle } from 'lucide-react';
import { HistorialCard } from '../../UI/HistorialCard';
import toast from 'react-hot-toast';

const Historial = () => {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchHistorialDinamico = async () => {
      try {
        setLoading(true);

        // 1. Obtener los datos del usuario desde el LocalStorage
        const sesionString = localStorage.getItem('user');
        
        if (!sesionString) {
          toast.error("Sesión no encontrada. Por favor, inicia sesión.");
          setLoading(false);
          return;
        }

        const usuarioLogueado = JSON.parse(sesionString);
        
        // 2. Extraer el ID (Validamos ambas posibilidades: id_usuario o id)
        // Esto es clave si Supabase devuelve 'id' pero tu tabla usa 'id_usuario'
        const idUsuario = usuarioLogueado.id_usuario || usuarioLogueado.id;

        if (!idUsuario) {
          console.error("El objeto de usuario no contiene un ID válido:", usuarioLogueado);
          toast.error("Error al identificar al usuario.");
          setLoading(false);
          return;
        }

        // 3. Llamada al endpoint de tu backend pasando el ID dinámico
        // Usamos la variable idUsuario que ya validamos arriba
        const response = await fetch(`http://localhost:5000/api/users/historial/${idUsuario}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "No se pudo obtener la información");
        }

        const data = await response.json();
        
        // Seteamos los datos (aseguramos que sea un array)
        setRecetas(Array.isArray(data) ? data : []);

      } catch (error) {
        console.error("Error al cargar el historial:", error);
        toast.error(error.message || "Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistorialDinamico();
  }, []);

  // Filtro de búsqueda por motivo o número de receta (folio)
  const filteredRecetas = recetas.filter(r => 
    r.motivo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id_receta?.toString().includes(searchTerm)
  );

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0F7FF] gap-4">
      <Loader2 className="animate-spin text-blue-600" size={50} />
      <p className="text-blue-600 font-black text-xs uppercase tracking-widest animate-pulse">
        Consultando expedientes...
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER SECCIÓN */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-3xl shadow-lg shadow-blue-200/50 text-blue-600">
              <ClipboardList size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Mi <span className="text-blue-600">Historial</span>
              </h1>
              <p className="text-slate-400 font-bold text-[10px] tracking-[0.2em] mt-2 uppercase">
                Resultados de graduación y diagnósticos
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por motivo o folio..."
              className="w-full pl-14 pr-6 py-4 bg-white border-none rounded-[1.5rem] shadow-sm outline-none focus:ring-4 focus:ring-blue-100 font-bold text-xs transition-all placeholder:text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* LISTADO DE TARJETAS */}
        {filteredRecetas.length > 0 ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {filteredRecetas.map(receta => (
              <HistorialCard key={receta.id_receta} receta={receta} />
            ))}
          </div>
        ) : (
          /* ESTADO VACÍO */
          <div className="flex flex-col items-center justify-center py-24 bg-white/40 border-4 border-dashed border-white rounded-[4rem]">
            <div className="relative mb-6">
                <FileText size={80} className="text-slate-200" />
                <AlertCircle size={24} className="absolute -bottom-1 -right-1 text-blue-400 bg-white rounded-full" />
            </div>
            <h2 className="text-2xl font-black text-slate-400 uppercase tracking-tighter">
                Sin registros clínicos
            </h2>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed">
                Aún no tienes recetas registradas con este usuario (ID: {JSON.parse(localStorage.getItem('user'))?.id_usuario || JSON.parse(localStorage.getItem('user'))?.id || '?'}).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Historial;