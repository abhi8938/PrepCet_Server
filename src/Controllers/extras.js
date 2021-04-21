const {
  BMessage,
  Legal,
  ValidateBMessage,
  ValidateLegal,
  validateLegalUpdate,
} =require("../Validators/extra");
const {
  generateKeywords,
  handleUpdate,
  sendMail,
  sendSMS,
} =require("../Services/algo");

const { Student } =require("../Validators/student");

/*
 * *
 * *
 */

//* BMESSAGE
const get_bmessage = async (req, res) => {
  const bmessage = await BMessage.find().sort("title");
  res.status(200).send(bmessage);
};

const post_bmessage = async (req, res) => {
  const { error } = ValidateBMessage(req.body);
  if (error) throw new Error(error.details[0].message);

  let bmessage = new BMessage(req.body);

  bmessage = await bmessage.save();

  res.status(200).send(bmessage);
};

const update_bmessage = async (req, res) => {
  const { error } = ValidateBMessage(req.body);
  if (error) throw new Error(error.details[0].message);

  const bmessage = await BMessage.findByIdAndUpdate(
    req.params.id,
    {
      type: req.body.type,
    },
    { new: true }
  );

  if (!bmessage)
    throw new Error("The bmessage with the given id is not available");

  res.status(200).send(bmessage);
};

/*
 * *
 * *
 */

/*
 * *
 * *
 */

//* Legals
const get_legal = async (req, res) => {
  const legal = await Legal.findById(req.params.id);
  if (!legal) throw new Error("The legal with the given id is not available");
  res.status(200).send(legal);
};

const post_legal = async (req, res) => {
  const { error } = ValidateLegal(req.body);
  if (error) throw new Error(error.details[0].message);

  let legal = new Legal(req.body);

  legal = await legal.save();

  res.status(200).send(legal);
};

const update_legal = async (req, res) => {
  const { error } = validateLegalUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  const legal = await Legal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!legal) throw new Error("The legal with the given id is not available");

  res.status(200).send(legal);
};

//* sendMESSAGE/ sendCODE / sendSMS

const post_code = async (req, res) => {
  if (req.body.recipent === undefined)
    throw new Error("Email Address is undefined");
  if (req.body.code === undefined) throw new Error("Code is undefined");
  if (req.body.method === undefined) throw new Error("method is undefined");
  if (req.body.type === "VERIFY") {
    let student;
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.recipent)) {
      student = await Student.findOne({ email: req.body.recipent });
      if (student) throw new Error("Email aldredy exists");
    } else if (/^\d{10}$/.test(req.body.recipent)) {
      student = await Student.findOne({ contact: req.body.recipent });
      if (student) throw new Error("Phone number exists");
    } else {
      student = await Student.findOne({ user_name: req.body.recipent });
      if (student) throw new Error("User name exists");
    }
  }

  const subject =
    req.body.type && req.body.type === "RESET"
      ? "PrepUni password reset code"
      : "PrepUni verification code";
  const body =
    req.body.type && req.body.type === "RESET"
      ? `<b>Hello User,<br><br> </b>
               <b>Password reset code for PrepUni app is <h1>${req.body.code}</h1></b>
        `
      : `<b>Hello User,<br><br> </b>
               <b>Verification code for PrepUni app is <h1>${req.body.code}</h1></b>
        `;
  let id = "";
  console.log("request", req.body);
  if (req.body.method === "MAIL") {
    try {
      const info = await sendMail(req.body.recipent, subject, body);
      console.log("Message sent: ", info.response);
      return res.status(200).send({
        id: id.length > 0 ? id : "",
        message: "Mail Sent Successfully",
      });
    } catch (e) {
      throw new Error(e);
    }
  } else {
    try {
      const message =
        req.body.type && req.body.type === "RESET"
          ? `Password reset code for PrepUni app is - ${req.body.code}`
          : `Verification code for PrepUni app is - ${req.body.code}`;

      const sms_response = await sendSMS(req.body.recipent, message);

      console.log("Message sent: ", sms_response);
      return res.status(200).send({
        id: id.length > 0 ? id : "",
        message: "SMS Sent Successfully",
      });
    } catch (e) {
      throw new Error(e);
    }
  }
};

const post_sms = async (req, res) => {
  if (req.body.recipent === undefined) throw new Error("Contact is undefined");
  if (req.body.message === undefined) throw new Error("Message is undefined");
  try {
    const message = req.body.message;

    const sms_response = await sendSMS(req.body.recipent, message);

    console.log("Message sent: ", sms_response);
    return res.status(200).send({
      id: id.length > 0 ? id : "",
      message: "SMS Sent Successfully",
    });
  } catch (e) {
    throw new Error(e);
  }
};

const post_mail = async (req, res) => {
  if (req.body.recipent === undefined) throw new Error("Contact is undefined");
  if (req.body.body === undefined) throw new Error("Message is undefined");
  if (req.body.subject === undefined) throw new Error("Subject is undefined");
  try {
    const info = await sendMail(
      req.body.recipent,
      req.body.subject,
      req.body.body
    );
    console.log("Message sent: ", info.response);
    return res.status(200).send({
      id: id.length > 0 ? id : "",
      message: "Mail Sent Successfully",
    });
  } catch (e) {
    throw new Error(e);
  }
};

/*
 * *
 * *
 */
module.exports = {
  post_mail,
  post_sms,
  post_code,
  update_legal,
  get_bmessage,
  post_legal,
  get_legal,
  post_bmessage,
  update_bmessage
}