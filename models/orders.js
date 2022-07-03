const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema(
  {
    machineryType: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isDate(v),
      },
    },
    adress: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isEmail(v),
      },
    },
    telephone: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    }
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("order", orderSchema);
