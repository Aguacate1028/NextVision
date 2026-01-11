import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { clientesMock } from '../../mocks/clientes';
import { ClienteCard } from '../../UI/ClienteCard';
import { RecetasModal } from '../../UI/RecetasModal';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setClientes(clientesMock);
      setLoading(false);
    }, 600);
  }, []);

  const handleDelete = (id) => {
    setClientes(clientes.filter(c => c.id_cliente !== id));
    console.log("Cliente eliminado:", id);
  };

  const filtered = clientes.filter(c => 
    `${c.nombres} ${c.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Directorio <span className="text-blue-600">Clientes</span></h1>
            <p className="text-slate-400 font-bold text-xs tracking-[0.2em] mt-1 uppercase">Expedientes y recetas médicas</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" placeholder="Buscar por nombre..."
              className="w-full pl-12 pr-6 py-4 bg-white border-none rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(c => (
            <ClienteCard 
              key={c.id_cliente} 
              cliente={c} 
              onOpenRecetas={setSelectedCliente} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      </div>

      <RecetasModal 
        cliente={selectedCliente} 
        onClose={() => setSelectedCliente(null)} 
      />
    </div>
  );
};

export default Clientes;