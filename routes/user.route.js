const { Router } = require('express');
const { check } = require('express-validator');
const {
  updateUserById,
  deleteUser,
} = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validateFields } = require('../middlewares/validateFields.middleware');

const router = Router();

router.use(protect);

router.patch('/:id', validateFields, updateUserById);

router.delete('/:id', validateFields, deleteUser);

module.exports = {
  userRouter: router,
};
