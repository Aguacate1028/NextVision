import React, { useState, useEffect } from 'react';
import { Calendar, Save, Loader2, Info } from 'lucide-react';
import { horariosMock } from '../../mocks/horariosMock';
import { DayScheduleRow } from '../../UI/DayScheduleRow';

const Horarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHorarios(horariosMock);
      setLoading(false);
    }, 600);
  }, []);

  const toggleDay = (index) => {
    const newHorarios = [...horarios];
    newHorarios[index].abierto = !newHorarios[index].abierto;
    setHorarios(newHorarios);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-blue-600" size={32} />
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                Agenda <span className="text-blue-600">Global</span>
              </h1>
            </div>
            <p className="text-slate-400 font-bold text-xs tracking-[0.2em] uppercase">
              Configuración de disponibilidad para citas
            </p>
          </div>

          <button className="bg-slate-900 text-white px-10 py-4 rounded-[1.5rem] shadow-xl hover:bg-blue-600 hover:-translate-y-1 transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest">
            <Save size={18} /> Guardar Cambios
          </button>
        </header>

        <div className="bg-blue-600/5 border border-blue-100 p-6 rounded-[2rem] mb-8 flex items-start gap-4">
          <Info className="text-blue-600 shrink-0" size={20} />
          <p className="text-xs font-bold text-blue-800 leading-relaxed">
            Estos horarios definen los bloques disponibles que verán los clientes al agendar una <span className="font-black underline">Consulta</span>. Asegúrate de coordinar con el <span className="font-black">Personal</span> asignado.
          </p>
        </div>

        <div className="space-y-4">
          {horarios.map((config, index) => (
            <DayScheduleRow 
              key={config.dia} 
              config={config} 
              onToggle={() => toggleDay(index)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Horarios;