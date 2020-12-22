const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
            const token = jwt.sign({ _id: user._id }, 'RANDOMJSONWEBTOKENKEY');
            res.cookie("t", token, { expire: new Date() + 99999 });
            return res.json({ token, user: { user } });
        });
    });

router.get('/signout', (req, res, next) => {
    res.clearCookie("t");
    return res.json({
        message: "Signout Success"
    });
});

module.exports = router;