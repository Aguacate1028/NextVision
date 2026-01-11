import React from 'react';
import { Button } from '../UI/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../UI/card';
import { Badge } from '../UI/badge';
import mascotImg from '../assets/mascota.png';
import { 
  Eye, Calendar, ShoppingBag, Award, Users, 
  Target, Sparkles, TrendingUp, Star 
} from 'lucide-react';

export function HomePage({ onLoginClick }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Hero Section - Bienvenida */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 -z-10"></div>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200">
                ✨ Tecnología de Vanguardia
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Tu Visión,
                </span>
                <br />
                <span className="text-gray-900">Nuestra Pasión</span>
              </h1>
              <p className="text-xl text-gray-600">
                Cuidamos tu salud visual con tecnología de punta y atención personalizada. 
                Agenda tu cita hoy y descubre la diferencia OpticVision.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
                  onClick={onLoginClick}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Cita
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full border-2"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Ver Catálogo
                </Button>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">15+</p>
                  <p className="text-sm text-gray-600">Años de Experiencia</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">50k+</p>
                  <p className="text-sm text-gray-600">Clientes Satisfechos</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">98%</p>
                  <p className="text-sm text-gray-600">Recomendación</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-center items-center h-96">
                   <div className="absolute -top-4 bg-white text-blue-600 px-6 py-2 rounded-2xl shadow-lg z-20 font-bold">
                      ¡Bienvenido a OpticVision! 👋
                   </div>
                   <img src={mascotImg} alt="Mascota" className="w-full h-full object-contain animate-float" />
                </div>
                
                {/* Elementos flotantes */}
                <div className="absolute top-10 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-float">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <div className="absolute bottom-20 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anuncios/Promociones */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-full mb-4">
              🎉 Promociones del Mes
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Ofertas Especiales</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 border-white/20 text-white rounded-3xl hover:bg-white/20 transition-all border-none">
              <CardHeader>
                <Sparkles className="w-12 h-12 mb-4 text-yellow-300" />
                <CardTitle className="text-white">2x1 en Lentes de Sol</CardTitle>
                <CardDescription className="text-white">
                  Compra uno y llévate otro gratis en marcas seleccionadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-100">Válido hasta fin de mes</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white rounded-3xl hover:bg-white/20 transition-all border-none">
              <CardHeader>
                <Eye className="w-12 h-12 mb-4 text-green-300" />
                <CardTitle className="text-white">Examen Visual Gratis</CardTitle>
                <CardDescription className="text-white">
                  Con la compra de tus lentes graduados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-100">Promoción permanente</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white rounded-3xl hover:bg-white/20 transition-all border-none">
              <CardHeader>
                <TrendingUp className="w-12 h-12 mb-4 text-purple-300" />
                <CardTitle className="text-white">20% Descuento</CardTitle>
                <CardDescription className="text-white">
                  En tu segunda compra al registrarte en línea
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-100">Nuevos clientes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="rounded-full bg-blue-100 text-blue-700 mb-4 px-4 py-1">
              Sobre Nosotros
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Quiénes Somos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos un equipo de profesionales comprometidos con tu salud visual, 
              con más de 15 años de experiencia en el sector óptico.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { icon: Users, title: "Equipo Profesional", text: "Contamos con optometristas certificados y personal altamente capacitado para brindarte el mejor servicio." },
                { icon: Sparkles, title: "Tecnología Avanzada", text: "Utilizamos equipos de última generación para diagnósticos precisos y soluciones personalizadas." },
                { icon: Award, title: "Calidad Garantizada", text: "Trabajamos con las mejores marcas del mercado y ofrecemos garantía en todos nuestros productos." }
              ].map((item, i) => (
                <Card key={i} className="rounded-3xl shadow-lg border-2 border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 shadow-xl text-center">
              <div className="flex justify-center">
                <img src={mascotImg} alt="Mascota" className="h-48 object-contain" />
              </div>
              <h3 className="text-2xl font-bold mt-6 mb-4">Nuestra Historia</h3>
              <p className="text-gray-700 leading-relaxed">
                Desde 2009, OpticVision ha sido pionera en ofrecer servicios ópticos 
                de calidad premium. Comenzamos como una pequeña óptica familiar y hoy 
                somos la cadena líder en cuidado visual, sirviendo a más de 50,000 
                clientes satisfechos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          <Card className="rounded-3xl shadow-xl border-2 border-blue-100 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-3xl font-bold">Nuestra Misión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-center leading-relaxed">
                Proporcionar soluciones visuales de la más alta calidad, combinando 
                tecnología avanzada con un servicio personalizado y humano. Nos 
                comprometemos a mejorar la calidad de vida de nuestros clientes...
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-xl border-2 border-blue-100 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-3xl font-bold">Nuestra Visión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-center leading-relaxed">
                Ser la óptica líder en innovación y excelencia en el cuidado visual, 
                reconocida por nuestra tecnología de vanguardia y atención personalizada...
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Logros */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="rounded-full bg-yellow-100 text-yellow-700 mb-4 px-4 py-1">
              🏆 Nuestros Logros
            </Badge>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Reconocimientos y Logros</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <LogroCard icon={Award} title="Premio Nacional" desc="Mejor Óptica 2023" extra="Asociación Nacional de Optometría" color="yellow" />
            <LogroCard icon={Star} title="5 Estrellas" desc="Calificación Promedio" extra="Basado en 10,000+ reseñas" color="blue" />
            <LogroCard icon={TrendingUp} title="100% Crecimiento" desc="Últimos 5 Años" extra="Expansión continua" color="green" />
            <LogroCard icon={Users} title="50,000+" desc="Clientes Atendidos" extra="Confianza depositada" color="purple" />
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-8">Certificaciones y Afiliaciones</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="rounded-full px-6 py-2 bg-blue-100 text-blue-700 border-none">ISO 9001:2015 Certificado</Badge>
              <Badge className="rounded-full px-6 py-2 bg-green-100 text-green-700 border-none">Cámara Nacional de Comercio</Badge>
              <Badge className="rounded-full px-6 py-2 bg-purple-100 text-purple-700 border-none">Asociación de Optometristas</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para Cuidar tu Visión?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">Agenda tu cita hoy y descubre por qué miles de personas confían en OpticVision</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white" onClick={onLoginClick}>
              <Calendar className="w-5 h-5 mr-2" /> Agendar Cita Ahora
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-2">
              Más Información
            </Button>
          </div>
        </div>
      </section>


      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// Subcomponente interno para no repetir código en Logros
function LogroCard({ icon: Icon, title, desc, extra, color }) {
  const colors = {
    yellow: "border-yellow-200 text-yellow-500",
    blue: "border-blue-200 text-blue-500",
    green: "border-green-200 text-green-500",
    purple: "border-purple-200 text-purple-500"
  };
  return (
    <Card className={`rounded-3xl shadow-lg border-2 ${colors[color]} text-center`}>
      <CardContent className="p-8">
        <Icon className="w-16 h-16 mx-auto mb-4" />
        <h3 className="font-bold text-2xl mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 font-medium">{desc}</p>
        <p className="text-xs text-gray-400 mt-2">{extra}</p>
      </CardContent>
    </Card>
  );
}