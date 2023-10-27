const File = require("../models/file");

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
