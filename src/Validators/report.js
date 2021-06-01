const { number } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");
const DUR = require("./common");

const reportSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["TEST", "PYP"],
    },
    duration: {
      type: Number,
      required: true,
    },
    categoryid: {
      type: mongoose.Schema.ObjectId,
    },
    subjectid: {
      type: mongoose.Schema.ObjectId,
    },
    chapterid: {
      type: mongoose.Schema.ObjectId,
    },
    ide: {
      type: mongoose.Schema.ObjectId,
    },
    results: [
      {
        question: {
          type: mongoose.Schema.ObjectId,
        },
        selected: {
          type: Number,
        },
      },
    ],
    DUR: [DUR],
    STID: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    total_marks: {
      type: Number,
      required: true,
    },
    total_marks: {
      type: Number,
      required: true,
    },
    rank: {
      type: Number,
    },
    time_taken: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Result", reportSchema);

const validate = (result) => {
  const schema = Joi.object({
    type: Joi.string().valid("TEST", "PYP"),
    duration: Joi.number().required(),
    subjectid: Joi.string(),
    chapterid: Joi.string(),
    results: Joi.array().required(),
    maximum_marks: Joi.number(),
    total_marks: Joi.number().required(),
    ide: Joi.string(),
    categoryid: Joi.string(),
    rank: Joi.number(),
    time_taken: Joi.number(),
  });

  return schema.validate(result);
};

const validateUpdate = (result) => {
  const schema = Joi.object({
    type: Joi.string().valid("TEST", "PYP"),
    duration: Joi.number(),
    subjectid: Joi.string(),
    chapterid: Joi.string(),
    results: Joi.array(),
    maximum_marks: Joi.number(),
    total_marks: Joi.number(),
    ide: Joi.string(),
    categoryid: Joi.string(),
    rank: Joi.number(),
    time_taken: Joi.number(),
  });

  return schema.validate(result);
};

module.exports = {
  validateUpdate,
  validate,
  Report,
};
