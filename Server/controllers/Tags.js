const Tag = require("../models/Tag");

exports.createTag = async (req, res) => {
  try {
    const { name, description } = req.body;
    //data validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is mandatory",
      });
    }
    const tagDetails = await Tag.create({
      name: name,
      description: description,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.showAllTags = async (req, res) => {
  try {
    const allTags = await Tag.find({}, { name: true, description: true });
    res.status(200).json({
      success: true,
      message: "All available Tags",
      allTags,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
