import React, { useState, useEffect } from 'react';
import { Plus, Search, Loader2, X, Check, ShieldCheck } from 'lucide-react';
import { empleados as empleadosMock } from '../../mocks/empleados';
import { EmployeeCard } from '../../UI/EmployeeCard';
import { Input } from '../../UI/input';
import { Select } from '../../UI/select';

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEmp, setEditingEmp] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmpleados(empleadosMock);
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const openModal = (emp = null) => {
    setEditingEmp(emp);
    setShowModal(true);
  };

  const filtered = empleados.filter(e => 
    e.nombres.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.puesto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
              Equipo <span className="text-blue-600">NextVision</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs tracking-[0.2em] mt-1 uppercase">
              Control de Personal y Accesos
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder="Buscar empleado..."
                className="pl-12 pr-6 py-4 bg-white border-none rounded-[1.5rem] shadow-sm outline-none focus:ring-2 focus:ring-blue-500 font-bold text-xs w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => openModal()}
              className="bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-widest shrink-0"
            >
              <Plus size={18} /> Registrar
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(emp => (
            <EmployeeCard key={emp.id_personal} empleado={emp} onEdit={openModal} />
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl relative border border-white overflow-y-auto max-h-[90vh]">
            <button onClick={() => setShowModal(false)} className="absolute top-10 right-10 text-slate-300 hover:text-red-500 transition-colors"><X size={28}/></button>
            
            <header className="mb-10 text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                {editingEmp ? 'Actualizar Staff' : 'Alta de Personal'}
              </h2>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2 border-b pb-2">Datos Públicos</h4>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest leading-none">Nombre(s)</label>
                    <Input defaultValue={editingEmp?.nombres} placeholder="Ej: Carlos Daniel" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest leading-none">Apellidos</label>
                    <Input defaultValue={editingEmp?.apellidos} placeholder="Ej: Mendoza Pérez" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest leading-none">Puesto</label>
                    <Input defaultValue={editingEmp?.puesto} placeholder="Ej: Optometrista" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-widest ml-2 border-b pb-2 border-blue-50">Credenciales</h4>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest leading-none">Correo</label>
                    <Input defaultValue={editingEmp?.usuario?.email} type="email" placeholder="staff@nextvision.com" />
                </div>
                {!editingEmp && (
                   <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest leading-none">Contraseña</label>
                        <Input type="password" placeholder="••••••••" />
                   </div>
                )}
                <Select 
                  label="Rol de Acceso"
                  options={[
                    { value: 'Empleado', label: 'Empleado' },
                    { value: 'Administrador', label: 'Administrador' }
                  ]}
                  defaultValue={editingEmp?.usuario?.rol || 'Empleado'}
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.25em] shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all mt-10 flex items-center justify-center gap-3">
              <Check size={20}/> {editingEmp ? 'Actualizar Ficha' : 'Generar Acceso'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empleados;