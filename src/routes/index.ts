import { Router } from 'express';
const router = Router();

import { iniciaSesion, getUsers, getUserById, createUser, updateUser, deleteUser, menu } from '../controllers/seguridad/index.controller';
import { callVerifyToken } from '../controllers/token.controller';
import { buscarProducto, insertarProducto, listarCategoria, listarSubcategoria, listarMarca } from '../controllers/inventario/index.controller';

/* Seguridad */
router.post('/api/seguridad/login/iniciasesion', callVerifyToken, iniciaSesion);
router.get('/thalia/esteesunmensajeparati', callVerifyToken,getUsers);

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser);
router.get('/api/seguridad/login/menu',menu);

/* Producto */
router.get('/api/inventario/producto/buscarproducto', callVerifyToken, buscarProducto);
router.post('/api/inventario/producto/insertarproducto', callVerifyToken, insertarProducto);

/* Categoria */
router.get('/api/inventario/categoria/listarcategoria', callVerifyToken, listarCategoria);
router.get('/api/inventario/categoria/listarsubcategoria', callVerifyToken, listarSubcategoria);
router.get('/api/inventario/categoria/listarmarca', callVerifyToken, listarMarca);



export default router;