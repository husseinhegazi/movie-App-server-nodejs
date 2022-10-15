const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

//movie schema
const movieSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    rate: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: Number, required: true, ref: "category" },
  },
  { timestamps: true }
);
// auto increment id plugin
movieSchema.plugin(AutoIncrement, { id: "movieCounter" });
//mapping
module.exports = mongoose.model("movies", movieSchema);
