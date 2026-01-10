import { Link } from 'react-router-dom';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Clock,
    Instagram,
    Facebook,
    Twitter
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white text-slate-600 border-t border-blue-50 font-sans">
            {/* --- SECCIÓN SUPERIOR --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* COLUMNA 1: MARCA Y DESCRIPCIÓN */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <span className="text-2xl font-black text-slate-900 tracking-tighter">
                                Next<span className="text-blue-600">Vision</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            Cuidamos tu salud visual con tecnología de punta y atención personalizada. Más que una óptica, somos tus aliados para ver mejor.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Instagram size={18} />} />
                            <SocialIcon icon={<Facebook size={18} />} />
                            <SocialIcon icon={<Twitter size={18} />} />
                        </div>
                    </div>

                    {/* COLUMNA 2: ENLACES RÁPIDOS */}
                    <div>
                        <h3 className="text-slate-900 font-bold text-lg mb-6">Explorar</h3>
                        <ul className="space-y-3">
                            <FooterLink to="/" text="Inicio" />
                            <FooterLink to="/catalogo" text="Catálogo de Lentes" />
                            <FooterLink to="/citas" text="Agendar Cita" />
                            <FooterLink to="/nosotros" text="Sobre Nosotros" />
                        </ul>
                    </div>

                    {/* COLUMNA 3: CONTACTO */}
                    <div>
                        <h3 className="text-slate-900 font-bold text-lg mb-6">Contacto</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                                    <MapPin size={18} />
                                </div>
                                <span className="text-sm">Av. Universidad 456, Col. Óptica, CDMX</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                                    <Phone size={18} />
                                </div>
                                <span className="text-sm">+52 55 1234 5678</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                                    <Mail size={18} />
                                </div>
                                <span className="text-sm">contacto@nextvision.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* COLUMNA 4: HORARIOS */}
                    <div>
                        <h3 className="text-slate-900 font-bold text-lg mb-6">Horarios</h3>
                        <ul className="space-y-3">
                            <li className="flex justify-between text-sm border-b border-blue-50 pb-2">
                                <span>Lun - Vie</span>
                                <span className="text-blue-600 font-bold">10:00 - 19:00</span>
                            </li>
                            <li className="flex justify-between text-sm border-b border-blue-50 pb-2">
                                <span>Sábados</span>
                                <span className="text-blue-600 font-bold">10:00 - 15:00</span>
                            </li>
                            <li className="flex justify-between text-sm pb-2">
                                <span>Domingos</span>
                                <span className="text-slate-400 font-medium italic">Cerrado</span>
                            </li>
                        </ul>
                        <div className="mt-6 p-4 bg-blue-50 rounded-[20px] border border-blue-100">
                            <div className="flex items-center gap-2 text-blue-600 mb-1">
                                <Clock size={16} />
                                <span className="text-xs font-black uppercase tracking-wider">Servicio Profesional</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- BARRA INFERIOR --- */}
            <div className="bg-slate-50 py-6 border-t border-blue-50">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    <p>© {currentYear} NextVision. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <Link to="/privacidad" className="hover:text-blue-600 transition-colors">Privacidad</Link>
                        <Link to="/terminos" className="hover:text-blue-600 transition-colors">Términos</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Componentes auxiliares
const FooterLink = ({ to, text }) => (
    <li>
        <Link 
            to={to} 
            className="text-sm font-medium hover:text-blue-600 hover:translate-x-1 transition-all duration-300 inline-block"
        >
            {text}
        </Link>
    </li>
);

const SocialIcon = ({ icon }) => (
    <button className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm">
        {icon}
    </button>
);

export default Footer;