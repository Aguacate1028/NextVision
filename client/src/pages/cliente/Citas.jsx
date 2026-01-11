import React, { useState, useEffect } from 'react';
import { Calendar as CalIcon, Loader2, X, AlertCircle } from 'lucide-react';
import { citasClienteMock } from '../../mocks/citasClienteMock';
import { CitaClienteCard } from '../../UI/CitaClienteCard';

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Proximas');
  const [cancelModal, setCancelModal] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setCitas(citasClienteMock);
      setLoading(false);
    }, 600);
  }, []);

  // Lógica de calendario simple para el mes actual
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const citaDays = citas.map(c => new Date(c.fecha_hora).getDate());

  const filteredCitas = citas.filter(c => 
    filter === 'Proximas' ? c.estado === 'Agendada' : c.estado === 'Completada'
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LADO IZQUIERDO: Calendario y Estadísticas */}
        <aside className="lg:col-span-4 space-y-8">
          <header>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">
              Mis <span className="text-blue-600">Citas</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs tracking-[0.2em] uppercase">Control de visitas ópticas</p>
          </header>

          {/* Mini Calendario Visual */}
          <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-white">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
              <CalIcon size={14} /> Calendario {today.toLocaleDateString('es-ES', { month: 'long' })}
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => (
                <div key={d} className="text-center text-[9px] font-black text-slate-300 mb-2">{d}</div>
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const hasCita = citaDays.includes(day);
                const isToday = day === today.getDate();
                return (
                  <div 
                    key={i} 
                    className={`h-8 flex items-center justify-center rounded-xl text-[10px] font-black transition-all ${
                      hasCita ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 
                      isToday ? 'bg-slate-900 text-white' : 'text-slate-400 bg-slate-50'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* LADO DERECHO: Listado */}
        <main className="lg:col-span-8">
          <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-[2rem] w-fit shadow-sm border border-blue-50">
            {['Proximas', 'Pasadas'].map(tab => (
              <button 
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-10 py-3 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all ${
                  filter === tab ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab === 'Proximas' ? 'Pendientes' : 'Completadas'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCitas.length > 0 ? (
              filteredCitas.map(cita => (
                <CitaClienteCard key={cita.id_consulta} cita={cita} onCancel={setCancelModal} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white/50 border-4 border-dashed border-white rounded-[4rem]">
                <p className="font-black text-slate-300 uppercase tracking-widest">No hay registros en esta sección</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal de Cancelación */}
      {cancelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl relative text-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-2">¿Cancelar Cita?</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10 leading-relaxed">
              Esta acción liberará el horario de <span className="text-red-500">{new Date(cancelModal.fecha_hora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} hrs</span> para otros pacientes.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setCancelModal(null)} className="py-5 bg-slate-100 text-slate-500 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">No, volver</button>
              <button 
                onClick={() => {
                  console.log("Cita cancelada:", cancelModal.id_consulta);
                  setCancelModal(null);
                }} 
                className="py-5 bg-red-500 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-red-200 hover:bg-red-600 transition-all"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Citas;