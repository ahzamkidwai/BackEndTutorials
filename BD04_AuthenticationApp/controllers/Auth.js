const bcrypt = require("bcrypt");
const User = require("../models/User");

//SignUp ROute Handler
exports.signup = async (req, res) => {
  try {
    //fetch data from request body.
    const { name, password, role, email } = req.body;

    //Check if User is already existing or NOT
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    //Secure Password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in Hashing Password",
      });
    }

    //Create Entry for user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({
      success: true,
      message: "User Created Successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User Cannot be registered, Please try again later",
    });
  }
};
