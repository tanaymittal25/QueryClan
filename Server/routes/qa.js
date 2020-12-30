const router = require('express').Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');

const jwt = require('jsonwebtoken');

router.route('/askQuestion')
    .post(async (req, res, next) => {
        const question = await new Question(req.body);
        await question.save();
        res.status(200).json({
            message: "Question Added success"
        });
    });

router.route('/addAnswer')
    .post(async (req, res, next) => {
        const answer = await new Answer(req.body);
        await question.save();
        res.status(200).json({
            message: "Question Added success"
        });
    });

module.exports = router;