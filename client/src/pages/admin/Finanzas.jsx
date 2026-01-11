import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Loader2, ShoppingBag, Users, Eye, Info 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { MetricCard } from '../../UI/MetricCard';
import { finanzasMock } from '../../mocks/finanzasMock';

const Finanzas = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState('anio_actual');
  const [showDetailId, setShowDetailId] = useState(null);

  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      // Simulación de carga
      setTimeout(() => {
        setData(finanzasMock);
        setLoading(false);
      }, 500);
    };
    loadData();
  }, [periodo]);

  // PROTECCIÓN: Si está cargando o data es null, mostramos el spinner
  if (loading || !data || !data.metrics) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0F7FF] font-sans">
          <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
          <h2 className="text-xl font-black text-slate-700 tracking-tight italic">
            Consolidando datos financieros...
          </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
              Reporte <span className="text-blue-600">Financiero</span>
            </h1>
            <p className="text-slate-500 font-bold text-sm tracking-wide mt-1 uppercase opacity-70">
              Gestión de Transacciones Presenciales
            </p>
          </div>
          
          <select 
            className="bg-white border border-blue-100 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm outline-none cursor-pointer text-slate-700 transition-all hover:border-blue-300"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="este_mes">Este Mes</option>
            <option value="ultimo_trimestre">Semestre</option>
            <option value="anio_actual">Anual 2026</option>
          </select>
        </header>

        {/* Métricas con data segura */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <MetricCard 
            label="Ingresos Totales" 
            value={`$${data.metrics.total.toLocaleString()}`} 
            icon={DollarSign} 
            color="blue" 
            sub="Total en caja" 
          />
          <MetricCard 
            label="Ticket Promedio" 
            value={`$${(data.metrics.total / data.metrics.count).toFixed(2)}`} 
            icon={ShoppingBag} 
            color="indigo" 
            sub="Promedio por venta" 
          />
          <MetricCard 
            label="Operaciones" 
            value={data.metrics.count} 
            icon={Users} 
            color="green" 
            sub="Clientes atendidos" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gráfica de Rendimiento */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-white">
            <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase text-sm opacity-80 mb-8">
                Crecimiento Mensual
            </h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.chartData}>
                  <defs>
                    <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.05)'}} />
                  <Area type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={4} fill="url(#colorGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Categorías */}
          <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-white flex flex-col">
            <h3 className="text-sm font-black text-slate-400 mb-2 uppercase tracking-widest">Distribución</h3>
            <p className="text-xl font-black text-slate-800 mb-6 tracking-tight">Ventas por Categoría</p>
            <div className="h-[220px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.methodData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                    {data.methodData.map((entry, index) => <Cell key={index} fill={entry.color} cornerRadius={10} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {data.methodData.map((m, i) => (
                <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: m.color}}/>
                    <span className="text-xs font-black text-slate-600 uppercase tracking-tighter">{m.name}</span>
                  </div>
                  <span className="font-black text-slate-900">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabla con el botón de ojo */}
        <div className="mt-8 bg-white rounded-[3rem] shadow-xl shadow-blue-900/5 border border-white overflow-visible">
          <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tighter">Libro Diario</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 italic">
                Detalle de transacciones procesadas
              </p>
            </div>
          </div>
          <div className="overflow-x-auto px-6 pb-6">
            <table className="w-full border-separate border-spacing-y-3">
              <thead className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em]">
                <tr>
                  <th className="px-6 py-4 text-left">Cliente</th>
                  <th className="px-6 py-4 text-left">Concepto</th>
                  <th className="px-6 py-4 text-center">Fecha</th>
                  <th className="px-6 py-4 text-center">Detalles</th>
                  <th className="px-6 py-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.recentPayments.map((p) => (
                  <tr key={p.id} className="bg-slate-50/50 hover:bg-blue-50 transition-all group rounded-2xl relative">
                    <td className="px-6 py-5 rounded-l-2xl">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                            {p.cliente.nombres.charAt(0)}
                            </div>
                            <span className="font-black text-slate-800 text-sm tracking-tight">{p.cliente.nombres}</span>
                        </div>
                    </td>
                    <td className="px-6 py-5 text-slate-500 text-sm font-bold">{p.conceptO || p.concepto}</td>
                    <td className="px-6 py-5 text-center text-[11px] font-black text-slate-400 uppercase">
                        {new Date(p.fecha).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5 text-center relative">
                      <button 
                        onMouseEnter={() => setShowDetailId(p.id)}
                        onMouseLeave={() => setShowDetailId(null)}
                        className="p-2 bg-white rounded-full text-blue-600 shadow-sm border border-blue-50 hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Label Flotante (Burbuja) */}
                      {showDetailId === p.id && (
                        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white p-4 rounded-3xl shadow-2xl border border-blue-100 animate-in fade-in zoom-in duration-200">
                          <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Info size={12}/> Desglose de Venta
                          </h4>
                          <div className="space-y-2">
                            {p.detalles?.map((det, idx) => (
                              <div key={idx} className="flex justify-between text-left border-b border-slate-50 pb-1">
                                <div>
                                  <p className="text-[11px] font-black text-slate-800">{det.producto}</p>
                                  <p className="text-[9px] font-bold text-slate-400">Cant: {det.cantidad} x ${det.precio_ind}</p>
                                </div>
                                <span className="text-[11px] font-black text-slate-700">${det.total}</span>
                              </div>
                            ))}
                          </div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right rounded-r-2xl font-black text-slate-900 tracking-tighter">
                        ${Number(p.monto).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finanzas;