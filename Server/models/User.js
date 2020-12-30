const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    no_questions: String,
    no_questions: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (user.password) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) console.log(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) console.log(err);
                user.password = hash;
                next();
            });
        });
    }
});

UserSchema.methods.comparePassword = async function (user, password) {
    return await bcrypt.compare(password, user.password);
};

module.exports = mongoose.model("User", UserSchema);