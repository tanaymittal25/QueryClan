const express = require('express');
const { signUp, signIn, signOut } = require('../controllers/auth');
const { userSignUpValidator } = require('../validator/index');
const { userById } = require('../controllers/user');
const router = express.Router();

router.post("/signUp", userSignUpValidator, signUp);
router.post("/signIn", signIn);
router.get("/signOut", signOut);

router.param("userId", userById);

module.exports = router;