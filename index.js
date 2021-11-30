var express = require('express');
var passport = require('passport');
var app = express();
const https = require('https')
const fs = require('fs');
var path = require('path');




app.set("view engine", "ejs");
app.set("views", "./views");

// This is import for reading request body 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
//***  Import all important middlewares 



require("./middlewares/session")(app);
require('./middlewares/passport-local')(app);
require('./middlewares/passport-facebook')(app);
const imageUpload= require('./middlewares/upload');


//*** */


app.get("/login",(req,res)=>{
  
  req.session.isAuthenticated=false
  if(req.session.isAuthenticated)
  {

   return res.redirect("login2")
  }
  res.render("login");
})


/**************************Facebook login*******************************/

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/login/facebook/callback',
        passport.authenticate('facebook', {
           
            failureRedirect : '/login-post'
        }),function(req,res){
          req.session.user= req.user;
          req.session.isAuthenticated=true;
         return res.redirect("/login2")
        }
        );
// app.get("/facebook",(req,res)=>{
//   res.render("login-by-facebook");
// })
/********************************************************************/





/**************************Login local*******************************/


app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); 
    }
    if (! user) {
      return res.send({ success : false, message : info.message });
    }
    
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
     
      var user= {
        "id":req.user.id,
        "displayName":req.user.username,
        "emails":[
          {"value":""
        }
        ],
        "photos":[ {"value":""
      }],
      }
      req.session.user = user;
      req.session.isAuthenticated=true;
      return res.redirect("login2")
    
    });      
  })(req, res, next);
});

app.use(function(req,res,next){
  
  if(!req.session.isAuthenticated)
  {

    return res.render("login")
  }
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
})

app.get("/login2",(req,res)=>{

res.render("login-post", {message2:req.session.id,info:req.session.user});
})



// app.get("/facebook-successful",(req,res)=>{
  
//   res.render("facebook-successful",{info:req.session.user});
// })



app.post('/logout', function(req, res){
  
 
  req.session.destroy()
 
  
  res.redirect('/login');
});



/********************************************************************/


/**************************Upload image*******************************/
app.get('/uploadImage',(req,res)=>{
  res.render("home");
})



app.post('/uploadImage', imageUpload.single('myImage'), (req, res) => {
 
  
  res.send("successful !!!");
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})



/********************************************************************/





var port = process.env.PORT || 3000;
app.listen(port, () => {
  var env = app.get('env');
  console.log(`server is running in ${env} mode at http://localhost:${port}`);
});
