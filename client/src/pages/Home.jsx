import React from 'react';
import { Button } from '../UI/button'; // Mayúscula según tu carpeta UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../UI/card';
import { Badge } from '../UI/badge';
import mascotImg from '../assets/mascota.png'; // Ruta corregida a assets
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Eye, Calendar, ShoppingBag, Target, Sparkles, TrendingUp, Star, ShieldCheck } from 'lucide-react';

export function LandingPage({ onLoginClick }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F0F7FF]">
      <Header isLoggedIn={false} onLoginClick={onLoginClick} />

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="default" className="px-4 py-1">
                🐙 Tu salud visual en buenas manos
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900">
                Next<span className="text-blue-600">Vision</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Innovación y claridad para tus ojos. Gestiona tus citas, 
                revisa tus recetas y elige tus próximos armazones en un solo lugar.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="shadow-lg shadow-blue-200" onClick={onLoginClick}>
                  <Calendar className="w-5 h-5 mr-2" /> Agendar Examen
                </Button>
                <Button size="lg" variant="outline" onClick={() => document.getElementById('promos')?.scrollIntoView({ behavior: 'smooth' })}>
                  <ShoppingBag className="w-5 h-5 mr-2" /> Ver Armazones
                </Button>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative bg-white rounded-[50px] p-12 shadow-xl border border-blue-50 w-full max-w-md flex flex-col items-center">
                <div className="absolute -top-4 bg-blue-600 text-white px-6 py-2 rounded-2xl rounded-bl-none shadow-lg animate-float">
                  <p className="text-sm font-bold">¡Hola! Soy tu guía en NextVision 🤓</p>
                </div>
                <img src={mascotImg} alt="Mascota" className="w-64 h-64 object-contain" />
                <div className="absolute top-10 right-10 bg-blue-50 rounded-full p-4 animate-bounce">
                   <Eye className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="promos" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Ofertas de Temporada</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "2x1 Armazones", desc: "En marcas seleccionadas de sol.", icon: <Star className="text-yellow-500"/>, color: "bg-yellow-50" },
              { title: "Examen Sin Costo", desc: "Al ordenar tus lentes graduados.", icon: <ShieldCheck className="text-green-500"/>, color: "bg-green-50" },
              { title: "Lentes de Contacto", desc: "15% de descuento en tu primer par.", icon: <Eye className="text-blue-500"/>, color: "bg-blue-50" }
            ].map((promo, i) => (
              <Card key={i} className={`border-none ${promo.color}`}>
                <CardHeader>
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                    {promo.icon}
                  </div>
                  <CardTitle>{promo.title}</CardTitle>
                  <CardDescription>{promo.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900 text-white rounded-t-[60px]">
        <div className="container mx-auto grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <Target className="w-12 h-12 text-blue-400" />
              <h3 className="text-3xl font-bold">Nuestra Misión</h3>
              <p className="text-slate-400">Mejorar la salud visual con trato humano.</p>
            </div>
            <div className="space-y-6">
              <TrendingUp className="w-12 h-12 text-purple-400" />
              <h3 className="text-3xl font-bold">Nuestra Visión</h3>
              <p className="text-slate-400">Liderar la innovación óptica digital.</p>
            </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}