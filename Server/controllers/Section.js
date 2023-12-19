const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;
    //Validate Data
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All Data is mandatory",
      });
    }
    const newSection = await Section.create({ sectionName });
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { courseId },
      { $push: { courseContent: newSection._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Section Created",
      updatedCourseDetails,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating section",
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }
    //update Data
    const section = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { sectionName },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Section Updated",
      updatedCourseDetails,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating section",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    await Section.findByIdAndDelete(sectionId);

    return res.status(500).json({
      success: false,
      message: "Section Deleted",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting section",
    });
  }
};
