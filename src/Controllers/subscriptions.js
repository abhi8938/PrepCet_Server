const {
  Subscript,
  validate,
  validateUpdate,
} =require ("../Validators/subscription");
const { generateKeywords, handleUpdate } =require ("../Services/algo");

const { Pack } =require ("../Validators/package");
const { Student } =require ("../Validators/student");

const get_subscriptions = async (req, res) => {
  const subscriptions = await Subscript.find({});
  res.status(200).send(subscriptions);
};

const get_subscription = async (req, res) => {
  const subscription = await Subscript.findOne({ STID: req.user._id });
  if (!subscription) throw new Error("No Subscription found with given id");
  res.status(200).send(subscription);
};

const post_subscription = async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);

  const student = await Student.findById(req.user._id);
  if (!student) throw new Error("No Student found with given id");

  const pack = await Pack.findById(req.body.PID);
  if (!pack) throw new Error("No Package found with given id");

  let subInstance = {
    STID: student._id,
    PID: pack._id,
    type: pack.type,
    program_id: student.program,
  };
  subInstance.status = pack.type === "TRIAL" ? "ACTIVE" : "INACTIVE";

  let sub = new Subscript(subInstance);

  let expiration = new Date();

  if (sub.type === "TRIAL") {
    expiration.setDate(expiration.getDate() + 3);
  } else {
    sub.PA_ID = req.body.PA_ID;
    expiration.setMonth(expiration.getMonth() + 5);
  }
  sub.expiration = expiration;

  try {
    sub = await sub.save();
  } catch (e) {
    throw new Error(e.message);
  }
  if (sub.type === "TRIAL") {
    return res
      .status(200)
      .send(
        `Thank you for subscribing, your subscription will expire on ${new Date(
          sub.expiration
        ).toDateString()}.`
      );
  }

  res
    .status(200)
    .send(
      `Thank you for subscribing, your subscription will expire on ${new Date(
        sub.expiration
      ).toDateString()}.`
    );
};

const update_subscription = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  let sub = await Subscript.findOne({ STID: req.user._id });
  if (!sub)
    throw new Error("The subscription with the given id is not available");

  handleUpdate(sub, req.body);
  sub = await sub.save();
  res.status(200).send(sub);
};

module.exports = {
  update_subscription,
  post_subscription,
  get_subscription,
  get_subscriptions
}