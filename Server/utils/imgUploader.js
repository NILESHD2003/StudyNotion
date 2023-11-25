const cloudinary = require("cloudinary").v2

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = {folder}
    if(height){
        options = {height}
    }
    if(quality){
        options = {quality}
    }
    options.resouce_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}