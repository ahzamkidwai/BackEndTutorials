//import the model
const Todo = require("../models/Todo");

//Define Route Handler
exports.updateTodo = async (req, res) => {
  try {
    //Second method to find ID and update
    const { id } = req.params;
    const { title, description } = req.body;    

    const todo = await Todo.findByIdAndUpdate(
      {
        _id: id,
      },
      { title, description, updateAt: Date.now() }
    );
    res.status(200).json({
      success: true,
      data: todo,
      message: "Data is Fetched by ID and updated Successfully.",
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
