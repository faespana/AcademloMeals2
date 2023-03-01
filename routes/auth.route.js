const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login } = require('../controllers/auth.controller');
const { validUserByEmail, validPassword } = require('../middlewares/auth.middleware');
const { validateFields, signupValidations, loginValidations } = require('../middlewares/validateFields.middleware');

const router = Router();

router.post(
  '/signup',
signupValidations,
  validateFields,
  createUser
);

router.post(
  '/login',
loginValidations,
  validateFields,
  validUserByEmail,
  validPassword,
  login
);

module.exports = {
  authRouter: router,
};
