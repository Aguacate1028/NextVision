import React, { useState, useEffect } from 'react';
import { FileText, Loader2, Search, Filter } from 'lucide-react';
import { historialMock } from '../../mocks/historialMock';
import { HistorialCard } from '../../UI/HistorialCard';

const Historial = () => {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulación de carga de BD
    setTimeout(() => {
      setRecetas(historialMock);
      setLoading(false);
    }, 700);
  }, []);

  const filtered = recetas.filter(r => 
    r.motivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id_receta.toString().includes(searchTerm)
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
              Mi <span className="text-blue-600">Historial</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs tracking-[0.2em] mt-1 uppercase">
              Expedientes clínicos y graduaciones
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por motivo o folio..."
              className="w-full pl-14 pr-6 py-4 bg-white border-none rounded-[1.5rem] shadow-sm outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {filtered.length > 0 ? (
          <div className="space-y-8">
            {filtered.map(receta => (
              <HistorialCard key={receta.id_receta} receta={receta} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 border-4 border-dashed border-white rounded-[4rem]">
            <FileText size={64} className="text-slate-200 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-slate-400 uppercase tracking-tighter">No hay expedientes</h2>
            <p className="text-sm font-bold text-slate-300 uppercase tracking-widest mt-2">Aún no tienes recetas registradas en NextVision</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Historial;