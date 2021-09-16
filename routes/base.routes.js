const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", isLoggedIn, (req, res, next) =>{

  User.findById(req.user._id)
  .populate('favorites')
  .then((user) => {
    res.render("profile", {user: user});
  })  
})

router.get("/edit", isLoggedIn, (req, res, next) => {
    let user = req.session.currentUser;
    res.render ("edit", {user})
})

router.get("/logout", (req,res,next) => {
  req.session.destroy (err => {
    if (err) next(err);
    res.redirect('/');
  })
})

router.post("/update", isLoggedIn, (req, res) => {
  console.log ("update")
  const user = req.session.user;
  console.log("user: ", user);
  const { username, password, ollas } = req.body;
  User.findByIdAndUpdate (user, { username, password, ollas }, {new: true})
  .then (result => {
    res.redirect ("/profile");
  });
}) 

module.exports = router;