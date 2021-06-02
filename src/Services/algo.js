const axios = require("axios");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const admin = require("firebase-admin");
const { Student } = require("../Validators/student");
const serviceAccount = require("../service_account.json");
const transporter = nodemailer.createTransport({
  host: "mail.prepuni.in",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    type: "login",
    user: "info@prepuni.in", // generated ethereal user
    pass: "Hello12345.", // generated ethereal password
  },
});
// rjeucskknaxzbjqq

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const generateInvoice = () => {
  return `<h1>Invoice Email Template</h1>`;
};

const sendMail = async (email, subject, body) => {
  try {
    const info = await transporter.sendMail({
      // from: "info@prepuni.in", // sender address
      from: '"Nodemailer Services by prepuni" <info@prepuni.in>',
      to: email, // list of receivers
      subject: subject,
      html: body, // html body
    });
    console.log("Message sent: ", info.response);
    return info;
  } catch (e) {
    throw new Error(e);
  }
};

const generateKeywords = (data) => {
  const keywords = [];
  let curName = "";
  `${data}`
    .toLowerCase()
    .split("")
    .forEach((alpha) => {
      curName += alpha;
      keywords.push(curName);
    });
  return keywords;
};

const handleUpdate = (document, body) => {
  return Object.keys(body).map(function (key, index) {
    const DUR = {
      key: key,
      prev: String(document[key]),
      current: String(body[key]),
      created_at: Date.now(),
    };
    document[key] = body[key];
    document.DUR.push(DUR);
  });
};

const sendNotification = async (Title, Body, id) => {
  const user = await Student.findById(id);
  if (!user) throw new Error("The Student with the given id is not available");

  let payload;

  payload = {
    token: user.device_token,
    notification: {
      body: Body,
      title: Title,
    },
  };
  return admin
    .messaging()
    .send(payload)
    .then((response) => console.log("notification_resp", response))
    .catch((error) => console.log("notification_error", error));
  // return axios
  //   .post("https://fcm.googleapis.com/fcm/send", payload, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization:
  //         "key=AAAABunUBK4:APA91bEY93j2nKR30hbOzvnz3uQFFPVtiL4p13exc54kb7vwiIXbTAJyb58EmShSahKx4XO7X1SqDwK4R09Pu0SUzdVCIh8TBUcVfLGnDM7eo-sRfMRXwlqbWqd1P8MP8Ngpk9hxFB8u",
  //     },
  //   })
  //   .then((result) => result)
  //   .catch((error) => error);
};

const sendSMS = (contact, message) => {
  const sid = "ACd26732609a30ce4db7ce06e61b297f7b";
  const token = "7f33997dc0e4fb72defbcaae4a258f01";
  const sender = "+19158008128";
  const client = twilio(sid, token);

  return client.messages
    .create({
      to: `+91${contact}`,
      from: sender,
      body: message,
    })
    .then((message) => message)
    .catch((error) => error);
};

module.exports = {
  sendMail,
  generateInvoice,
  generateKeywords,
  handleUpdate,
  sendNotification,
  sendSMS,
};
