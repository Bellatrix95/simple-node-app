import { model, Schema } from 'mongoose';
import IShoppingList from './interfaces/IShoppingList';

const ShoppingListSchema:Schema<IShoppingList> = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }, 
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }]
}, {versionKey: false});

export default model<IShoppingList>('ShoppingList', ShoppingListSchema);

