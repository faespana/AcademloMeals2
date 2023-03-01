const express = require('express');
const cors = require('cors');
const { userRouter } = require('../routes/user.route');
const { restaurantRouter } = require('../routes/restaurant.route');
const { mealRouter } = require('../routes/meal.route');
const { orderRouter } = require('../routes/order.route');
const { db } = require('../database/db');
const { authRouter } = require('../routes/auth.route');
const morgan = require('morgan');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/error.controller');
const initModel = require('./initModel');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 6000;
    this.paths = {
      user: '/api/v1/users',
      restaurant: '/api/v1/restaurants',
      meal: '/api/v1/meals',
      order: '/api/v1/orders',
      auth: '/api/v1/auth',
    };
    this.database();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.user, userRouter);
    this.app.use(this.paths.restaurant, restaurantRouter);
    this.app.use(this.paths.meal, mealRouter);
    this.app.use(this.paths.order, orderRouter);
    this.app.use(this.paths.auth, authRouter);

    this.app.all('*', (req, res, next) => {
      return next(new AppError(`Can't find ${req.originalUrl} on this server`));
    });

    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

      initModel()

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
