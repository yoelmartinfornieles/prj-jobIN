module.exports = (app) => {

app.use("/auth", require('./auth'))
app.use("/", require('./themuse.routes'))
app.use("/", require('./base.routes.js'))

}  




 



