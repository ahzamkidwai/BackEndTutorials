//importing Models
const Posts = require("../models/postModel");
const Like = require("../models/likeModel");

//like a post
exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });
    const savedLike = await like.save();
    //Update the post after liking that post.
    const updatedPost = await Posts.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    );

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Error while Liking a post",
    });
  }
};

//Unlike a post
exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

    //update the post Collection
    const updatedPost = await Post.findByIdAndUpdate(post,{$pull: { likes: deletedLike._id }},{ new: true });

    res.json({
      post: updatedPost,
    });

  } catch (error) {
    return res.status(400).json({
      error: "Error while Liking a post",
    });
  }
};
