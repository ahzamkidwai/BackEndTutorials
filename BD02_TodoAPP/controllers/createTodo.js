//import the model
const Todo = require("../models/Todo");

//Define Route Handler
exports.createTodo = async (req, res) => {
  try {
    //Extract title and description from request body.
    const { title, description } = req.body;
    //Create new Todo Object and insert in DB.
    const response = await Todo.create({ title, description });
    //Send a json response with a success flag
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry Created Successfully",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: error.message,
    });
  }
};
