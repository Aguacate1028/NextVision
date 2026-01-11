import { Router } from 'express';
import { registrarUsuario, loginUsuario, getPersonal, updatePersonal, createPersonal, getCategorias, createCategoria, updateCategoria, 
    deleteCategoria, getProductos,getHorarios, saveHorarios } from '../controllers/userController.js';

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

router.get('/horarios', getHorarios);
router.post('/horarios', saveHorarios);

export default router;