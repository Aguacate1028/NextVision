import React from 'react';
import { Button } from '../UI/button';
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card';
import Header from './Header';
import Footer from './Footer';

export function AdminDashboard({ user, userRole, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F0F7FF]">
      <Header isLoggedIn={true} userRole={userRole} user={user} onLogout={onLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="mb-8 border-l-4 border-blue-600 pl-4">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Panel de Control</h1>
          <p className="text-blue-600 font-bold">Sesión iniciada como: {userRole}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-white border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500 uppercase">Ventas Hoy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-slate-900">$12,450</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500 uppercase">Citas Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-blue-600">8</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500 uppercase">Inventario Bajo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-red-500">3</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500 uppercase">Nuevos Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-green-500">+12</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}