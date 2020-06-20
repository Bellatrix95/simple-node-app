import IUser from '../models/interfaces/IUser';
import userModel from '../models/userModel';
import bcrypt from 'bcrypt';
import { generateToken } from '../routes/middleware/auth'

export class UserController {
    
    public async register(req, res) {
        try {
            const model: IUser = req.body;
            await userModel.create(model);
            res.status(200).json({message: 'Successfully registered, sign in to continue!'});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Error occured, please try again!'});
        }
    }

    public async login(req, res) {
        try {
            const model: IUser = req.body;
            const user = await userModel.findOne({ email: model.email });
            
            if (!user) {
                return res.status(400).json({message: "Login failed, user not found!"});
            }
            const isMatch = await bcrypt.compare(model.password, user.password);
   
            if (!isMatch) {
                return res.status(400).json({message: 'Login failed, password does not match!'});
            }

            const token = generateToken({
                id: user.id
            });

            res.status(200).send({'message': 'Login successful!', 'token': token});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Error occured, please try again!'});
        }
    }

    public async changePassword(req, res) {
        try {
            const userId = req.decoded.id;
            const currentPassword = req.body.currentPassword;
            const newPassword = req.body.newPassword;

            const user = await userModel.findById(userId);
            
            if (!user) {
                return res.status(400).json({message: "User not found!"});
            }

            const isMatch = await userModel.schema.methods.comparePassword(currentPassword, user.password);
   
            if (!isMatch) {
                return res.status(400).json({message: 'Current password does not match!'});
            }
            if (currentPassword === newPassword) {
                return res.status(400).json({message: 'Passwords are the same!'});
            }
            user.password = newPassword;
            await user.save();

            res.status(200).json({message: 'Successfully changed password!'});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Error occured, please try again!'});
        }
    }

    //remove user from database
    public async deleteUser(req, res) {
        try {
            const email = req.params.email;
            await userModel.deleteOne({"email": email}).exec();
            res.status(200).json({message: 'User deleted!'});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Error occured, please try again!'});
        }
    }
}