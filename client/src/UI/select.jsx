import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({ label, options, ...props }) => (
  <div className="space-y-2 w-full relative">
    {label && <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest leading-none">{label}</label>}
    <div className="relative">
      <select 
        className="w-full bg-blue-50 border-none rounded-[1.5rem] px-8 py-4 font-black text-blue-600 outline-none appearance-none cursor-pointer shadow-sm focus:ring-2 focus:ring-blue-200 transition-all"
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" />
    </div>
  </div>
);