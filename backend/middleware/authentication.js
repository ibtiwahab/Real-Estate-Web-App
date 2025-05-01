const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Assuming you have a User model

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get the token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await User.findById(decoded.userId); // Find user by decoded ID

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // Attach user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;
