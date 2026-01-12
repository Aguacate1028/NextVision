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

export const getHorarios = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('horario_atencion')
            .select('*')
            .order('dia_semana', { ascending: true });

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener horarios:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const saveHorarios = async (req, res) => {
  const { horarios } = req.body;

  try {
    if (!horarios || !Array.isArray(horarios)) {
      return res.status(400).json({ error: "Datos no válidos" });
    }

    // En Supabase, para actualizar varios registros, lo más eficiente 
    // es hacer una promesa por cada actualización.
    const updates = horarios.map((h) => 
      supabase
        .from('horario_atencion')
        .update({
          apertura: h.apertura,
          cierre: h.cierre,
          intervalo_minutos: h.intervalo_minutos,
          esta_activo: h.esta_activo,
          ultima_modificacion: new Date().toISOString() // Sincroniza la hora
        })
        .eq('id_horario', h.id_horario)
    );

    // Ejecutamos todas las actualizaciones en paralelo
    const results = await Promise.all(updates);

    // Verificamos si alguna dio error
    const firstError = results.find(r => r.error);
    if (firstError) throw firstError.error;

    res.status(200).json({ 
      success: true, 
      message: "¡Agenda actualizada en Supabase con éxito!" 
    });

  } catch (error) {
    console.error("Error en Supabase:", error.message);
    res.status(500).json({ 
      error: "Error al guardar en Supabase", 
      detalle: error.message 
    });
  }
};

export const updateProducto = async (req, res) => {
  const { id } = req.params; // El id_producto viene de la URL
  const { nombre, descripcion, precio, stock, id_categoria, imagen_producto } = req.body;

  try {
    const { data, error } = await supabase
      .from('producto')
      .update({
        nombre,
        descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        id_categoria: parseInt(id_categoria),
        imagen_producto // Aquí se guarda la cadena base64 o URL de la imagen
      })
      .eq('id_producto', id)
      .select();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: "Producto actualizado correctamente",
      data
    });

  } catch (error) {
    console.error("Error al actualizar producto:", error.message);
    res.status(500).json({ 
      error: "No se pudo actualizar el producto", 
      detalle: error.message 
    });
  }
};

export const createProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock, id_categoria, imagen_producto } = req.body;

  try {
    const { data, error } = await supabase
      .from('producto')
      .insert([
        { 
          nombre, 
          descripcion, 
          precio: parseFloat(precio), 
          stock: parseInt(stock), 
          id_categoria: parseInt(id_categoria), 
          imagen_producto 
        }
      ])
      .select();

    if (error) throw error;

    // Devolvemos el objeto creado directamente para que el modal lo procese bien
    res.status(201).json(data[0]); 
    
  } catch (error) {
    console.error("Error al crear producto:", error.message);
    res.status(500).json({ error: "Error al guardar el producto", detalle: error.message });
  }
};

export const getClientes = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('usuario')
            .select('id_usuario, email, rol')
            .eq('rol', 'Cliente') // Filtramos para no traer administradores o personal
            .order('email', { ascending: true });

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCita = async (req, res) => {
    const { id_usuario, fecha, hora, id_personal, descripcion } = req.body;

    try {
        // Combinamos fecha y hora en formato ISO para TIMESTAMP WITH TIME ZONE
        const fechaHoraISO = new Date(`${fecha}T${hora}:00`).toISOString();

        const { data, error } = await supabase
            .from('consulta')
            .insert([
                { 
                    fecha_hora: fechaHoraISO,
                    id_usuario: id_usuario,
                    id_personal: id_personal, // El ID del doctor/empleado logueado
                    descripcion: descripcion || 'Consulta general',
                    estado: 'Agendada'
                }
            ])
            .select();

        if (error) throw error;

        res.status(201).json({ success: true, data: data[0] });
    } catch (error) {
        console.error("Error al agendar:", error.message);
        res.status(500).json({ error: "Error al registrar la cita" });
    }
};

