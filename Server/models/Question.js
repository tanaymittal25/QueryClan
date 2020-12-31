const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
   
    title: {
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

QuestionSchema.pre('find', function(next) {
    this.populate('user', 'name');
    this.populate('comments.user', 'name');
    this.populate('answers.user', 'name');
    this.populate('answers.comments.user', 'name');
    next();
});

QuestionSchema.pre('findOne', function(next) {
    this.populate('user', 'name');
    this.populate('comments.user', 'name');
    this.populate('answers.user', 'name');
    this.populate('answers.comments.user', 'name');
    next();
});

QuestionSchema.index({
    'title': 'text',
    'content': 'text',
    'keywords.text': 'text',
    'answers.content': 'text',
    'comments.content': 'text',
    'answers.comments.content': 'text',
    'searchText': 'text',
}, {name: 'questionSchemaIndex'});

const getSearchText = function(question) {
    var searchText = "";
    searchText += question.title + " ";
    if (question.content)
        searchText += question.content + " ";
    question.answers.forEach(answer => {
        searchText += answer.content + " ";
        answer.comments.forEach(comment => {
            searchText += comment.content + " ";
        });
    });
    question.comments.forEach(comment => {
        searchText += comment.content + " ";
    });
    return searchText;
}
  
QuestionSchema.statics.updateSearctText = function(id, next) {
    this.findOne({ _id: id }).exec(function(err, question) {
        if (err) console.log(err);
        var searchText = getSearchText(question);
        this.update({ _id: id }, { searchText: searchText }, (err) => {
            if (err) console.log(err);
        });
    }.bind(this));
}

QuestionSchema.pre('save', function(next) {
    this.searchText = getSearchText(this);
    next();
});

module.exports = mongoose.model("Question", QuestionSchema);