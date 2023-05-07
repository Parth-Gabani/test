const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const Post = require('../models/post')
const Comment = require('../models/comment')

const getPostDetails = async (req, res) => {
    try {
      const { postId } = req.params;
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      const comments = await Comment.find({ postId: postId });
      const comment = comments.map(comment => comment.text)
      const likes = post.likedBy.length;
      const shareCount = post.sharedBy.length;
      const commentCount = comments.length
  
      res.json({ post, comment, likes, shareCount ,commentCount});
    } catch (err) {
      console.error('Error getting post details:', err);
      res.status(500).json({ error: 'Failed to get post details' });
    }
  };

  module.exports = getPostDetails