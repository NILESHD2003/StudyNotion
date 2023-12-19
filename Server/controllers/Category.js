const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    //data validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is mandatory",
      });
    }
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      message: "Category Created"
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.showAllCategory = async (req, res) => {
  try {
    const allTags = await Tag.find({}, { name: true, description: true });
    res.status(200).json({
      success: true,
      message: "All available Category",
      allTags,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
