const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// REGISTER
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Password hash karo
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body; // ← password bhi lo

  try {
    // Password field select karo
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ message: "Email ya password galat hai" });
    }

    // Password compare karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email ya password galat hai" });
    }

    // Token banao
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie('token', token, {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000  // ← yeh add karo - 1 din
});

    // ✅ Redirect nahi, JSON bhejo
    res.status(200).json({ message: "Login successful" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGOUT
const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};

module.exports = { register, login, logout };