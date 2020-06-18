import IUser from '../models/interfaces/IUser';
import userModel from '../models/userModel';
import bcrypt from 'bcrypt';

export class UserController {
    
    public async register(req, res) {
        try {

            const model: IUser = req.body;
            const user = await userModel.create(model);
            
            res.status(200).json({message: 'Successfully registered, sign in to continue!'});
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    public async login(req, res) {
        try {
            const model: IUser = req.body;
            const user = await userModel.findOne({ email: model.email });
            
            if (!user) {
                res.status(400).json({message: "Login failed, user not found!"});
                return;
            }
            const isMatch = await bcrypt.compare(model.password, user.password);
   
            if (!isMatch) {
                res.status(400).json({message: 'Login failed, password does not match!'});
                return;
            }

            res.send("Login successuful!");
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}