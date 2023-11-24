const mon = require("mongoose");

const sectionSchema = new mon.Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: mon.Schema.Types.ObjectId,
      required: true,
      ref: "SubSection",
    },
  ],
});

module.exports = mon.model("Section", sectionSchema);
