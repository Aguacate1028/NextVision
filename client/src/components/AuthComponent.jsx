import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '../UI/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../UI/card';

const supabase = createClient(
  "https://elfjdjvqiyzbhmansocl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZmpkanZxaXl6YmhtYW5zb2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MjQwOTIsImV4cCI6MjA4MzIwMDA5Mn0.VWRqoccwsb4MEX7zsUwOUUFoFK6kE8ea4LMxdqNUCLA"
);

export function AuthComponent({ onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert(error.message); // Aquí podrías usar el Toaster después
    } else {
      onAuthSuccess(data.user, data.session);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF] p-4">
      <Card className="w-full max-w-md shadow-2xl border-blue-50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Bienvenido</CardTitle>
          <CardDescription>Ingresa a tu cuenta de NextVision</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-4">Correo Electrónico</label>
              <input
                type="email"
                className="w-full px-6 py-3 rounded-full border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-4">Contraseña</label>
              <input
                type="password"
                className="w-full px-6 py-3 rounded-full border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verificando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}