export const getConsultas = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('consulta')
            .select(`
                id_consulta,
                fecha_hora,
                estado,
                id_usuario,
                usuario ( email )
            `);
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const crearReceta = async (req, res) => {
    try {
        const { 
            id_consulta, 
            observaciones, 
            motivo, 
            dp,
            esf_od, cil_od, eje_od, 
            esf_oi, cil_oi, eje_oi 
        } = req.body;

        // Validamos que exista el id_consulta ya que es la llave foránea
        if (!id_consulta) {
            return res.status(400).json({ error: "El ID de consulta es obligatorio" });
        }

        const { data, error } = await supabase
            .from('receta')
            .insert([{
                id_consulta,
                observaciones,
                motivo,
                dp: parseInt(dp) || null,
                esf_od: parseFloat(esf_od) || 0,
                cil_od: parseFloat(cil_od) || 0,
                eje_od: parseInt(eje_od) || 0,
                esf_oi: parseFloat(esf_oi) || 0,
                cil_oi: parseFloat(cil_oi) || 0,
                eje_oi: parseInt(eje_oi) || 0
            }])
            .select();

        if (error) {
            // Error común: intentar insertar receta duplicada para una misma consulta
            if (error.code === '23505') {
                return res.status(400).json({ error: "Esta consulta ya tiene una receta registrada" });
            }
            throw error;
        }

        // OPCIONAL: Podrías actualizar el estado de la consulta a 'Finalizada' aquí
        await supabase
            .from('consulta')
            .update({ estado: 'Finalizada' })
            .eq('id_consulta', id_consulta);

        res.status(201).json({ 
            message: "Receta registrada y consulta finalizada", 
            data: data[0] 
        });

    } catch (error) {
        console.error("Error al crear receta:", error.message);
        res.status(500).json({ error: "No se pudo guardar la receta" });
    }
};

export const getClientesConCitas = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('consulta')
            .select(`
                usuario:id_usuario (*)
            `);

        if (error) throw error;

        // Filtrar nulos y eliminar duplicados de forma segura
        const usuarios = data
            .map(c => c.usuario)
            .filter(u => u !== null); // Evita el error "cannot read properties of null"

        const unicos = Array.from(new Map(usuarios.map(u => [u.id_usuario, u])).values());

        res.status(200).json(unicos);
    } catch (error) {
        console.error("Error en getClientesConCitas:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const getRecetasPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    // En Supabase, el JOIN se hace definiendo la relación en el .select()
    // Usamos !inner para filtrar las recetas basadas en una columna de la tabla consulta
    const { data, error } = await supabase
      .from('receta')
      .select(`
        *,
        consulta!inner (
          id_usuario,
          fecha_hora,
          descripcion
        )
      `)
      .eq('consulta.id_usuario', id_usuario)
      .order('fecha_registro', { ascending: false });

    if (error) throw error;

    // Formateamos la respuesta para que coincida con lo que espera tu frontend
    const result = data.map(r => ({
      ...r,
      fecha_consulta: r.consulta.fecha_hora,
      motivo_consulta: r.consulta.descripcion
      // Nota: r.motivo ya existe en tu tabla receta según tu SQL
    }));

    res.json(result);
  } catch (error) {
    console.error("Error en Supabase:", error.message);
    res.status(500).json({ error: "Error al obtener las recetas", details: error.message });
  }
};

export const getProductosVenta = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('producto')
            .select(`
                id_producto,
                nombre,
                descripcion,
                precio,
                stock,
                imagen_producto,
                id_categoria,
                categoria (
                    nombre
                )
            `)
            .order('nombre', { ascending: true });

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener catálogo de ventas:", error.message);
        res.status(500).json({ error: "No se pudo cargar el catálogo de productos" });
    }
};

export const getMiHistorial = async (req, res) => {
    const { id_usuario } = req.params; // Captura el ID dinámico de la URL

    try {
        const { data, error } = await supabase
            .from('receta')
            .select(`
                *,
                consulta!inner (
                    id_usuario,
                    personal (nombres, apellidos)
                )
            `)
            .eq('consulta.id_usuario', id_usuario);

        if (error) throw error;
        res.status(200).json(data || []);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener historial" });
    }
};

export const getMisConsultas = async (req, res) => {
    // Capturamos el id_usuario que viene de la URL
    const { id_usuario } = req.params;

    try {
        const { data, error } = await supabase
            .from('consulta') // FROM consulta c
            .select(`
                id_consulta,
                fecha_hora,
                estado,
                descripcion,
                id_usuario,
                personal (
                    nombres,
                    apellidos
                )
            `) // LEFT JOIN personal p ON c.id_personal = p.id_personal
            .eq('id_usuario', id_usuario) // WHERE c.id_usuario = 16
            .order('fecha_hora', { ascending: false }); // ORDER BY c.fecha_hora DESC

        if (error) {
            console.error("Error al consultar Supabase:", error.message);
            return res.status(400).json({ error: error.message });
        }

        // Si todo sale bien, enviamos el arreglo de consultas
        res.status(200).json(data);

    } catch (error) {
        console.error("Error crítico en el servidor:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener citas" });
    }
};