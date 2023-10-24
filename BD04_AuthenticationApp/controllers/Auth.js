const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

//Login Handler

exports.login = async (req, res) => {
  try {
    //data fetch
    const { email, password } = req.body;
    //validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    //check for registered User
    const user = await User.findOne({ email });

    //if not a registered user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    //Verify Password and generate a  JWT Token
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        user,
        token,
        message: "User Logged in successfully",
      });
    } else {
      //Password do not match
      res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success:false,
      message:"login Failure"
    })
  }
};
