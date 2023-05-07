const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const Comment = require('../models/comment')
const Post = require('../models/post')
const comment = async (req, res) => {
    try {
      const { postId } = req.params;
      const { text } = req.body;
      const userId = req.user._id; 
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      const newComment = new Comment({
        userId,
        postId,
        text,
      });
  
      await newComment.save();
  
      console.log('Comment added successfully');
      res.status(201).json({ message: 'Comment added successfully' });
    } catch (err) {
      console.error('Error commenting on post:', err);
      res.status(500).json({ error: 'Failed to comment on post' });
    }
  };

  module.exports = comment