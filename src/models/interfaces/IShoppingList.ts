import { Schema, Document } from 'mongoose';
import IProduct from './IProduct';

export default interface IShoppingList extends Document {
    name: string,
    userId: Schema.Types.ObjectId,
    createdAt: Date,
    products: Array<IProduct>
}