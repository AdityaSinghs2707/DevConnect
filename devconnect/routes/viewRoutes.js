const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');

// 🔐 getUser helper
const getUser = async (req) => {
  try {
    const token = req.cookies.token;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');

    console.log("USER FROM DB:", user);

    return user;
  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    return null;
  }
};
// HOME
router.get('/', (req, res) => res.redirect('/dashboard'));

// REGISTER PAGE ✅
router.get('/register', (req, res) => {
  res.render('pages/register', { user: null });
});

// LOGIN PAGE ✅
router.get('/login', (req, res) => {
  res.render('pages/login', { user: null });
});

// DASHBOARD ✅
router.get('/dashboard', async (req, res) => {
  const user = await getUser(req);

  const posts = await Post.find()
    .populate('author', 'name _id')
    .sort({ createdAt: -1 });

  res.render('pages/dashboard', { user, posts });
});

// CREATE POST
router.get('/create-post', async (req, res) => {
  const user = await getUser(req);

  if (!user) {
    return res.redirect('/login');
  }

  return res.render('pages/createPost', { user });
});

// SINGLE POST
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name bio');

    if (!post) return res.send('Post nahi mila');

    res.render('pages/post', { post, user: null });
  } catch {
    res.send('Error');
  }
});

module.exports = router;