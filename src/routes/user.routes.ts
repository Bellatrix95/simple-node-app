import { Router } from 'express';
import { UserController } from '../controllers/userController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/register', userController.register);
userRoutes.post('/login', userController.login);

export default userRoutes;