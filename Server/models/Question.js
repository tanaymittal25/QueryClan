const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
   
    question: {
        type: String,
        required: true
    },
    content: String,
    answers: [{
        content: String,
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        created: {
            type: Date,
            default: Date.now
        },
        comments: [{
            content: String,
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            },
            created: {
                type: Date,
                default: Date.now
            }
        }]
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    keywords: [{
        text: String
    }],
    domain: String,
    Version: String,
    isClosed: Boolean,
    Attachments: String,
    created: {
        type: Date,
        default: Date.now
    },
    comments: [{
        content: String,
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        created: {
            type: Date,
            default: Date.now
        }
    }],
    updated: Date,
    searchText: String,
});

module.exports = mongoose.model("Question", QuestionSchema);