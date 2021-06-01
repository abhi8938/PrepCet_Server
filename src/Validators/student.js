const DUR = require("./common");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const bookMarkSchema=new mongoose.Schema({
  type:{
    type:String,
    enum:['SUBJECT','QUESTION']
  },
  ide:{
    type:mongoose.Schema.ObjectId
  },
  notes:{
    type:String
  }
},{
  timestamps:true
})

const transactionSchena=new mongoose.Schema({
  method:{
    type:String,
    enum:['CREDIT','DEBIT'],
    required:true
  },
  amount:{
    type:Number,
    required:true
  },
  name:{
    type:String
  },
  ide:{
    type:mongoose.Schema.ObjectId

  }
);

const historySchema=new mongoose.Schema({
  type:{
    type:String
  },
  ide:{
    type:mongoose.Schema.ObjectId
  },
  notes:{
    type:String
  }
},{
  timestamps:true
})


const studentSchema = new mongoose.Schema({
  name: {       //done
    type: String,
    enum: ["CREDIT", "DEBIT"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
  },
  bookmarks:[bookMarkSchema],
  transactions:[transactionSchena],
  history:[historySchema]
},{
  timestamps:true

});

const studentSchema = new mongoose.Schema(
  {
    name: {
      //done
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    email: {
      //done
      type: String,
      required: true,
      minlength: 5,
      unique: true,
    },
    contact: {
      //done
      type: String,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
    gender: {
      //done
      type: String,
      // required: true,
      enum: ["MALE", "FEMALE", "OTHERS", "RATHER NOT SAY"],
    },
    dob: {
      //done
      type: Date,
      // required: true,
    },
    password: {
      //done
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    device_token: {
      //done
      type: String,
    },
    education: {
      //done
      // type: String,
      type: String,
      // required: true,
      enum: [
        "12th pass",
        "1st year",
        "2nd year",
        "3rd year",
        "4th year",
        "pass",
      ],
    },
    user_name: {
      //dome
      type: String,
      unique: true,
      // required: true,
      maxlength: 30,
    },
    isloggedin: {
      type: Boolean,
      default: true,
    },
    keywords: [String],
    DUR: [DUR],
    wallet: {
      type: Number,
      default: 0,
    },
    credits: {
      type: Number,
      default: 0,
    },
    bookmarks: [bookMarkSchema],
    transactions: [transactionSchena],
    signin_method: {
      type: String,
      enum: ["GOOGLE", "FACEBOOK", "EMAIL"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

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
    password: Joi.string().min(5).max(1024).required(),
    device_token: Joi.string(),
    signin_method: Joi.string().valid("GOOGLE", "FACEBOOK", "EMAIL").required(),
    // education: Joi.string().valid('12th pass','1st year','2nd year','3rd year','4th year','pass'),
  });

  return schema.validate(student);
};

const validateUpdate = (student) => {
  const schema = Joi.object({
    contact: Joi.string(),
    email: Joi.string().min(5).email(),
    password: Joi.string().min(5).max(1024),
    device_token: Joi.string(),
    // education: Joi.string().valid(
    //   "12th pass",
    //   "1st year",
    //   "2nd year",
    //   "3rd year",
    //   "4th year",
    //   "pass"
    // ),
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

const validatePassword = (student) => {
  const schema = Joi.object({
    previous_password: Joi.string().required(),
    new_password: Joi.string().required(),
  });

  return schema.validate(student);
};

const validateBookamark=(bookmark)=>{
  const schema=Joi.object({
    type:Joi.string().valid('SUBJECT','QUESTION'),
    ide:Joi.string(),
    notes:Joi.string()
  })
  return schema.validate(bookmark)
}

const validateHistory=(history)=>{
  const schema=Joi.object({
    type:Joi.string(),
    ide:Joi.string(),
    notes:Joi.string()
  })
  return schema.validate(history)
}

const validatetransitions=(tran)=>{
  const schema=Joi.object({
    method:Joi.string(),
    amount:Joi.number(),
    name:Joi.string(),
    ide:Joi.string()
  })
  return schema.validate(tran)
}

// export default Student;
module.exports = {
  validateAuth,
  validateUpdate,
  validate,
  validatePassword,
  Student,
  validateBookamark,
  validatetransitions,
  validateHistory
}

