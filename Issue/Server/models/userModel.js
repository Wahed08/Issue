const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    issues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
