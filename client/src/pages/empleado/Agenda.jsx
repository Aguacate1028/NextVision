import React, { useState, useEffect } from 'react';
import { Calendar, Filter, Loader2, X, Save } from 'lucide-react';
import { AgendaCard } from '../../UI/AgendaCard';
import { Select } from '../../UI/select';
import toast from 'react-hot-toast';

const Agenda = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todas');
  const [selectedCita, setSelectedCita] = useState(null);

  // 1. Cargar datos reales desde el backend
  const fetchCitas = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/users/consultas');
      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      
      const data = await response.json();
      
      // Mapeamos para asegurar que la estructura coincida con lo que AgendaCard espera
      // En tu controlador, 'usuario' viene anidado
      const citasFormateadas = data.map(c => ({
        ...c,
        cliente: {
          nombres: c.usuario?.email.split('@')[0] || 'Paciente', // Fallback si no hay nombre
          correo: c.usuario?.email || 'Sin correo'
        },
        // Sincronizamos 'Finalizada' (tu backend) con 'Completada' (tu frontend)
        estado_display: c.estado === 'Finalizada' ? 'Completada' : c.estado
      }));

      setCitas(citasFormateadas);
    } catch (error) {
      console.error("Error cargando citas:", error);
      toast.error("No se pudieron cargar las citas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  // 2. Filtrado dinámico por estado
  const filteredCitas = citas.filter(c => {
    if (filter === 'Todas') return true;
    if (filter === 'Agendada') return c.estado === 'Agendada';
    if (filter === 'Completada') return c.estado === 'Finalizada' || c.estado === 'Completada';
    return true;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
              Agenda <span className="text-blue-600">Pacientes</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs tracking-[0.2em] uppercase">
              Control de consultas diarias
            </p>
          </div>

          <div className="flex gap-2 bg-white p-1.5 rounded-3xl border border-blue-50 shadow-sm">
            {['Todas', 'Agendada', 'Completada'].map(tab => (
              <button 
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  filter === tab 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                {tab === 'Agendada' ? 'Pendientes' : tab}
              </button>
            ))}
          </div>
        </header>

        {filteredCitas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCitas.map(cita => (
    <AgendaCard 
      key={cita.id_consulta} 
      cita={cita} 
      // Solo pasamos la función si NO está finalizada, 
      // o dejamos que el componente hijo decida
      onRechedule={cita.estado === 'Finalizada' ? null : setSelectedCita} 
    />
  ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 rounded-[3rem] border-4 border-dashed border-white">
            <p className="text-slate-400 font-bold uppercase tracking-widest">No hay citas en esta categoría</p>
          </div>
        )}
      </div>

      {/* Modal Reagendar (Opcional: Conectar a un endpoint PUT futuro) */}
      {selectedCita && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-12 shadow-2xl relative border border-white">
            <button onClick={() => setSelectedCita(null)} className="absolute top-10 right-10 text-slate-300 hover:text-red-500">
              <X size={28}/>
            </button>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-2">Reagendar</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
              Paciente: {selectedCita.cliente.correo}
            </p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Nueva Fecha</label>
                <input type="date" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50" />
              </div>
              <Select 
                label="Horarios Disponibles" 
                options={[
                  { value: '09:00', label: '09:00 AM' },
                  { value: '10:00', label: '10:00 AM' },
                  { value: '11:00', label: '11:00 AM' },
                ]} 
              />
              <button className="w-full bg-blue-600 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.25em] shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                <Save size={20}/> Confirmar Cambio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agenda;