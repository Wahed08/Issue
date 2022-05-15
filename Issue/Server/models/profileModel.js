const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  nid: {
    type: Number,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  libraryId: {
    type: Number,
    required: true,
  },
  profileLink: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("UserProfile", profileSchema);
