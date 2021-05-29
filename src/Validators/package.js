const DUR = require("../Validators/common");
const Joi = require("joi");
const mongoose = require("mongoose");

const Pack = mongoose.model(
  "packs",
  new mongoose.Schema(
    {
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      name:{
        type:String,
      },
      features: [
        {
          feature: {
            type: String,
          },
          active: {
            type: Boolean,
          },
        },
      ],
      life: {
        type: Date,
        required: true,
      },
      discount: {
        type: Number,
        min: 0,
      },
      keywords: [String],
      DUR: [DUR],
    },
    {
      timestamps: true,
    }
  )
);

const validatefeature = Joi.object({
  // features:Joi.array().items({
  feature: Joi.string(),
  active: Joi.boolean(),
  // })
});

const validate = (_package) => {
  const schema = Joi.object({
    price: Joi.number().min(0).required(),
    features: Joi.array().items(validatefeature).required(),
    type: Joi.string().required(),
    life: Joi.date().required(),
    discount: Joi.number(),
    name:Joi.string(),
  });

  return schema.validate(_package);
};

const updatevalidatefeature = {
  // features:Joi.array().items({
  feature: Joi.string(),
  active: Joi.boolean(),
  // })
};

const validateUpdate = (_package) => {
  const schema = Joi.object({
    price: Joi.number().min(0),
    features: Joi.array().items(updatevalidatefeature),
    type: Joi.string(),
    life: Joi.date(),
    discount: Joi.number(),
    name:Joi.string(),
  });

  return schema.validate(_package);
};

module.exports = {
  validateUpdate,
  validate,
  Pack,
};
