const express = require('express');
const { askQuestion } = require('../controllers/question');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.post("/askQuestion", requireSignin, askQuestion);

module.exports = router;