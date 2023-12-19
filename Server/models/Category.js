const mon = require("mongoose");

const categorySchema = new mon.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  course: [{
    type: mon.Schema.Types.ObjectId,
    ref: Course,
  }],
});

module.exports = mon.model("Category", categorySchema);
