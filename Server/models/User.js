const mon = require("mongoose");

const userSchema = new mon.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
  },
  additionalDetails: {
    type: mon.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  courses: [
    {
      type: mon.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  image: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  courseProgress: [
    {
      type: mon.Schema.Types.ObjectId,
      ref: "CourseProgress",
    },
  ],
});

module.exports = mon.model("User", userSchema);
