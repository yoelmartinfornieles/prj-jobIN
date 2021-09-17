require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

const projectName = "jobIN";
const capitalized = (string) => string



app.locals.title = `${capitalized(projectName)}`;

app.locals.subtitle = "I'am the subtitle"



require("./routes/index")(app)

require("./error-handling")(app);

module.exports = app;
