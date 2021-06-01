const { Subject, validate, validateUpdate } = require("../Validators/subject");
const { generateKeywords, handleUpdate } = require("../Services/algo");

const post_subject = async (req, res) => {
  if (req.user.isAdmin == false)
    throw new Error("You are not allowed to upload the data");

  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);

  let subject = new Subject(req.body);
  let keywords = generateKeywords(req.body.name);
  subject.keywords = keywords;
  subject = await subject.save();
  res.status(200).send(subject);
};

const get_subjects = async (req, res) => {
  console.log("query_subject", req.query);
  const subjects = await Subject.find(req.query).sort("name");
  res.status(200).send(subjects);
};

const get_subject = async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) throw new Error("No subject based on this id");
  res.status(200).send(subject);
};

const update_subject = async (req, res) => {
  if (req.user.isAdmin == false)
    throw new Error("You are not allowed to update the data");

  const { error } = validateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  let subject = await Subject.findById(req.params.id);
  if (!subject) throw new Error("No subject based on this id");

  if (req.body.name) {
    req.body.keywords = generateKeywords(req.body.name);
  }

  handleUpdate(subject, req.body);
  subject = await subject.save();
  res.status(200).send(subject);
};

module.exports = {
  post_subject,
  get_subjects,
  get_subject,
  update_subject,
};
