import { recetasMock } from './recetas';

export const clientesMock = [
  {
    id_cliente: 1,
    nombres: "Mariana",
    apellidos: "Sosa Méndez",
    telefono: "555-0102",
    direccion: "Av. Reforma 123, CDMX",
    email: "mariana.sosa@email.com",
    recetas: recetasMock.filter(r => r.id_cliente === 1)
  },
  {
    id_cliente: 2,
    nombres: "Roberto",
    apellidos: "García Luna",
    telefono: "555-0988",
    direccion: "Calle Pino 45, Edomex",
    email: "roberto.gl@email.com",
    recetas: recetasMock.filter(r => r.id_cliente === 2)
  },
  {
    id_cliente: 3,
    nombres: "Ximena",
    apellidos: "Peralta",
    telefono: "555-2233",
    direccion: "Colonia Juárez 404, CDMX",
    email: "xime.peralta@email.com",
    recetas: recetasMock.filter(r => r.id_cliente === 3)
  },
  {
    id_cliente: 4,
    nombres: "Isaac",
    apellidos: "Newton",
    telefono: "555-0000",
    direccion: "Cambridge St 10, Londres",
    email: "isaac.optica@email.com",
    recetas: []
  }
];