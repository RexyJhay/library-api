const express = require('express');
const { signup, getAllUsers, get1User, del1User, login } = require('../Controllers/userController');
const authorize = require('../middlewares/authorize');
const router = express.Router();

router.post('/', signup)

router.post('/login', login)

router.get('/' ,getAllUsers)

router.get('/oneuser/:id', get1User)

router.delete('/deluser/:id', authorize(["admin"]) , del1User)

module.exports = router