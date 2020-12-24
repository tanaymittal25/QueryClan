const router = require('express').Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');

const jwt = require('jsonwebtoken');

router.route('/addQuestion')
    .post(async (req, res, next) => {
        const question = await new Question(req.body);
        res.status(200).json({
            message: "Question Added success"
        });
    });

router.route('/addAnswer')
    .post((req, res, next) => {
       
    });

module.exports = router;