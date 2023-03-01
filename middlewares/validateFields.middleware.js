const { validationResult, check } = require('express-validator');

exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

exports.signupValidations = [
    check('name', 'The name is requiered').not().isEmpty(),
    check('email', 'The email is requiered').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password is requiered').not().isEmpty(),
]

exports.loginValidations = [
   check('email', 'The email is requiered').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password is requiered').not().isEmpty(),
]