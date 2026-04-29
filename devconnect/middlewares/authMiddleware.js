const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    // Token cookie se nikalo
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Login karo pehle!' });
    }

    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User ko request mein attach karo
    req.user = await User.findById(decoded.id).select('-password');

    next(); // aage jaao

  } catch (error) {
    res.status(401).json({ message: 'Invalid token, login karo' });
  }
};

module.exports = protect;