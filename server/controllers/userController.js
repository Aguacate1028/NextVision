import { supabase } from '../supabase.js';
import bcrypt from 'bcrypt';

export const registrarUsuario = async (req, res) => {
    // 1. Recibimos los nuevos datos desde el body
    const { email, password, nombre, apellidos } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 2. Insertar en la tabla 'usuario'
        const { data: nuevoUsuario, error: errorUsuario } = await supabase
            .from('usuario')
            .insert([{ 
                email: email, 
                password: hashedPassword, 
                rol: 'Cliente' 
            }])
            .select()
            .single();

        if (errorUsuario) throw errorUsuario;

        // 3. Insertar en la tabla 'cliente' usando el id_usuario recién creado
        const { error: errorCliente } = await supabase
            .from('cliente')
            .insert([{
                nombres: nombre,
                apellidos: apellidos,
                id_usuario: nuevoUsuario.id_usuario
            }]);

        if (errorCliente) throw errorCliente;

        res.status(201).json({ message: 'Usuario y cliente registrados con éxito' });
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    // Es buena práctica limpiar el email
    const cleanEmail = email.toLowerCase().trim();

    try {
        // --- PASO 1: BUSCAR EN LA TABLA 'PERSONAL' (Administradores y Empleados) ---
        const { data: persona, error: errorPer } = await supabase
            .from('personal')
            .select('*')
            .eq('correo', cleanEmail)
            .single();

        if (persona) {
            // Verificamos contraseña usando 'contraPer' que es tu columna en esa tabla
            const match = await bcrypt.compare(password, persona.contraPer);
            
            if (match) {
                return res.status(200).json({
                    message: 'Login exitoso (Equipo)',
                    user: { 
                        id: persona.id_personal, 
                        email: persona.correo, 
                        user_metadata: {
                            rol: persona.rol,
                            nombre: persona.nombres,
                            apellido: persona.apellidos
                        }
                    }
                });
            } else {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        }

        // --- PASO 2: SI NO ESTÁ EN PERSONAL, BUSCAR EN 'USUARIO' (Clientes) ---
        const { data: usuario, error: errorUser } = await supabase
            .from('usuario')
            .select(`
                id_usuario,
                email,
                password,
                rol,
                cliente (nombres, apellidos)
            `)
            .eq('email', cleanEmail)
            .single();

        if (usuario) {
            // Verificamos contraseña usando 'password' que es tu columna en la tabla usuario
            const match = await bcrypt.compare(password, usuario.password);
            
            if (match) {
                const datosCliente = Array.isArray(usuario.cliente) ? usuario.cliente[0] : usuario.cliente;
                return res.status(200).json({
                    message: 'Login exitoso (Cliente)',
                    user: { 
                        id: usuario.id_usuario, 
                        email: usuario.email, 
                        user_metadata: {
                            rol: usuario.rol,
                            nombre: datosCliente?.nombres || 'Usuario',
                            apellido: datosCliente?.apellidos || ''
                        }
                    }
                });
            } else {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        }

        // --- PASO 3: SI NO SE ENCONTRÓ EN NINGUNA TABLA ---
        return res.status(404).json({ error: 'El correo no está registrado en el sistema' });

    } catch (error) {
        console.error("Error en el login:", error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
export const getPersonal = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('personal')
            .select('*')
            .order('id_personal', { ascending: true });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePersonal = async (req, res) => {
  const { id } = req.params; 
  const { nombres, apellidos, correo, puesto, rol, password } = req.body;

  try {
    const updateData = { 
      nombres, 
      apellidos, 
      correo, 
      puesto, 
      rol // Aquí va el nuevo rango
    };

    // Solo actualiza contraseña si se escribe una nueva
    if (password && password.trim() !== "") {
      updateData.contraPer = await bcrypt.hash(password, 10);
    }

    const { data, error } = await supabase
      .from('personal')
      .update(updateData)
      .eq('id_personal', id) // <--- REVISA QUE ESTO COINCIDA CON TU TABLA
      .select();

    if (error) throw error;
    
    console.log("Registro actualizado en DB:", data);
    res.json({ message: "Actualizado", data });
  } catch (error) {
    console.error("Error en update:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createPersonal = async (req, res) => {
    try {
        const { nombres, apellidos, correo, password, puesto, rol } = req.body;

        // 1. Encriptar la contraseña (importante para el login después)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 2. Insertar en la tabla 'personal'
        const { data, error } = await supabase
            .from('personal')
            .insert([
                { 
                    nombres, 
                    apellidos, 
                    correo, 
                    contraPer: hashedPassword, // Nombre exacto de tu columna en DB
                    puesto, 
                    rol 
                }
            ])
            .select();

        if (error) throw error;

        res.status(201).json({
            message: 'Personal registrado con éxito',
            data: data[0]
        });
    } catch (error) {
        console.error("Error al crear personal:", error.message);
        res.status(500).json({ error: 'Error interno al registrar personal' });
    }
};

export const getCategorias = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('categoria')
            .select('*')
            .order('nombre', { ascending: true });

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const { data, error } = await supabase
            .from('categoria')
            .insert([{ nombre, descripcion }])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const { data, error } = await supabase
            .from('categoria')
            .update({ nombre, descripcion })
            .eq('id_categoria', id) // Asegúrate que este sea el nombre de tu columna ID
            .select();

        if (error) throw error;

        res.status(200).json({ message: 'Categoría actualizada con éxito', data: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        const { error } = await supabase
            .from('categoria')
            .delete()
            .eq('id_categoria', id);

        if (error) throw error;

        res.status(200).json({ message: 'Categoría eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductos = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('producto')
            .select('*')
            .order('id_producto', { ascending: false });

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};