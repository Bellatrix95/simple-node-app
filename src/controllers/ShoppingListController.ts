import IShoppingList from '../models/interfaces/IShoppingList';
import shoppingListModel from '../models/shoppingListModel';

export class ShoppingListController {
    
    public async get(req, res) {
        try {
            const userId = req.decoded.id;
            const list = shoppingListModel.find({userId: userId});
            console.log("listaaaaa" + list)
            res.status(200).json(list);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    public async create(req, res) {
        try {
            const userId = req.decoded.id;
            const data: IShoppingList = req.body;
            data.userId = userId;

            const result = await shoppingListModel.create(data);

            res.status(200).json({message: 'New list ' + result.name + ' created!'});
            
        } catch (error) {
            res.status(400).json({error});
        }
    }

    public async delete(req, res) {
        try {
            const id = req.params.id;
            shoppingListModel.delete(id);

            res.status(200).json({message: 'List deleted!'});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    public async update(req, res) {
        try {
            const id = req.params.id;
            const userId = req.decoded.id;
            //dodaj provjeru je li body prazan
            
            const updateListInfo: IShoppingList = req.body;
            const list = await shoppingListModel.findById(id);

            if (list.userId != userId) {
                return res.status(400).json({message: 'This list does not belong to you!' });
            }

            const products = updateListInfo.products;

            if (!list) {
                return res.status(400).json({message: "Shopping list not found!"});
            }

            if (updateListInfo.name) {
                list.name = updateListInfo.name;
            }

            if (products) {
                list.products = products;
            }

            const updatedList = list.save(); //or update //testiraj

            res.status(200).send(updatedList);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

}
