const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    name: String,
    locations: String,
    publication_date_day: String,
    publication_date_hour: String,
    apiId: Number,
    company: String
  },
  {
    timestamps: true,
  }
);

jobSchema.pre("save", function(next) {

  const nameToUpper = this.name.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')

  this.name = nameToUpper

    next();
});

module.exports = model("Job", jobSchema);
