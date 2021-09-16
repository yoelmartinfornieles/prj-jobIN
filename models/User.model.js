const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: String,
  password: String,
  favorites:  [{	
    type: Schema.Types.ObjectId,
		ref: "Job"
  }],
  avatar: {type: String, default: "images/defaultAvatar.webp"},
  ollas: String,
  studies: [String],
  experience: [String],
  skills: [String]
});

const User = model("User", userSchema);

module.exports = User;
