import User from "../models/user.model.js";
import bcryp from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
import { basename } from "path/win32";

export const signup = async(req, res, next)=>{
    const {email, password} = req.body;
    try {
        if(!email || !password || email ==="" || password===""){
            next(errorHandler(400, "all fields are requirded"))
        } 
        const hashpass = bcryp.hashSync(password, 10);

        const newUser =new User({
            email,
            password:hashpass,
        });
        await newUser.save()
        .then(()=>{
            res.json("signup suceess");
        })
        
    } catch (error) {
        
    }

}