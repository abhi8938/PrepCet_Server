const Joi=require('joi')
const mongoose=require('mongoose')

//TODO:Create Schema
//* STID
//* TID
//* amount
//* type - ONLINE / CREDIT / DEBIT
//* CA
//* LU
//* SID - Subscription Id

const Payment = mongoose.model(
  "Payments",
  new mongoose.Schema(
    {
      type: {
        type: String,
        enum: ["ONLINE", "CREDIT", "DEBIT", "UPI"],
      },
      STID: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      order_id: {
        type: String,
      },
      amount: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["SUCCESS", "FAIL", "PENDING", "CREATED"],
        default: "CREATED",
      },
      razorpay_payment_id: {
        type: String,
      },
      razorpay_order_id: {
        type: String,
      },
      razorpay_signature: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);

const validate = (payment) => {
  //TODO:Create Schema
  const schema = Joi.object({
    type: Joi.string().min(2).max(30),
    amount: Joi.string().required(),
    STID: Joi.string().required(),
  });

  return schema.validate(payment);
};

const validateUpdate = (payment) => {
  //TODO:Create Schema
  const schema = Joi.object({
    type: Joi.string().min(2).max(30),
    razorpay_payment_id: Joi.string(),
    razorpay_order_id: Joi.string(),
    razorpay_signature: Joi.string(),
    PID:Joi.string()
  });

  return schema.validate(payment);
};

module.exports={
  validateUpdate,
  validate,
  Payment
}