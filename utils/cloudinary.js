const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzco4bfgp",
  api_key: "452725839226954",
  api_secret: "QaQXllFFK95cK5e3yhLcbo6iB_o",
});



// Upload image
const cloudinaryUploadImage = async (fileToUpload) => {
  try {
    const result = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto",
      folder: "blogs",
    });
    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Internal Server Error (Cloudinary)");
  }
};

// Remove single image
const cloudinaryRemoveImage = async (imagePublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error (Cloudinary)");
  }
};

// Remove multiple images
const cloudinaryRemoveMultipleImages = async (publicIds) => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error (Cloudinary)");
  }
};

module.exports = {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
};
