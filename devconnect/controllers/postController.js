const Post = require('../models/Post');

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content,
      author: req.user._id  // middleware se milega
    });

    res.status(201).json({ message: 'Post created!', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL POSTS
exports.getAllPosts = async (req, res) => {
  try {
    // populate se author ka naam bhi aayega
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 }); // latest pehle

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE POST
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email bio');

    if (!post) return res.status(404).json({ message: 'Post nahi mila' });

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post nahi mila' });

    // Sirf owner update kar sakta hai
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Sirf apni post update kar sakte ho' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // updated post return karo
    );

    res.status(200).json({ message: 'Post updated!', post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE POST
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post nahi mila' });

    // Sirf owner delete kar sakta hai
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Sirf apni post delete kar sakte ho' });
    }

    await post.deleteOne();

    res.status(200).json({ message: 'Post deleted!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};