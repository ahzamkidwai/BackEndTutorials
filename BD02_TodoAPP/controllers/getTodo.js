//import the model
const Todo = require("../models/Todo");

//Define Route Handler
exports.getTodo = async (req, res) => {
  try {
    //Fetch all the todo items from the database.
    const todos = await Todo.find({});

    //Response
    res.status(200).json({
      success: true,
      data: todos,
      message: "Entry Data is Fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    console.error(error.message);
    res.status(500).json({
      success: false,
      data: "Server Error",
      message: error.message,
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    //Extract Todo Items based on ID.
    const id = req.params.id;
    const todo = await Todo.findById({ _id: id });

    //Data for given ID is not found.
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "No data is found with given ID",
      });
    }
    //Data for given ID is found.
    res.status(200).json({
      success: true,
      data: todo,
      message: `Todo ${id} data is successfully fetched.`,
    });
  } catch (error) {
    console.log(error);
    console.error(error.message);
    res.status(500).json({
      success: false,
      data: "Server Error",
      message: error.message,
    });
  }
};
