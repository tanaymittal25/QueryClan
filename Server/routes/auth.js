const express = require('express');
const { signUp, signIn, signOut } = require('../controllers/auth');

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/signOut", signOut);

module.exports = router;