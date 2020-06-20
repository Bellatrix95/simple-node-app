import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { auth } from '../routes/middleware/auth'
import { tests } from '../routes/middleware/testRoutes'

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/register', userController.register);
userRoutes.post('/login', userController.login);
userRoutes.put('/change_password', auth, userController.changePassword);

//dummy route for deleting test user so repeated tests wont fail
userRoutes.delete('/delete_user/:email', tests, userController.deleteUser);
export default userRoutes;