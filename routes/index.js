var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");

//=================================
// Main page rota
router.get("/", function(req, res){
   res.render("landing");
});
//================================

//-------------
// auth Route
//-------------

//show the register form
router.get("/register", function(req, res) {
    res.render("register");
});
//handle sing up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err){
         req.flash("error", err.message);
        return res.redirect("register");
       }
       
       passport.authenticate("local")(req, res, function(){
        req.flash("success", "Bem vindo ao YelpCamp " + user.username);
        res.redirect("/campgrounds"); 
       });
    });
});

//Show log in form
router.get("/login", function(req, res) {
    res.render("login"); 
});

//handling login logic

router.post("/login", passport.authenticate("local", 
    {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res) {
});

//Logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Saindo...");
    res.redirect("/campgrounds");
});



module.exports = router;

//fimmm