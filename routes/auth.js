const router = require('express').Router();
const User = require('../models/User');

router.route('/signup')
    //Render Frontend for SIGNUP
    .get((req, res, next) => {
        res.send('Hello');
    })
    //Push Data to DB
    .post(async (req, res, next) => {
        const userExists = await User.findOne({
            email: req.body.email
        });
        if (userExists)
            return res.status(403).json({
                error: "Email is taken"
            });
        const user = await new User(req.body);
        await user.save();
        res.status(200).json({
            message: "Signup success ... Please Login"
        });
    });

module.exports = router;