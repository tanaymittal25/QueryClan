const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
   
    Question: {
        type: String,
        trim: true,
        required: true
    },
    UserId: {
        type: String,
        required: true
    },
    Keywords: {
        type: Array,
        trim: true
    },
    Domain: {
        type: String,
        trim: true
    },
    Version: {
        type: String,
        trim: true
    },
    isClosed: Boolean,
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

module.exports = mongoose.model("Question", QuestionSchema);