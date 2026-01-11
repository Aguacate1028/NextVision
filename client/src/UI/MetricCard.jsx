import React from 'react';
import { TrendingUp } from 'lucide-react';

export const MetricCard = ({ label, value, icon: Icon, color, sub }) => {
  // Configuración de colores basada en tu identidad visual
  const themes = {
    blue: 'border-blue-100 hover:border-blue-400 shadow-blue-900/5',
    indigo: 'border-indigo-100 hover:border-indigo-400 shadow-indigo-900/5',
    green: 'border-green-100 hover:border-green-400 shadow-green-900/5',
    purple: 'border-purple-100 hover:border-purple-400 shadow-purple-900/5',
  };

  const iconThemes = {
    blue: 'bg-blue-600 text-white',
    indigo: 'bg-indigo-600 text-white',
    green: 'bg-green-600 text-white',
    purple: 'bg-purple-600 text-white',
  };

  return (
    <div className={`p-8 bg-white rounded-[3rem] border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${themes[color]}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl shadow-lg ${iconThemes[color]}`}>
          <Icon size={24} />
        </div>
        <TrendingUp className="text-slate-200" size={20} />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">
        {value}
      </p>
      <p className="text-xs font-bold text-slate-400 italic">
        {sub}
      </p>
    </div>
  );
};