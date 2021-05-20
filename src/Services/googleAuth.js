var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {Student}=require("../Validators/student")
const bcrypt =require ("bcrypt");
const { generateKeywords }=require("./algo")

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "556047130354-7p3seibt5qi1bapolmaoksvb3ctob8mp.apps.googleusercontent.com",
    clientSecret: "oH8Tg4rAhkfHoGyjZS2ukE1X",
    callbackURL: "/api/extras/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    
    let student=await Student.findOne({"email":profile._json.email})
    // console.log(student)
    if(student) profile._json.authtoken=student.generateAuthToken()
    else{
      if(profile._json.email_verified==false) return done(null,profile)
      let student=new Student({
        name:profile._json.name,
        email:profile._json.email,
      })
      const salt = await bcrypt.genSalt(13);
      student.password = await bcrypt.hash(profile._json.name+profile._json.email, salt);
      let keywords = generateKeywords(profile._json.email)
      student.keywords = keywords;
      student = await student.save();
      profile._json.authtoken = student.generateAuthToken();
    }
    
    return done(null,profile)
  }
));


