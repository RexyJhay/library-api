const express = require('express');
// const { signup, getAllUsers, get1User, del1User } = require('../controllers/userController');
// const { del1Post, get1Post, getAllPost, createPost } = require('../controllers/postController');
const authorize = require('../middlewares/authorize');
const { getAllAuthor, createAuthor, get1Author, del1Author } = require('../Controllers/authorController');
const router = express.Router();

router.post('/',authorize(["admin","user"]) ,createAuthor)

router.get('/', getAllAuthor)

router.get('/onepost/:id', get1Author)

router.delete('/delpost/:id', authorize(["admin"]), del1Author)

module.exports = router