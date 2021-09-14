const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const jobSchema = new Schema(
  {
    title: String,
    description: String,
    skills: [String],
    //howToPay: {type: enum, value: String},
    budget: String,
    upgrades: Number
  },
  {
    timestamps: true,
  }
);


jobSchema.pre("save", function(next) {
  // console.log(this)

  const nameToUpper = this.name.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')

  this.name = nameToUpper

    next();
});

module.exports = model("Job", jobSchema);
