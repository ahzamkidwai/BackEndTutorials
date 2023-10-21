//import the model
const Todo = require("../models/Todo");

//Define Route Handler
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Data is Deleted by ID",
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
