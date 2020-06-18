import { Router } from 'express';
import { ShoppingListController } from '../controllers/ShoppingListController';
import { auth } from '../routes/middleware/auth'
 
const shoppingListRoutes = Router();
const shoppingListController = new ShoppingListController();

shoppingListRoutes.get('/', auth, shoppingListController.get);
shoppingListRoutes.get('/aggregate', auth, shoppingListController.aggregate);
shoppingListRoutes.post('/', auth, shoppingListController.create);
shoppingListRoutes.delete('/:id', auth, shoppingListController.delete);
shoppingListRoutes.put('/:id', auth, shoppingListController.update);


export default shoppingListRoutes;