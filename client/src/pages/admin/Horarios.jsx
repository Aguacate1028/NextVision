import React, { useState, useEffect } from 'react';
import { Calendar, Save, Loader2 } from 'lucide-react';
import { DayScheduleRow } from '../../UI/DayScheduleRow';
import toast from 'react-hot-toast';

const Horarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Cargar datos
  const fetchHorarios = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/users/horarios');
      if (response.ok) {
        const data = await response.json();
        // Ordenamos por día (0=Dom, 1=Lun...)
        const sortedData = data.sort((a, b) => a.dia_semana - b.dia_semana);
        setHorarios(sortedData);
      }
    } catch (error) {
      console.error("Error al cargar:", error);
      toast.error("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHorarios();
  }, []);

  // 2. Cambiar estado Abierto/Cerrado (Estado local)
  const toggleDay = (index) => {
    setHorarios(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], esta_activo: !copy[index].esta_activo };
      return copy;
    });
  };

  // 3. Guardar cambios en la DB
const handleSave = async () => {
  setIsSaving(true);
  try {
    const contenedor = document.querySelector('.space-y-4');
    const filas = contenedor ? Array.from(contenedor.children) : [];
    
    // Mapeamos el estado actual 'horarios' con los valores escritos en los inputs
    const datosActualizados = horarios.map((h, index) => {
      const fila = filas[index];
      
      return {
        id_horario: h.id_horario,
        esta_activo: h.esta_activo, // Este valor cambia con tu función toggleDay
        apertura: fila.querySelector('input[name="apertura"]')?.value || h.apertura,
        cierre: fila.querySelector('input[name="cierre"]')?.value || h.cierre,
        intervalo_minutos: parseInt(fila.querySelector('input[name="intervalo"]')?.value) || h.intervalo_minutos
      };
    });

    const response = await fetch('http://localhost:5000/api/users/horarios', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ horarios: datosActualizados })
    });

    // Validamos que la respuesta sea JSON antes de intentar leerla
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      
      if (response.ok) {
        toast.success("¡Agenda Global guardada!");
        // Opcional: refresca los datos para mostrar la 'ultima_modificacion' real
        fetchHorarios(); 
      } else {
        toast.error(data.error || "Error al guardar cambios");
      }
    } else {
      throw new Error("El servidor no respondió con JSON (Posible error 500)");
    }

  } catch (error) {
    console.error("Error capturado:", error);
    toast.error("Error de conexión con el servidor");
  } finally {
    setIsSaving(false);
  }
};

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">
              Agenda <span className="text-blue-600">Global</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">
              Configuración de horarios de atención
            </p>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-[1.2rem] flex items-center gap-3 font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-slate-200 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </header>

        <div className="space-y-4">
          {horarios.map((item, index) => (
            <DayScheduleRow 
              key={item.id_horario || index} 
              config={{
                ...item,
                dia: item.dia_nombre,
                abierto: item.esta_activo,
                apertura: item.apertura,
                cierre: item.cierre,
                frecuencia: item.intervalo_minutos
              }} 
              onToggle={() => toggleDay(index)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Horarios;