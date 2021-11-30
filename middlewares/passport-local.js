var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userModel = require('../models/user');
var flash= require('req-flash');

module.exports= app =>{
 
  app.use(flash());
 

  passport.use( new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
       
      userModel.singleByUserName(username).then(rows => {
        if (rows.length === 0)
          return done(null, false, { message: 'Invalid username' });
  
        var user = rows[0];
       
      //   var ret = compareSync(password, user.f_Password);
  
        if (password === user.password) {
          return done(null, user);
        }
        return done(null, false, { message: 'Invalid password' });
  
      }).catch(err => {
        return done(err, false);
      });
    })
      );
        // hàm được gọi khi xác thực thành công để lưu thông tin user vào session. 
        passport.serializeUser(function(user, done) {
          done(null, user.id);
        });
        // hàm được gọi bởi passport.session .Giúp ta lấy dữ liệu user dựa vào thông tin lưu trên session và gắn vào req.user.
        passport.deserializeUser(function(id, done) {
          userModel.findById(id, function(err, user) {
            done(err, user);
          });
        });




}

