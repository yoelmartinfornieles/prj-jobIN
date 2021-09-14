module.exports = (app) => {

app.use("/auth", require('./auth'))
app.use("/", require('./themuse.routes'))
app.use("/", require('./base.routes.js'))

}  


// const router = require("express").Router();

// /* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

// module.exports = router;



 



