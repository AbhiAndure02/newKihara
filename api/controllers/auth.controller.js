import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
import { basename } from "path/win32";

export const signup = async(req, res, next)=>{
    const {email, password} = req.body;
    try {
        if(!email || !password || email ==="" || password===""){
            next(errorHandler(400, "all fields are requirded"))
        } 
        const hashpass = bcrypt.hashSync(password, 10);

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

  // Check if both email and password are provided
  if (!email || !password) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    // Find the user by email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(401, 'Invalid email or password'));
    }

    // Verify the password
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, 'Invalid email or password'));
    }

    // Generate JWT token using environment variable for secret
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      "kiharas", // Use environment variable
      { expiresIn: '1h' } // Optional: Set token expiration time
    );

    // Extract the password field from the user object before sending the response
    const { password: pass, ...rest } = validUser._doc;

    // Send the response with the token stored in an HTTP-only cookie
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure secure in production
        sameSite: 'strict',
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};



export const signout = (req, res, next) => {
  try {
    res.clearCookie('access_token', { httpOnly: true, sameSite: 'strict' });
    res.status(200).json({ message: 'User has been signed out' });
  } catch (error) {
    console.error("Sign-out error:", error);
    next(error);
  }
};
