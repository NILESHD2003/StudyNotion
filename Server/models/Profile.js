const mon = require("mongoose");

const profileSchema = new mon.Schema({
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: Number,
    trim: true,
  },
});

module.exports = mon.model("Profile", profileSchema);
