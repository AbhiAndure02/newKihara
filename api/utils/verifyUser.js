import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  // Ensure cookies exist and contain the token
  const token = req.cookies?.access_token;
  
  if (!token) {
    return next(errorHandler(401, 'Unauthorized: No token provided'));
  }
  
  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, 'Forbidden: Invalid or expired token'));
    }
    
    // Attach decoded user data to the request object
    req.user = user;
    next();
  });
};
