import User, { findOne } from '../models/user.js';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const signup = async (req, res) => {
    try {
        const {username, email, password, cpassword} = req.body; 
        const user = await findOne({email}); 
        if(user) {
            return res.status(409)
            .json({message : "user already exists, you can login", success: false}); 
        }
        const userModel = new User({username, email, password, cpassword}); 
        userModel.password = await hash(password, 10); 
        userModel.cpassword = await hash(cpassword, 10);
        await userModel.save(); 
        res.status(201)
            .json({message : "signup success", success: true}); 
    } catch (error) {
        res.status(500)
            .json({message : "internal server error", success: false});
    }
}

const signin = async (req, res) => {
    try {
        const {email, password} = req.body; 
        const user = await findOne({email}); 
        if(!user) {
            return res.status(403)
            .json({message : "user not found! please signup.", success: false}); 
        }
        const isPassEqual = await compare(password, user.password); 
        if(!isPassEqual) {
            return res.status(403)
            .json({message : "password is wrong.", success: false}); 
        }

        const jwtToken = sign({email: user.email, _id: user._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: '24h'}
        ); 

        res.status(200)
            .json({message : "signin success", 
                success: true, 
                jwtToken, 
                email, 
                name: user.username
            }); 
    } catch (error) {
        res.status(500)
            .json({message : "internal server error", success: false}); 
    }
}

export default {
    signup, 
    signin
}