-- Definición de tipos ENUM para roles
CREATE TYPE user_role AS ENUM ('Cliente', 'Empleado', 'Administrador');

-- Tabla de Usuarios (Maneja credenciales para todos)
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Mayor longitud para Hashes [cite: 346]
    rol user_role NOT NULL
);

-- Tabla Cliente
CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    telefono VARCHAR(15),
    direccion VARCHAR(150),
    id_usuario INT UNIQUE NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- Tabla Personal (Empleados y Administradores)
CREATE TABLE personal (
    id_personal SERIAL PRIMARY KEY,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    puesto VARCHAR(50),
    rol user_role NOT NULL
);

-- Tabla Consulta (Citas)
CREATE TABLE consulta (
    id_consulta SERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP WITH TIME ZONE, -- Formato correcto para Postgres
    estado VARCHAR(30) DEFAULT 'Agendada',
    descripcion TEXT,
    id_cliente INT REFERENCES cliente(id_cliente),
    id_personal INT REFERENCES personal(id_personal)
);

-- Tabla Receta (Historial Clínico)
CREATE TABLE receta (
    id_receta SERIAL PRIMARY KEY,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observaciones TEXT,
    motivo VARCHAR(100),
    esf_od DECIMAL(5,2),
    cil_od DECIMAL(5,2),
    eje_od INT,
    esf_oi DECIMAL(5,2),
    cil_oi DECIMAL(5,2),
    eje_oi INT,
    dp INT,
    id_consulta INT UNIQUE REFERENCES consulta(id_consulta)
);

-- Tabla Categoria
CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(100)
);

-- Tabla Producto
CREATE TABLE producto (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    imagen_producto text,
    id_categoria INT REFERENCES categoria(id_categoria)
);

-- Tabla Transacción (Unifica Compra/Venta)
CREATE TABLE transaccion (
    id_transaccion SERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    tipo VARCHAR(20), -- 'Online' o 'Fisica'
    id_cliente INT REFERENCES cliente(id_cliente),
    id_personal INT REFERENCES personal(id_personal) -- NULL si es compra online
);

-- Tabla Detalle
CREATE TABLE detalle (
    id_detalle SERIAL PRIMARY KEY,
    cantidad INT NOT NULL,
    precio_ind DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    id_transaccion INT REFERENCES transaccion(id_transaccion),
    id_producto INT REFERENCES producto(id_producto)
);

CREATE TABLE horario_atencion (
    id_horario SERIAL PRIMARY KEY,
    dia_semana INT NOT NULL, -- 0 para Domingo, 1 para Lunes, etc.
    dia_nombre VARCHAR(15) NOT NULL, -- 'Lunes', 'Martes'...
    apertura varchar NOT NULL,
    cierre varchar NOT NULL,
    intervalo_minutos INT DEFAULT 30, -- Para definir citas cada 30, 45 o 60 min
    esta_activo BOOLEAN DEFAULT true, -- Para marcar si la óptica abre ese día
    ultima_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos iniciales (Configuración por defecto)
INSERT INTO horario_atencion (dia_semana, dia_nombre, apertura, cierre, intervalo_minutos, esta_activo) VALUES
(1, 'Lunes', '09:00', '18:00', 30, true),
(2, 'Martes', '09:00', '18:00', 30, true),
(3, 'Miércoles', '09:00', '18:00', 30, true),
(4, 'Jueves', '09:00', '18:00', 30, true),
(5, 'Viernes', '09:00', '18:00', 30, true),
(6, 'Sábado', '10:00', '14:00', 60, true),
(0, 'Domingo', '00:00', '00:00', 0, false);