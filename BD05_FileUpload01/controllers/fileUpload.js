const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    //fetch file
    const file = req.files.file;
    console.log("Printing file details", file);

    //this path is for server location which is stored locally on the system
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("Path -> ", path);

    file.mv(path, (err) => {
      if (err) {
        console.error("Error while moving the file:", err);
        res.status(500).json({
          success: false,
          message: "File upload failed.",
        });
      } else {
        res.json({
          success: true,
          message: "Local File Upload Successful.",
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "File upload failed.",
    });
  }
};

//Upload Image at Cloudinary

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function fileUploadToCloudinary(file, folder) {
  const options = { folder };
  console.log("Options : ", options);
  options.resource_type = "auto"; 
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    //Data Fetch
    const { name, tags, email } = req.body;
    console.log(name);
    console.log(tags);
    console.log(email);

    const file = req.files.imageFile;
    console.log(file);

    //Validation Process
    const supportedTypes = ["jpeg", "jpg", "png"];
    const extentionType = file.name.split(".")[1].toLowerCase();
    let check = isFileTypeSupported(extentionType, supportedTypes);
    if (!check) {
      return res.status(400).json({
        success: false,
        message: "File Format not supported.",
      });
    }

    const response = await fileUploadToCloudinary(file, "Media Upload");
    console.log(response);

    //DB mei entry save karni hain

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageURL: fileData.imageUrl,
      message: "Image successfully Uploaded on Cloudinary.",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Something went wrong, Image cannot be Uploaded",
    });
  }
};

//Video Upload Handler
exports.videoUpload = async (req, res) => {
  try {
    //Data Fetch karo
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const videoFile = req.files.video;
    console.log(videoFile);

    //Validation Process
    const supportedTypes = ["mp4", "mov"];
    const extentionType = videoFile.name.split(".")[1].toLowerCase();
    console.log(extentionType);

    let check = isFileTypeSupported(extentionType, supportedTypes);
    if (!check) {
      return res.status(400).json({
        success: false,
        message: "File Format not supported.",
      });
    }

    const response = await fileUploadToCloudinary(videoFile, "Media Upload");
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      videoURL: response.secure_url,
    });

    console.log(fileData);

    res.json({
      success: true,
      imageURL: fileData.videoURL,
      message: "Video successfully Uploaded on Cloudinary.",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Something went Wrong, Video cannot be uploaded on Cloudinary",
    });
  }
};
