import {Router} from 'express';
const router = Router();

import { iniciaSession, getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/index.controller';
import { callVerifyToken } from '../controllers/token.controller';

router.post('/api/ventas/v0/seguridad/iniciasession',callVerifyToken, iniciaSession);
router.get('/prueba', callVerifyToken,getUsers);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser);

export default router;