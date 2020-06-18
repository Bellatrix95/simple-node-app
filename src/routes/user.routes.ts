import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { auth } from '../routes/middleware/auth'

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/register', userController.register);
userRoutes.post('/login', userController.login);
//userRoutes.post('/resetPassword', auth, userController.resetPassword);

export default userRoutes;