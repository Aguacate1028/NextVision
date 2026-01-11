import React from 'react';
import { Button } from '../UI/button';
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card';

export function ClientDashboard({ user, onLogout }) {
  const displayName = user?.user_metadata?.nombre || 'Paciente';

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F7FF]">
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Bienvenido, {displayName} 🐙</h1>
          <p className="text-slate-600">Aquí puedes revisar tu salud visual.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle>Próxima Cita</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 mb-4">No tienes citas programadas.</p>
              <Button variant="outline" className="w-full">Agendar ahora</Button>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle>Mi Graduación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-black text-blue-600">-2.50 OD</p>
              <p className="text-xs text-slate-400">Última actualización: 10/12/2025</p>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-transform border-dashed border-2 border-blue-200 bg-blue-50/30">
            <CardContent className="flex items-center justify-center h-full pt-6">
              <p className="text-blue-400 font-bold">Ver Historial Completo</p>
            </CardContent>
          </Card>
        </div>
      </main>

    </div>
  );
}