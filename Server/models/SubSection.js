const mon = require("mongoose");

const subSectionSchema = new mon.Schema({
  title: {
    type: String,
  },
  timeDuration: {
    type: String,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
});

module.exports = mon.model("SubSection", subSectionSchema);
