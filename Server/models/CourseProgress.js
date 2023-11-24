const mon = require("mongoose");

const courseProgressSchema = new mon.Schema({
  courseID: {
    type: mon.Schema.Types.ObjectId,
    ref: "Course",
  },
  completedVideos: [
    {
      type: mon.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
});

module.exports = mon.model("CourseProgress", courseProgressSchema);
