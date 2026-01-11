import React, { useState, useEffect } from 'react';
import { ClipboardList, UserPlus, Save, Loader2, X, CalendarCheck } from 'lucide-react';
import { agendaMock } from '../../mocks/agendaMock';
import { clientesRegistradosMock } from '../../mocks/consultaMock';
import { CitaSelector } from '../../UI/CitaSelector';
import { Input } from '../../UI/input';
import { Select } from '../../UI/select';

const Consulta = () => {
  const [citasHoy, setCitasHoy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [showAgendaModal, setShowAgendaModal] = useState(false);
  const [showNextCitaModal, setShowNextCitaModal] = useState(false);

  useEffect(() => {
    // Simulamos cargar solo las de "Hoy" que estén agendadas
    setTimeout(() => {
      setCitasHoy(agendaMock.filter(c => c.estado === 'Agendada'));
      setLoading(false);
    }, 700);
  }, []);

  const handleConfirmarReceta = (e) => {
    e.preventDefault();
    // Aquí iría el POST a la tabla 'receta'
    console.log("Receta Guardada");
    setShowNextCitaModal(true);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]"><Loader2 className="animate-spin text-blue-600" size={48} /></div>;

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* COLUMNA IZQUIERDA: Selección de Paciente */}
        <aside className="lg:col-span-4 space-y-6">
          <header className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
              Módulo <span className="text-blue-600">Clínico</span>
            </h1>
            <button 
              onClick={() => setShowAgendaModal(true)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
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
              <p className="text-sm font-bold text-slate-400 italic p-6 bg-white rounded-[2rem] text-center">No hay más citas para hoy.</p>
            )}
          </div>
        </aside>

        {/* COLUMNA DERECHA: Formulario de Receta */}
        <main className="lg:col-span-8">
        {citaSeleccionada ? (
            <form onSubmit={handleConfirmarReceta} className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-blue-900/5 border border-white animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10 border-b border-slate-50 pb-6">
                <div>
                <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest">Expediente Médico</span>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Receta para {citaSeleccionada.cliente.nombres}</h2>
                </div>
                <ClipboardList className="text-slate-200" size={40} />
            </div>

            <div className="space-y-10">
                {/* Sección 1: Graduación Detallada */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* Ojo Derecho */}
                <div className="space-y-6 bg-slate-50 p-8 rounded-[2.5rem] border border-white shadow-inner">
                    <div className="flex items-center gap-3 border-b border-blue-100 pb-3">
                    <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                    <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Ojo Derecho (OD)</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-blue-600 ml-4">Esfera</label>
                        <Input placeholder="0.00" type="number" step="0.25" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-blue-600 ml-4">Cilindro</label>
                        <Input placeholder="0.00" type="number" step="0.25" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-blue-600 ml-4">Eje</label>
                        <Input placeholder="0°" type="number" />
                    </div>
                    </div>
                </div>

                {/* Ojo Izquierdo */}
                <div className="space-y-6 bg-slate-50 p-8 rounded-[2.5rem] border border-white shadow-inner">
                    <div className="flex items-center gap-3 border-b border-indigo-100 pb-3">
                    <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
                    <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Ojo Izquierdo (OI)</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-indigo-600 ml-4">Esfera</label>
                        <Input placeholder="0.00" type="number" step="0.25" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-indigo-600 ml-4">Cilindro</label>
                        <Input placeholder="0.00" type="number" step="0.25" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-indigo-600 ml-4">Eje</label>
                        <Input placeholder="0°" type="number" />
                    </div>
                    </div>
                </div>
                </section>

                {/* Sección 2: Datos Generales */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest leading-none">Motivo de Consulta</label>
                    <Input placeholder="Ej: Visión borrosa de lejos" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest leading-none">Distancia Pupilar (DP)</label>
                    <Input placeholder="mm" type="number" />
                </div>
                </section>

                {/* Sección 3: Observaciones */}
                <section className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest leading-none">Observaciones Clínicas / Diagnóstico</label>
                <textarea 
                    className="w-full mt-2 bg-slate-50 border-none rounded-[2rem] px-8 py-6 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 h-32 resize-none shadow-inner placeholder:text-slate-300 transition-all" 
                    placeholder="Escribe diagnósticos adicionales o recomendaciones para el laboratorio..." 
                />
                </section>

                <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.25em] shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                <Save size={20}/> Registrar Receta y Finalizar
                </button>
            </div>
            </form>
        ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-20 bg-white/50 border-4 border-dashed border-white rounded-[4rem]">
            <ClipboardList size={64} className="text-slate-200 mb-6" />
            <h2 className="text-2xl font-black text-slate-400 uppercase tracking-tighter">Selecciona una cita</h2>
            <p className="text-sm font-bold text-slate-300 uppercase tracking-widest mt-2">Para comenzar el registro de la receta</p>
            </div>
        )}
        </main>
      </div>

      {/* MODAL 1: Agendar por primera vez */}
      {showAgendaModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-12 shadow-2xl relative">
            <button onClick={() => setShowAgendaModal(false)} className="absolute top-10 right-10 text-slate-300 hover:text-red-500"><X size={28}/></button>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-2">Agendar Cita</h2>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-8">El cliente ya debe estar registrado</p>
            <div className="space-y-6">
              <Select label="Seleccionar Cliente" options={clientesRegistradosMock.map(c => ({value: c.id_cliente, label: `${c.nombres} ${c.apellidos}`}))} />
              <Input label="Fecha" type="date" />
              <Input label="Hora" type="time" />
              <button className="w-full bg-slate-900 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-widest">Confirmar Cita</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Siguiente Cita (Post-Receta) */}
      {showNextCitaModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-blue-600/20 backdrop-blur-md animate-in zoom-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[4rem] p-12 shadow-2xl text-center border-4 border-blue-50">
            <CalendarCheck size={64} className="text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-2">¡Receta Exitosa!</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10 leading-relaxed">¿Deseas agendar la <span className="text-blue-600">próxima cita</span> de seguimiento para este cliente?</p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setShowNextCitaModal(false)} className="py-5 bg-slate-100 text-slate-500 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">No, finalizar</button>
              <button onClick={() => {setShowNextCitaModal(false); setShowAgendaModal(true);}} className="py-5 bg-blue-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">Sí, agendar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consulta;