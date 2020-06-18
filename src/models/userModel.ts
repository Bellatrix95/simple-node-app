import { model, Schema } from 'mongoose';
import  IUser from './interfaces/IUser';
import bcrypt from 'bcrypt';
import emailValidator from 'email-validator';

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        trim: true,
        required:true,
        unique: true,
        validate: {
            validator: emailValidator.validate,
            message: 'Email is not valid'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, { versionKey: false });

UserSchema.pre('save', function<IUser>(next: () => void) {
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});

export default model<IUser>('User', UserSchema);
