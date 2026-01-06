import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { testConnection } from './supabase.js';

const app = express();

// Middlewares necesarios
app.use(cors()); // Permite peticiones del client
app.use(express.json()); // Permite recibir cuerpos JSON (para agendar citas o ventas)
app.use(morgan('dev')); // Loguea las peticiones en consola para depuración

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Servidor NextVision corriendo en puerto ${PORT}`);
  await testConnection();
});