import { Document } from 'mongoose';

export default interface IProduct extends Document {
    name: string,
    quantity: Number
}