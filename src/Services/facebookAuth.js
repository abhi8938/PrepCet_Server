var passport = require('passport')
FacebookStrategy = require('passport-facebook').Strategy;
const {Student}=require("../Validators/student")

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    // User.findById(id, function(err, user) {
      done(null, user);
    // });
  });

passport.use(new FacebookStrategy({
    clientID: "331814865296447",
    clientSecret: "7ce2ee2e820e78cf819fe53ba801e4e0",
    callbackURL: "/api/extras/facebook/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    console.log("Profile: ",profile)
    let student=await Student.findOne({"email":profile._json.email})
    // console.log(student)
    if(student) profile._json.authtoken=student.generateAuthToken()
    console.log("Auth token",profile)
      //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //    return done(err, user);
      //  });
      return done(null,profile)
  }
));