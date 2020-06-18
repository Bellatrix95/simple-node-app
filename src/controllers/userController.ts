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
            res.status(400).json({message: error.message});
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

            res.send({'message': 'Login successful!', 'token': token});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}