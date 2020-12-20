const router = require('express').Router();
const User = require('../models/User');

router.route('/signup')
    //Render Frontend for SIGNUP
    .get((req, res, next) => {
        res.send('SignUp');
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

router.route('/signin')
    //Render Frontend for SIGNIN
    .get((req, res, next) => {
        res.send('SignIn');
    })
    //Get Data From DB and Login
    .post((req, res, next) => {
        const { email, password } = req.body;
        User.findOne({ email }, (err, user) => {
            if (err || !user) {
                return res.status(401).json({
                    error: "User Not Found. Please signup."
                });
            }
            if (!user.comparePassword(user, password)) {
                return res.status(401).json({
                    error: "Incorrect Email or Password"
                });
            }
            return res.json({ user });
            //Write Logic for storing cookie and redirect to Home Page
        });
    });

module.exports = router;