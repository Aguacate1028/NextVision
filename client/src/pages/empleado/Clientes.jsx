import React, { useState, useEffect } from 'react';
import { Search, Loader2, Users } from 'lucide-react';
import { ClienteCard } from '../../UI/ClienteCard';
import { RecetasModal } from '../../UI/RecetasModal';
import toast from 'react-hot-toast';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/clientes-citas');
      if (!response.ok) throw new Error('Error al cargar clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      toast.error("No se pudieron cargar los clientes");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // Lógica para remover visualmente o eliminar de la DB
    setClientes(clientes.filter(c => c.id_usuario !== id));
    toast.success("Vista actualizada");
  };

  const filtered = clientes.filter(c => 
    `${c.nombres} ${c.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
              Directorio <span className="text-blue-600">Pacientes</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs tracking-[0.2em] mt-1 uppercase">
              Solo clientes con historial de citas
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o correo..."
              className="w-full pl-12 pr-6 py-4 bg-white border-none rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(c => (
              <ClienteCard 
                key={c.id_usuario} 
                cliente={c} 
                onOpenRecetas={() => setSelectedCliente(c)} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-20 bg-white/50 border-4 border-dashed border-white rounded-[3rem] text-center">
            <Users size={48} className="text-slate-200 mb-4" />
            <h3 className="text-xl font-black text-slate-400 uppercase">Sin resultados</h3>
          </div>
        )}
      </div>

      {selectedCliente && (
        <RecetasModal 
          cliente={selectedCliente} 
          onClose={() => setSelectedCliente(null)} 
        />
      )}
    </div>
  );
};

export default Clientes;