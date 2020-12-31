const Question = require('../models/Question');

exports.askQuestion = async (req, res) => {
    req.body.user = req.user;
    const question = await new Question(req.body);
    await question.save();
    res.status(200).json({
        message: "Question Added success",
    });
};