const Order = require("../models/orders");

const ErrorValidation = require("../errors/ErrorValidation");
const ErrorNotFound = require("../errors/ErrorNotFound");
const ErrorForbidden = require("../errors/ErrorForbidden");

module.exports.createOrder = (req, res, next) => {
  const { machineryType, date, adress, description, email, telephone } =
    req.body;

  Order.create({
    machineryType,
    date,
    adress,
    description,
    email,
    telephone,
    owner: req.user._id,
  })
    .then((order) => res.send({ order }))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        next(new ErrorValidation("Переданы некорректные данные"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteOrderById = (req, res, next) => {
  Order.findById(req.params.orderId)
    .then((movie) => {
      if (!movie) {
        throw new ErrorNotFound("Заказ не найден");
      }
      if (String(movie.owner._id) !== req.user._id) {
        throw new ErrorForbidden("Заказ принадлежит другому пользователю");
      }
      return movie.remove();
    })
    .then((deleted) => res.send({ deleted }))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        throw new ErrorValidation("Переданы некорректные данные");
      }
      next(err);
    });
};

module.exports.findOrders = (req, res, next) => {
  Order.find({})
    .then((order) => res.send({ order }))
    .catch(next);
};
