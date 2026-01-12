import { Router } from 'express';
import { registrarUsuario, loginUsuario, getPersonal, updatePersonal, createPersonal, getCategorias, createCategoria, updateCategoria, 
    deleteCategoria, getProductos,getHorarios, saveHorarios, updateProducto, 
    createProducto, getClientes, createCita, getConsultas, crearReceta,getClientesConCitas, getRecetasPorUsuario, getProductosVenta, getMiHistorial,
getMisConsultas,} from '../controllers/userController.js';

const router = Router();

//rutyas
router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

router.get('/personal', getPersonal);
router.put('/personal/:id', updatePersonal);
router.post('/personal', createPersonal);

router.get('/', getCategorias);
router.post('/', createCategoria);
router.put('/:id', updateCategoria);
router.delete('/:id', deleteCategoria);

router.get('/productos', getProductos);
router.put('/productos/:id', updateProducto);
router.post('/productos', createProducto);

router.get('/horarios', getHorarios);
router.post('/horarios', saveHorarios);

router.get('/clientes', getClientes);
router.post('/agendar-cita', createCita);
router.get('/consultas', getConsultas);

router.post('/receta', crearReceta);
router.get('/clientes-citas', getClientesConCitas);

router.get('/recetas/usuario/:id_usuario', getRecetasPorUsuario);

router.get('/productos-venta', getProductosVenta);

router.get('/historial/:id_usuario', getMiHistorial);

router.get('/consultas/:id_usuario', getMisConsultas);



export default router;