import { object, string } from 'joi'; 

const signupValidation = (req, res, next) => {
    const schema = object({
        username: string().min(5).max(100).required(), 
        email: string().email().required(), 
        password: string().min(8).max(20).required(), 
        cpassword: string().min(8).max(20).required(), 
    }); 
    const {error} = schema.validate(req.body); 
    if(error) {
        return res.status(400).json({message : "bad request", error}); 
    }
    next(); 
}

const signinValidation = (req, res, next) => {
    const schema = object({
        email: string().email().required(), 
        password: string().min(8).max(20).required(), 
    }); 
    const {error} = schema.validate(req.body); 
    if(error) {
        return res.status(400).json({message : "bad request", error}); 
    }
    next(); 
}

export default {
    signupValidation, 
    signinValidation
}