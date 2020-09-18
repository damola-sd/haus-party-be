import jwt from 'jsonwebtoken';

const checkUserIsAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization || req.query.authorization;
    if (!token) {
      return res.status(401).json({
        message: 'no token found',
      });
    }
    const { JWT_SECRET } = process.env;
    const decoded = jwt.verify(token, JWT_SECRET).data;
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'invalid token',
    });
  }
};

export default checkUserIsAuthenticated;
