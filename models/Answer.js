const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    QuestionId: {
        type: String,
        trim: true,
        required: true
    },
    AnswerId: {
        type: String,
        trim: true,
        required: true
    },
    Answer: {
        type: String,
        required: true
    },
    UserId: {
        type: Array,
        trim: true
    },
    Attachments: {
        type: String,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

module.exports = mongoose.model("Answer", AnswerSchema);