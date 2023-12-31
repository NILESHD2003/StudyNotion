const mon = require("mongoose");

const subSectionSchema = new mon.Schema({
  courseName: {
    type: String,
    trim: true,
  },
  courseDescription: {
    type: String,
  },
  instructor: {
    type: mon.Schema.Types.ObjectId,
    ref: "User",
    req: true,
  },
  whatYouWillLearn: {
    type: String,
    trim: true,
  },
  courseContent: [
    {
      type: mon.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingAndReviews: [
    {
      type: mon.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  price: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mon.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  tags: {
    type: String,
  },
  studentEnrolled: [
    {
      type: mon.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  ],
});

module.exports = mon.model("SubSection", subSectionSchema);
