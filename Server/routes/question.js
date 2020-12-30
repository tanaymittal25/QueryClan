const express = require('express');
const { askQuestion } = require('../controllers/question');

const router = express.Router();

router.post("/askQuestion", askQuestion);

module.exports = router;