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
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return next(errorHandler(400, "Email already exists"));
        }
        await newUser.save()
        .then(()=>{
            res.json("signup suceess");
        })
        
    } catch (error) {
        next(error)
        
    }

}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password || email === '' || password === '') {
      next(errorHandler(400, 'All fields are required'));
    }
  
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return next(errorHandler(404, 'email or password may incorect'));
      }
      const validPassword = bcryp.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(400, 'email or password may incorect'));
      }
      const token = jwt.sign(
        { id: validUser._id, isAdmin: validUser.isAdmin },
        process.env.JWT_SECRET
      );
  
      const { password: pass, ...rest } = validUser._doc;
  
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User has been signed out');
    } catch (error) {
        next(error);
    }
}