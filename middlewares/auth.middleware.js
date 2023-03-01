const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { promisify } = require('util');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');


exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token it not longer available', 401)
    );
  }

  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10 /*division base 10*/
    );

    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError('User recently changed password!, please login again', 401)
      );
    }
  }

  req.sessionUser = user;

  next();
});

exports.validUserByEmail = catchAsync(async(req, res, next) => {
  const {email} = req.body

  const user = await User.findOne({
    where: {
      email,
      status: true
    }
  })
  if (!user) {
    return next(new AppError("The user is not registered", 401))
  }

  req.user = user
  next()
})

exports.validPassword = catchAsync(async(req, res, next) => {
  const {user} = req
  const {password} = req.body

  if(!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid Credentials', 401))
  }
  next()
})