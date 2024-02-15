const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imgUploader");

// create a subsection
exports.createSubSection = async (req, res) => {
  try {
    // Fetch Data from Req Body
    const { sectionId, title, timeDuration, description } = req.body;
    // Extract File/ Vedio
    const video = req.files.videoFile;
    // Validate data
    if (!sectionId || !title || !timeDuration || !description || !video) {
      res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    // Upload Vedio to Cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    // Create a subsection
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });
    // Put subsectionId into section database
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: subSectionDetails._id } },
      { new: true }
    ).populate();

    // return res
    res.status(200).json({
      success: true,
      message: "Sub Section Created Successfully",
      data: updatedSection,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

// HW: Update Subsection

// HW: Delete Subsection
