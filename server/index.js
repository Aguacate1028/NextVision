import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { testConnection } from './supabase.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middlewares - CONFIGURACIÓN ÚNICA Y ORDENADA
app.use(cors());
app.use(morgan('dev'));

// Configuración de JSON con límite (Solo una vez)
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rutas
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Servidor NextVision corriendo en puerto ${PORT}`);
  await testConnection();
});