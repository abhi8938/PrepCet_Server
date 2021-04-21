const { Payment, validate, validateUpdate } = require("../Validators/payments");
const { routes } = require("../Configs/routes");
const Razorpay = require("razorpay");
const crypto = require("crypto");

var instance = new Razorpay({
  key_id: "rzp_test_JrmprfPdb6LHFI",
  key_secret: "Ut6lmneQIQXOufkeflo4jHFC",
});

const get_payment = async (req, res) => {
  const payments = await Payment.find().sort("name");
  res.status(200).send(payments);
};

const post_payment = async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);

  var options = {
    amount: 5000, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  try {
    const order = await instance.orders.create(options);
    let payment = new Payment({
      STID: req.body.STID,
      order_id: order.id,
      amount: req.body.amount,
      SID: req.body.SID,
      type: req.body.type,
    });
    payment = await payment.save();
    res.status(200).send(payment);
  } catch (e) {
    throw new Error(e);
  }
};

const update_payment = async (req, res) => {
  //TODO: Complete Request
  const { error } = validateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!payment)
    throw new Error("The Payment with the given id is not available");

  const order_id = payment.order_id;
  const razorpay_signature = payment.razorpay_signature;
  const razorpay_payment_id = payment.razorpay_payment_id;

  const body = order_id + "|" + razorpay_payment_id;

  let expectedSignature = crypto
    .createHmac("sha256", "Ut6lmneQIQXOufkeflo4jHFC")
    .update(body.toString())
    .digest("hex");
  console.log("sig" + razorpay_signature);
  console.log("sig_e" + expectedSignature);

  if (!expectedSignature === razorpay_signature)
    throw new Error("Invalid signature");

  payment.status = "SUCCESS";
  await payment.save();

  res.status(200).send(payment);
};

const cancel_payment = async (req, res) => {
  res.status(200).send("done");
};

module.exports = {
  cancel_payment,
  update_payment,
  post_payment,
  get_payment,
};
