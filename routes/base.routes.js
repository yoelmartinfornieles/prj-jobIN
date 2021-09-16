const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  let loggedIn = req.session.user;
  res.render("index", {loggedIn});
});

router.get("/profile", isLoggedIn, (req, res, next) =>{

  User.findById(req.user._id)
  .populate('favorites')
  .then((user) => {
    let loggedIn = req.session.user;
    res.render("profile", {user: user, loggedIn: loggedIn});
  })  
})

router.get("/edit", isLoggedIn, (req, res, next) => {
    let user = req.session.user;
    let loggedIn = req.session.user;
    res.render ("edit", {user: user, loggedIn: loggedIn});
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