exports.userSignUpValidator = (req, res, next) => {
    req.check("name", "Name is Required").notEmpty();
    req.check("email", "Email is Required").notEmpty();
    req.check("password", "Password is Required").notEmpty();
    req.check("domain", "Domain is Required").notEmpty();

    req.check("email", "Email not Valid")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 8,
            max: 2000
        });
    
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain atleast 6 characters");

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            error: firstError
        });
    }

    next();
};