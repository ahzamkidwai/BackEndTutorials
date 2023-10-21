//import comment controller
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//Bussiness Logic
exports.createComment = async(req,res)=>{
     try{
        //fetch data from request body
        const {post,user,body} = req.body;
        //Create Comment Object
        const comment = new Comment({
            post,user,body
        });
        //Save the comment into the database
        const savedComment = await comment.save();
        //Find the post by ID, add the new comment to its comment array.
        const updatedPost = await Post.findByIdAndUpdate(post, {$push:{comments:savedComment._id}},{new:true}).populate("comments").exec(); //populate means to populate the comments array with comments documents
        res.json({
            post:updatedPost,
        })
     }
     catch  {
        return res.status(500).json({
            error:"Error while Creating comment",
        })
     }
}