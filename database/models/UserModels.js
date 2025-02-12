const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }
},
 {timestamps:true}
);

// Prevent model overwrite during hot reloading or multiple imports
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);