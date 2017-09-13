var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserScherma = new mongoose.Schema({
    username: String,
    password: String
});

UserScherma.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserScherma);