import IShoppingList from '../models/interfaces/IShoppingList';
import shoppingListModel from '../models/shoppingListModel';
import { isNullOrUndefined } from 'util';
import { mongo } from 'mongoose';

export class ShoppingListController {
    
    public async get(req, res) {
        try {
            const userId = req.decoded.id;
            const list = await shoppingListModel.find({userId: new mongo.ObjectId(userId)});
            res.status(200).json({'user_lists': list});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Error occured, please try again!'});
        }
    }

    public async create(req, res) {
        try {
            const userId = req.decoded.id;
            const list: IShoppingList = req.body;
            list.userId = userId;

            const result = await shoppingListModel.create(list);

            res.status(200).json({
                message: 'New list "' + result.name + '" created!',
                'list': result
            });
            
        } catch (error) {
            console.log(error);
            if (error.code == 11000) {
                res.status(400).json({message: 'Shopping list name is not unique!'});
            } else {
                res.status(400).json({message: 'Error occured, please try again!'});
            }
        }
    }

    public async delete(req, res) {
        try {
            const id = req.params.id;
            await shoppingListModel.findByIdAndDelete({_id: id});

            res.status(200).json({message: 'List deleted!'});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Error occured, please try again!'});
        }
    }

    public async update(req, res) {
        try {
            const id = req.params.id;
            const userId = req.decoded.id;
            
            if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: 'Body is empty!' });
            }
            
            const updateListInfo: IShoppingList = req.body;
            const list = await shoppingListModel.findById(id);

            if (list.userId != userId) {
                return res.status(400).json({message: 'This list does not belong to you!' });
            }

            if (!list) {
                return res.status(400).json({message: "Shopping list not found!"});
            }
            
            if (updateListInfo.name) {
                const checkIfNameIsTaken = await shoppingListModel.findOne({"name": updateListInfo.name});
                if (checkIfNameIsTaken) {
                    return res.status(400).json({message: "Shopping list name already exists!"});
                }
                list.name = updateListInfo.name;
            }

            const products = updateListInfo.products;

            if (products) {
                list.products = products;
            }

            await list.save(); //or update

            res.status(200).json({message: 'List updated!'});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Error occured, please try again!'});
        }
    }

    public async aggregate(req, res) {
        try {
            const userId = req.decoded.id;
            const from = req.query.from;
            const to = req.query.to;
            
            if (isNullOrUndefined(from) || isNullOrUndefined(to) || new Date(from) > new Date(to)) {
                return res.status(400).json({message: "Range parameters are not valid!"});
            }

            const result = await shoppingListModel.aggregate([
                { 
                    '$match': {
                        'userId': new mongo.ObjectId(userId),
                        'createdAt': {
                            '$gte': new Date(from),
                            '$lte': new Date(to)
                        } 
                    }
                },
                { 
                    '$unwind': '$products' 
                },
                {
                    '$group': {
                        '_id': '$products.name',
                        'total': { '$sum': '$products.quantity' }
                    }
                },
                {
                    '$project': {
                        '_id': 0,
                        'total': 1,
                        'product': '$_id'
                    }
                }
            ]);

            res.status(200).json({'aggregation_result': result})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Aggregation failed!"});
        }
    }
}
