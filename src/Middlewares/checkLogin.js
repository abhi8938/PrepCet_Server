const {Student}=require("../Validators/student")

const checkLogin = async (req, res, next) => {
  let student
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
  if(student.isloggedin===true) throw new Error("Please logout from other devices")
  await Student.findByIdAndUpdate(student._id,{isloggedin:true});
  next();
};

module.exports=checkLogin
