const express = require('express');
// const { signup, getAllUsers, get1User, del1User } = require('../controllers/userController');
// const { del1Post, get1Post, getAllPost, createPost } = require('../controllers/postController');
const authorize = require('../middlewares/authorize');
const { createBook, getAllBook, get1Book, del1Book } = require('../Controllers/bookController');
const router = express.Router();

router.post('/',authorize(["admin","user"]) ,createBook)

router.get('/', getAllBook)

router.get('/onepost/:id', get1Book)

router.delete('/delpost/:id', authorize(["admin"]), del1Book)

module.exports = router