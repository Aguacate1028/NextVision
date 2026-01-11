import React from 'react';
import { Clock, Moon, Sun } from 'lucide-react';

export const DayScheduleRow = ({ config, onToggle }) => {
  return (
    <div className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col md:flex-row items-center justify-between gap-4 ${config.abierto ? 'bg-white border-blue-100 shadow-sm' : 'bg-slate-50 border-transparent opacity-60'}`}>
      <div className="flex items-center gap-4 w-full md:w-1/4">
        <div className={`p-3 rounded-2xl ${config.abierto ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
          {config.abierto ? <Sun size={20} /> : <Moon size={20} />}
        </div>
        <span className="font-black text-slate-800 uppercase tracking-tight">{config.dia}</span>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="flex flex-col">
          <label className="text-[9px] font-black uppercase text-slate-400 ml-2 mb-1">Apertura</label>
          <input 
            type="time" 
            disabled={!config.abierto}
            defaultValue={config.inicio}
            className="bg-slate-50 border-none rounded-xl px-4 py-2 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-30"
          />
        </div>
        <span className="text-slate-300 mt-4">→</span>
        <div className="flex flex-col">
          <label className="text-[9px] font-black uppercase text-slate-400 ml-2 mb-1">Cierre</label>
          <input 
            type="time" 
            disabled={!config.abierto}
            defaultValue={config.fin}
            className="bg-slate-50 border-none rounded-xl px-4 py-2 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-30"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-[9px] font-black uppercase text-slate-400 mb-1 tracking-widest">Frecuencia</span>
          <div className="flex items-center gap-2">
            <input 
              type="number"
              disabled={!config.abierto}
              defaultValue={parseInt(config.intervalo)}
              className="w-16 bg-slate-50 border-none rounded-lg px-2 py-1 font-black text-blue-600 text-right outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-30 text-xs"
            />
            <span className="text-[10px] font-black text-blue-600 uppercase">min</span>
          </div>
        </div>
        <button 
          onClick={onToggle}
          className={`px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${config.abierto ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          {config.abierto ? 'Cerrar Día' : 'Abrir Día'}
        </button>
      </div>
    </div>
  );
};