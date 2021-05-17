const DUR =require("./common")
const config=require("config")
const jwt=require("jsonwebtoken")
const Joi=require('joi')
const mongoose=require('mongoose')

const studentSchema = new mongoose.Schema({
  name: {       //done
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {    //done
    type: String,
    required: true,
    minlength: 5,
    unique: true,
  },
  contact: {  //done
    type: String,
    unique:true,
    minlength: 10,
    maxlength: 10,
  },
  gender: {     //done
    type: String,
    required: true,
    enum: ["MALE", "FEMALE", "OTHERS", "RATHER NOT SAY"],
  },
  dob: {      //done
    type: Date,
    required: true,
  },
  password: {   //done
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  device_token: {  //done
    type: String,
  },
  education: {  //done
    // type: String,
    type: String,
    required: true,
    enum: ['12th pass','1st year','2nd year','3rd year','4th year','pass'],
  },
  user_name: {    //dome
    type: String,
    unique: true,
    required: true,
    maxlength: 30,
  },
  isloggedin:{
    type:Boolean,
    default:true
  },
  keywords: [String],
  DUR: [DUR],
  wallet:{
    type:Number,
    default:0
  },
  transactions:[String]
},{
  timestamps:true
});

studentSchema.method("generateAuthToken", function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
});

const Student = mongoose.model("Student", studentSchema);

const validate = (student) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(5).required().email(),
    contact: Joi.string(),
    gender: Joi.string().valid("MALE", "FEMALE", "OTHERS", "RATHER NOT SAY"),
    dob: Joi.date().required(),
    password: Joi.string().min(5).max(1024).required(),
    device_token: Joi.string(),
    user_name: Joi.string().required(),
    education: Joi.string().valid('12th pass','1st year','2nd year','3rd year','4th year','pass'),
  });

  return schema.validate(student);
};

const validateUpdate = (student) => {
  const schema = Joi.object({
    contact: Joi.string(),
    email: Joi.string().min(5).email(),
    user_name: Joi.string(),
    password: Joi.string().min(5).max(1024),
    device_token: Joi.string(),
    education: Joi.string().valid('12th pass','1st year','2nd year','3rd year','4th year','pass'),
  });

  return schema.validate(student);
};

const validateAuth = (student) => {
  const schema = Joi.object({
    id: Joi.string().min(5).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(student);
};

const validatePassword=(student)=>{
  const schema=Joi.object({
    previous_password:Joi.string().required(),
    new_password:Joi.string().required(),
  })

  return schema.validate(student)
}

// export default Student;
module.exports={
  validateAuth,
  validateUpdate,
  validate,
  validatePassword,
  Student
}