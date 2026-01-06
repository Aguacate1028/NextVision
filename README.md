# NextVision
NextVision - Sistema Gestor de Óptica
Plataforma digital para la gestión de citas, historiales clínicos y ventas.

Instrucciones:
Debes instalar los paquetes en ambas carpetas principales:
    cd server && npm install
    cd ../client && npm install

Necesitas ejecutar ambos programas al mismo tiempo en terminales separadas:
    cd server
    npm start

    cd client
    npm run dev

Carpeta /client (Frontend en React + Vite)
En esta carpeta se encuentra todo lo que el Cliente y el Personal verán en sus navegadores.
    src/: Es la carpeta raíz del código fuente de React. Todo lo que escribas para la interfaz debe ir aquí.
    components/: Aquí van las piezas reutilizables de la interfaz (ej. Botones con diseño de burbuja, la barra de navegación con el pulpo, tarjetas de productos).
    pages/: Contiene los archivos .jsx que representan las vistas completas del sistema (ej. Login.jsx, DashboardCliente.jsx, Catalogo.jsx, RegistroConsulta.jsx).
    styles/: Archivos de estilos donde aplicarás el color azul claro y las formas redondeadas para cumplir con el diseño de burbujas.
    assets/: Aquí guardarás las fotos de los armazones del catálogo y, por supuesto, las ilustraciones de tu mascota (el pulpo pequeño con lentes).

Carpeta /server (Backend en Node.js + Express)
Esta carpeta maneja la lógica de negocio, la seguridad y la conexión a Supabase.
    controllers/: Contiene la lógica que decide qué hacer cuando llega una petición. Por ejemplo, el consultaController.js recibirá los datos de la receta y los mandará guardar.
    models/: Aquí se define la interacción directa con las tablas de la base de datos (PostgreSQL). Es donde se ejecutan los comandos para leer o escribir en CLIENTE, PRODUCTO o RECETA.
    routes/: Define las "direcciones" o URLs de tu API (ej. /api/citas, /api/ventas). Conecta una URL con un método específico de un controlador.