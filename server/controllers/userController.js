import { supabase } from '../supabase.js';
import bcrypt from 'bcrypt';

export const registrarUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Generar el hash (el número 10 es el nivel de seguridad/rondas)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 2. Insertar en la base de datos usando la contraseña cifrada
        const { data, error } = await supabase
            .from('usuario')
            .insert([
                { 
                    email: email, 
                    password: hashedPassword, // <--- Guardamos el hash, no el texto plano
                    rol: 'Cliente' 
                }
            ])
            .select();

        if (error) throw error;
        res.status(201).json({ message: 'Usuario registrado con éxito' });
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Buscar al usuario solo por email
        const { data: usuario, error } = await supabase
            .from('usuario')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        // 2. Comparar la contraseña plana con el hash de la BD
        const match = await bcrypt.compare(password, usuario.password);

        if (!match) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // 3. Si coincide, login exitoso
        res.status(200).json({
            message: 'Login exitoso',
            user: { id: usuario.id_usuario, email: usuario.email, rol: usuario.rol }
        });

    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};