const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imgUploader");

exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, whatWillYouLearn, price, category } =
      req.body;
    const thumbnail = req.files.thumbnailImage;

    //TODO: Verify that userId and instructorId are same line 28 & 29

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatWillYouLearn ||
      !price ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are mandatory",
      });
    }
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    console.log("Instructor Details", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Invalid Instructor Details",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Invalid Category Details",
      });
    }

    //upload to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      proccess.env.FOLDER_NAME
    );

    //create database entry
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatWillYouLearn,
      price,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      { $push: { course: newCourse._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course created Successfully",
      data: newCourse,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating a new course",
    });
  }
};

exports.showAllCourses = async (req, res) => {
  try {
    // allCourses = await Course.find(
    //   {},
    //   {
    //     courseName: true,
    //     price: true,
    //     instructor: true,
    //     thumbnail: true,
    //     ratingAndReviews: true,
    //   }
    // )
    //   .populate("instructor")
    //   .exec();

    allCourses = await Course.find({}).populate("instructor").exec();

    return res.status(200).json({
      success: true,
      message: "Courses Fetched",
      data: allCourses,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Cannot Fetch Courses",
    });
  }
};
