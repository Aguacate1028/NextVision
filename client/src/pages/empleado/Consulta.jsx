import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, UserPlus, Save, Loader2, X, 
  CalendarCheck, CheckCircle2, ChevronRight, Clock 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { CitaSelector } from '../../UI/CitaSelector';
import { Input } from '../../UI/input';

const Consulta = () => {
  const [citasHoy, setCitasHoy] = useState([]);
  const [listaClientes, setListaClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [showAgendaModal, setShowAgendaModal] = useState(false);
  const [showNextCitaModal, setShowNextCitaModal] = useState(false);

  // Estado de la Receta sincronizado con tu crearReceta del backend
  const [receta, setReceta] = useState({
    esf_od: '', cil_od: '', eje_od: '',
    esf_oi: '', cil_oi: '', eje_oi: '',
    motivo: '', dp: '', observaciones: ''
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (showAgendaModal) fetchClientes();
  }, [showAgendaModal]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const resCit = await fetch('http://localhost:5000/api/users/consultas');
      if (resCit.ok) {
        const data = await resCit.json();
        const hoy = new Date().toLocaleDateString('en-CA'); 
        // Filtrar solo las que son para hoy
        const filtradas = data.filter(c => c.fecha_hora?.startsWith(hoy));
        setCitasHoy(filtradas);
      }
    } catch (error) {
      toast.error("Error al cargar citas");
    } finally {
      setLoading(false);
    }
  };

  const fetchClientes = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/clientes');
      if (res.ok) {
        const data = await res.json();
        setListaClientes(data);
      }
    } catch (err) {
      toast.error("No se pudo obtener la lista de clientes");
    }
  };

  // --- FUNCIÓN AGENDAR CITA (Sincronizada con router.post('/agendar-cita')) ---
  const handleAgendarCita = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('http://localhost:5000/api/users/agendar-cita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: data.id_usuario,
          fecha: data.fecha,
          hora: data.hora,
          id_personal: 1, // Reemplazar con ID dinámico si tienes login
          descripcion: "Consulta General"
        })
      });

      const resJson = await response.json();

      if (response.ok && resJson.success) {
        toast.success("¡Cita agendada!");
        setShowAgendaModal(false);
        fetchInitialData();
      } else {
        toast.error(resJson.error || "Error al agendar");
      }
    } catch (err) {
      toast.error("Error de red");
    }
  };

  // --- FUNCIÓN GUARDAR RECETA (Sincronizada con router.post('/receta')) ---
  const handleConfirmarReceta = async (e) => {
    e.preventDefault();
    if (!citaSeleccionada) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/receta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_consulta: citaSeleccionada.id_consulta,
          ...receta
        })
      });

      const resJson = await response.json();

      if (response.ok) {
        toast.success("Receta guardada con éxito");
        setShowNextCitaModal(true);
        setCitaSeleccionada(null);
        fetchInitialData();
        // Reset receta
        setReceta({ esf_od: '', cil_od: '', eje_od: '', esf_oi: '', cil_oi: '', eje_oi: '', motivo: '', dp: '', observaciones: '' });
      } else {
        toast.error(resJson.error || "Error al guardar");
      }
    } catch (error) {
      toast.error("Error de conexión");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* PANEL IZQUIERDO: AGENDA */}
        <aside className="lg:col-span-4 space-y-6">
          <header className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
              Módulo <span className="text-blue-600">Clínico</span>
            </h1>
            <button 
              onClick={() => setShowAgendaModal(true)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-[#0F172A] text-white py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
            >
              <UserPlus size={16}/> Agendar Primera Vez
            </button>
          </header>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Citas de hoy</h3>
            {citasHoy.length > 0 ? (
              citasHoy.map(cita => (
                <CitaSelector 
                  key={cita.id_consulta} 
                  cita={cita} 
                  onSelect={setCitaSeleccionada} 
                  isSelected={citaSeleccionada?.id_consulta === cita.id_consulta}
                />
              ))
            ) : (
              <div className="p-10 bg-white/50 border-2 border-dashed border-white rounded-[2.5rem] text-center italic text-slate-400 text-sm">
                No hay citas para hoy.
              </div>
            )}
          </div>
        </aside>

        {/* PANEL DERECHO: RECETA */}
        <main className="lg:col-span-8">
          {citaSeleccionada ? (
            <form onSubmit={handleConfirmarReceta} className="bg-white rounded-[3rem] p-10 shadow-2xl border border-white animate-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center mb-10 border-b border-slate-50 pb-6">
                <div>
                  <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest">Atención en curso</span>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                    {citaSeleccionada.usuario?.email}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase bg-slate-50 px-4 py-2 rounded-full">
                  <Clock size={14}/> {new Date(citaSeleccionada.fecha_hora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>

              <div className="space-y-8">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Ojo Derecho */}
                  <div className="space-y-4 bg-slate-50 p-6 rounded-[2rem] border border-white">
                    <h4 className="text-[10px] font-black text-blue-600 uppercase">Ojo Derecho (OD)</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <Input label="ESF" placeholder="0.00" value={receta.esf_od} onChange={(e) => setReceta({...receta, esf_od: e.target.value})} />
                      <Input label="CIL" placeholder="0.00" value={receta.cil_od} onChange={(e) => setReceta({...receta, cil_od: e.target.value})} />
                      <Input label="EJE" placeholder="0°" value={receta.eje_od} onChange={(e) => setReceta({...receta, eje_od: e.target.value})} />
                    </div>
                  </div>
                  {/* Ojo Izquierdo */}
                  <div className="space-y-4 bg-slate-50 p-6 rounded-[2rem] border border-white">
                    <h4 className="text-[10px] font-black text-indigo-600 uppercase">Ojo Izquierdo (OI)</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <Input label="ESF" placeholder="0.00" value={receta.esf_oi} onChange={(e) => setReceta({...receta, esf_oi: e.target.value})} />
                      <Input label="CIL" placeholder="0.00" value={receta.cil_oi} onChange={(e) => setReceta({...receta, cil_oi: e.target.value})} />
                      <Input label="EJE" placeholder="0°" value={receta.eje_oi} onChange={(e) => setReceta({...receta, eje_oi: e.target.value})} />
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-6">
                  <Input label="Motivo" placeholder="Ej: Control" value={receta.motivo} onChange={(e) => setReceta({...receta, motivo: e.target.value})} />
                  <Input label="DP (mm)" placeholder="62" value={receta.dp} onChange={(e) => setReceta({...receta, dp: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Observaciones</label>
                  <textarea 
                    className="w-full bg-slate-50 border-none rounded-[2rem] px-8 py-6 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 h-32 resize-none" 
                    placeholder="Diagnóstico..."
                    value={receta.observaciones}
                    onChange={(e) => setReceta({...receta, observaciones: e.target.value})}
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <><Save size={20}/> Guardar Receta</>}
                </button>
              </div>
            </form>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-20 bg-white/50 border-4 border-dashed border-white rounded-[4rem]">
               <ClipboardList size={48} className="text-slate-200 mb-4" />
               <h2 className="text-2xl font-black text-slate-400 uppercase tracking-tighter">Esperando selección</h2>
               <p className="text-slate-400 text-xs font-bold uppercase mt-2">Elige un paciente de la izquierda</p>
            </div>
          )}
        </main>
      </div>

      {/* MODAL AGENDAR (Sincronizado con agendar-cita) */}
      {showAgendaModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[420px] rounded-[2.5rem] p-10 shadow-2xl relative">
            <button onClick={() => setShowAgendaModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-500"><X size={20} /></button>
            <div className="mb-8">
              <h2 className="text-2xl font-black text-[#0F172A] uppercase tracking-tighter">Agendar Cita</h2>
              <p className="text-[#3B82F6] font-black text-[9px] uppercase tracking-widest mt-1">Sincronizado con base de datos</p>
            </div>
            
            <form className="space-y-5" onSubmit={handleAgendarCita}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-6">Paciente</label>
                <div className="relative">
                  <select name="id_usuario" required className="w-full bg-[#F1F5F9] border-none rounded-3xl px-8 py-5 font-bold text-[#1E293B] appearance-none outline-none focus:ring-4 focus:ring-blue-50">
                    <option value="">Selecciona usuario...</option>
                    {listaClientes.map(c => <option key={c.id_usuario} value={c.id_usuario}>{c.email}</option>)}
                  </select>
                  <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-blue-500 pointer-events-none" size={18} />
                </div>
              </div>

              <input name="fecha" type="date" required className="w-full bg-[#F1F5F9] border-none rounded-3xl px-8 py-5 font-bold text-[#1E293B] outline-none focus:ring-4 focus:ring-blue-50" />
              <input name="hora" type="time" required className="w-full bg-[#F1F5F9] border-none rounded-3xl px-8 py-5 font-bold text-[#1E293B] outline-none focus:ring-4 focus:ring-blue-50" />

              <button type="submit" className="w-full bg-[#0F172A] text-white py-6 rounded-[1.8rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all shadow-xl">
                Confirmar Cita
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ÉXITO */}
      {showNextCitaModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-blue-600/90 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-[3.5rem] p-12 text-center shadow-2xl">
            <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">¡Completado!</h2>
            <p className="text-slate-500 font-medium mb-8">La consulta ha finalizado y la receta fue generada.</p>
            <button onClick={() => setShowNextCitaModal(false)} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all">Siguiente Paciente</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consulta;