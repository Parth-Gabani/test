const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const Post = require('../models/post')

const post = async (req, res) => {
    try {
      const { caption, imageUrl } = req.body;
      const userId = req.user._id; 
  
      const newPost = new Post({
        userId,
        caption,
        imageUrl,
      });
  
      await newPost.save();
  
      console.log('Post created successfully');
      res.status(201).json({ message: 'Post created successfully' });
    } catch (err) {
      console.error('Error creating post:', err);
      res.status(500).json({ error: 'Failed to create post' });
    }
  };
  
  const like = async (req, res) => {
    try {
      const { postId } = req.params;
      const userId = req.user._id; 
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      if (post.likedBy.includes(userId)) {
        return res.status(400).json({ error: 'Post already liked by the user' });
      }
  
      post.likedBy.push(userId);
      await post.save();
  
      console.log('Post liked successfully');
      res.json({ message: 'Post liked successfully' });
    } catch (err) {
      console.error('Error liking post:', err);
      res.status(500).json({ error: 'Failed to like post' });
    }
  };
  
  const share = async (req, res) => {
    try {
      const { postId } = req.params;
      const userId = req.user._id;
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      post.sharedBy.push(userId);
      await post.save();
  
      console.log('Post shared successfully');
      res.json({ message: 'Post shared successfully' });
    } catch (err) {
      console.error('Error sharing post:', err);
      res.status(500).json({ error: 'Failed to share post' });
    }
  };

  module.exports = {post , like , share}