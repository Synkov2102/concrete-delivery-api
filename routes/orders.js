const orders = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  createOrder,
  findOrders,
  deleteOrderById,
} = require('../controllers/orders');

orders.post('/order', celebrate({
  body: Joi.object().keys({
    machineryType: Joi.string().required(),
    date: Joi.string().required(),
    adress: Joi.string().required(),
    description: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    telephone: Joi.string().required(),
  }),
}), createOrder);

orders.get('/orders', findOrders);

orders.delete('/order/:orderId', celebrate({
  params: Joi.object().keys({
    orderId: Joi.string().length(24).hex().required(),
  }),
}), deleteOrderById);

module.exports = orders;
