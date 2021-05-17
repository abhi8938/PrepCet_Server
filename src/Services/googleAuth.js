var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {Student}=require("../Validators/student")

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // User.findById(id, function(err, user) {
    done(null, user);
  // });
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
    
    return done(null,profile)
  }
));


