/// all middleware goes here
var Campground    = require("../models/campgrounds");
var Comment       = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
  if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
                req.flash("error", "Acampamento não encontrado. Desculpa ):");
                res.redirect("back");
            } else {
                 //does use own the campground
                 if(foundCampground.author.id.equals(req.user._id)){
                     next();
                 } else {
                    req.flash("error", "EI, você não tem permissão para isso!");
                    res.redirect("back");
                 }
            }
        });
    }   else {
        req.flash("error", "Você precisa estar conectado para fazer isso");
        res.redirect("back");
    }   
}

middlewareObj.checkCommentOwnership = function(req, res, next){
     if(req.isAuthenticated()){
            Comment.findById(req.params.comments_id, function(err, foundComment){
            if(err){
                    res.redirect("back");
                } else {
                     //does use own the comment
                     if(foundComment.author.id.equals(req.user._id)){
                         next();
                     } else {
                        req.flash("error", "Sem permissão. A culpa não é minha!");
                        res.redirect("back");
                     }
                }
            });
        }   else {
            req.flash("error", "Você precisa estar conectado para fazer isso!");
            res.redirect("back");
    }   
}


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Conecte-se para fazer isso!");
    res.redirect("/login");
}


module.exports = middlewareObj; 