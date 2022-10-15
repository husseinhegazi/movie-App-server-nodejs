const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

//user schema
const userSchema = new mongoose.Schema({
  _id: { type: Number },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    lowercase: true,
    maxlength: 50,
    trim: true,
  },
  dateOfBirth: { type: String, required: true, trim: true },
  password: { type: String, required: true },
//   myMovies: [{ type: Number, ref: "movies", default: [] }],
  role: { type: String, default: "user" },
  
}, { timestamps: true });
// auto increment id plugin
userSchema.plugin(AutoIncrement, { id: "userCounter" });
//mapping
module.exports = mongoose.model("users", userSchema);
