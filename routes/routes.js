const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const authenticateUser = require('../middelware/auth')

const register = require("../controller/registercontroller");
const login = require('../controller/logincontroller')
const comment = require('../controller/commentcontroller')
const { post , like , share } = require('../controller/postcontroller')
const getPostDetails = require('../controller/detailscontroller')
router.post('/register',register)
router.post('/login',authenticateUser,login)
router.post('/posts',authenticateUser,post)
router.post('/posts/:postId/like', authenticateUser, like);
router.post('/posts/:postId/comments', authenticateUser, comment);
router.post('/posts/:postId/share', authenticateUser, share);
router.post('/posts/:postId/PostDetails', authenticateUser, getPostDetails);
module.exports = router;