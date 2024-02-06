import jwt from 'jsonwebtoken';
import User from '../models/users/user.model.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({
      success: false,
      message: 'Access Denied, No token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); // Busca al usuario en la base de datos

    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'User no longer exists, no try to login again, please register.',
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send({
        success: false,
        message: 'Token expired, please login again.',
      });
    } if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).send({
        success: false,
        message: 'Invalid token, please try again or login to get a valid token.',
      });
    }
    return next(error);
  }
  return null;
};

export default authMiddleware;
