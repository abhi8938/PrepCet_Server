const {
  Student,
  validate,
  validateAuth,
  validateUpdate,
  validatePassword,
} =require("../Validators/student");
const { generateKeywords, handleUpdate } =require ("../Services/algo");

const { BMessage } =require ("../Validators/extra");
const { Subscript } =require("../Validators/subscription");
const _ =require ("lodash");
const bcrypt =require ("bcrypt");

const get_students = async (req, res) => {
  const students = await Student.find().sort("name");
  res.status(200).send(students);
};

const get_student = async (req, res) => {
  let student = await Student.findById(req.user._id).select("-password");
  if (!student)
    throw new Error(
      "The student with givern id in not present OR wrong student doc id"
    );

  res.status(200).send(student);
};

const post_student = async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);
  let email_student = await Student.findOne({
    email: req.body.email,
  });
  let contact_student;
  if (req.body.contact) {
    contact_student = await Student.findOne({
      contact: req.body.contact,
    });
  }
  let userID_student = await Student.findOne({
    user_name: req.body.user_name,
  });
  console.log("student", email_student, contact_student, userID_student);
  if (email_student || contact_student || userID_student)
    throw new Error(
      "User with same email or contact or userID already exists, try logging in."
    );

  let student = new Student(req.body);
  const salt = await bcrypt.genSalt(13);
  student.password = await bcrypt.hash(student.password, salt);
  let keywords = generateKeywords(req.body.email)
    .concat(generateKeywords(req.body.contact))
    .concat(generateKeywords(req.body.user_name));
  student.keywords = keywords;
  student = await student.save();
  const token = student.generateAuthToken();
  return res
    .status(200)
    .header("x-auth-token", token)
    .send(_.omit(student, ["password"]));
};

const update_student = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);
  let student = await Student.findById(req.user._id);
  let keywords=[]
  if (!student)
    throw new Error("The Student with the given id is not available");
  if(req.body.email){
    let email_student = await Student.findOne({
      email: req.body.email,
    });
    if(email_student) throw new Error("There is aldredy an account on this email ID please use another emailID")
    keywords=keywords.concat(generateKeywords(req.body.email))
  }else{
    keywords=keywords.concat(generateKeywords(student.email))
  }
  if(req.body.contact){
    let contact_student = await Student.findOne({
      contact: req.body.contact,
    });
    if(contact_student) throw new Error("There is aldredy an account on this Contact please use another contact number")
    keywords=keywords.concat(generateKeywords(req.body.contact))
  }else{
    keywords=keywords.concat(generateKeywords(student.contact))
  }
  if(req.body.user_name){
    let userID_Student = await Student.findOne({
      user_name: req.body.user_name,
    });
    if(userID_Student) throw new Error("There is aldredy an account on this ID please use another ID")
    keywords=keywords.concat(generateKeywords(req.body.user_name))
  }else{
    keywords=keywords.concat(generateKeywords(student.user_name))
  }
  if(JSON.stringify(keywords)!==JSON.stringify(student.keywords)){
    req.body.keywords=keywords
  }
  handleUpdate(student, req.body);
  student = await student.save();
  res.status(200).send(_.omit(student, ["password"]));
};

const reset_password = async (req, res) => {
  if (!req.body.password) throw new Error("NO Password sent");
  if (!req.body.id) throw new Error("NO Recipent");
  let student;
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.id)) {
    student = await Student.findOne({ email: req.body.id });
    if (!student) throw new Error("Invalid Email");
  } else if (/^\d{10}$/.test(req.body.id)) {
    student = await Student.findOne({ contact: req.body.id });
    if (!student) throw new Error("Invalid Phone number");
  }
  const salt = await bcrypt.genSalt(13);
  student.password = await bcrypt.hash(req.body.password, salt);
  student = await student.save();
  res.status(200).send("Password Updated");
};

const change_password=async(req,res)=>{
  const { error } = validatePassword(req.body);
  if (error) throw new Error(error.details[0].message);
  let student = await Student.findById(req.user._id);
  if (!student)
    throw new Error("The Student with the given id is not available");

  const validPassword = await bcrypt.compare(
    req.body.previous_password,
    student.password
  );
  if (!validPassword) throw new Error("Invalid Password");
  const salt = await bcrypt.genSalt(13);
  student.password = await bcrypt.hash(req.body.new_password, salt);
  student=await student.save();
  res.status(200).send("Password Updated");
}

const authenticate = async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) throw new Error(error.details[0].message);
  let student;
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.id)) {
    student = await Student.findOne({ email: req.body.id });
    if (!student) throw new Error("Invalid Email");
  } else if (/^\d{10}$/.test(req.body.id)) {
    student = await Student.findOne({ contact: req.body.id });
    if (!student) throw new Error("Invalid Phone number");
  } else {
    student = await Student.findOne({ user_name: req.body.id });
    if (!student) throw new Error("Invalid User name");
  }
  // console.log((req.body.password))
  const validPassword = await bcrypt.compare(
    req.body.password,
    student.password
  );
  // console.log(validPassword)
  if (!validPassword) throw new Error("Invalid Password");
  const token = student.generateAuthToken();
  await Student.findByIdAndUpdate(student._id, { isloggedin: true });
  res.status(200).send(token);
};

const get_all = async (req, res) => {
  //TODO: get student id from req.headers.token
  const students = await Student.findById("id");
  const subscription = await Subscript.findOne({ STID: "id" });

  const broadcast = await BMessage.find();
  res.status(200).send({
    students: _.omit(students, ["password"]),
    subscription,
    // papers,
    broadcast,
  });
};

const logoutfromdevice = async (req, res) => {
  let student = await Student.findById(req.user._id);
  if (!student)
    throw new Error("This is an ivalid token no user in this email id");
  if (student.isloggedin === false)
    throw new Error("User is alderdy logged out");
  await Student.findByIdAndUpdate(req.user._id, { isloggedin: false });
  res.status(200).send({ message: "You are looged out succefully" });
};


module.exports = {
  logoutfromdevice,
  get_all,
  authenticate,
  reset_password,
  update_student,
  get_students,
  get_student,
  post_student,
  change_password
}