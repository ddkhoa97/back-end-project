var passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
module.exports= app =>{
   
passport.use(new FacebookStrategy({
    
    clientID: "211313074347981",
    clientSecret: "7b5cefa718e71280167727919517c95f",
    callbackURL: "http://localhost:3000/login/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'picture.type(large)', 'email']
  },
  function(token, refreshToken, profile, done) {

 
    return done(null,profile)
}
));
passport.serializeUser(function(user, done) {
  
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
   
    return done(null,id)
});
}