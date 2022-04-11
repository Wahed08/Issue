const HttpError = require("../ErrorModel/errorModel");
const Post = require("../models/postModel");

//getAllPost
const getAllPost = async (req, res, next) => {
  let All;
  try {
    All = await Post.find();
  } catch (err) {
    const error = new HttpError(
      "Could not find any post, try again later",
      420
    );
    return next(error);
  }

  if (!All) {
    const error = new HttpError(
      "You do not have any post, create new one",
      402
    );
    return next(error);
  }

  res.status(200).json({ All_post: All.map((user) => user.toObject({ getters: true }))});
};

//createPost
const createPost = async (req, res, next) => {
  
  const { title, description } = req.body;
  const createdPost = new Post({
    title,
    description,
  });

  try {
    await createdPost.save();
  } catch (err) {
    const error = new HttpError(
      "Post Uploaded failed, please try again",
      501
    );
    return next(error);
  }

  res.status(201).json({ Post: createdPost });
};


module.exports = { getAllPost, createPost};
