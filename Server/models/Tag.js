const mon = require("mongoose");

const tagSchema = new mon.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  course: {
    type: mon.Schema.Types.ObjectId,
  },
});

module.exports = mon.model("Tag", tagSchema);
