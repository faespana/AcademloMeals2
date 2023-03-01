const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.updateUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  res.status(201).json({
    status: 'success',
    message: 'The user was updated successfully',
    user: {
      id,
      name,
      email,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user was not fount',
    });
  }

  await user.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'The user has been delated',
  });
});
