const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const categorySchema = new mongoose.Schema({
    _id: { type: Number },
    categoryTitle: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique:true,
    },
  }, { timestamps: true });

// auto increment id plugin
categorySchema.plugin(AutoIncrement, { id: "categoryCounter" });
//mapping
module.exports = mongoose.model("category", categorySchema);