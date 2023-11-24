const mon = require("mongoose");

const ratingAndReviewSchema = new mon.Schema({
  user: {
    type: mon.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rating: {
    type: Number,
    req: true,
  },
  review: {
    type: String,
    trim: true,
  },
});

module.exports = mon.model("RatingAndReview", ratingAndReviewSchema);
