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
  
  const { title, description, status, date} = req.body;
  const createdPost = new Post({
    title,
    description,
    date: new Date().toLocaleDateString('en-GB', {  
      day:   'numeric',
      month: 'short',
      year:  'numeric',
      hour:  '2-digit',
      minute: '2-digit'
  }),
    status
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

//update Issue
const updatePost = async (req, res, next) => {

  const { status } = req.body;
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update post.',
      500
    );
    return next(error);
  }

  post.status = status;

  try {
    await post.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update post.',
      500
    );
    return next(error);
  }

  res.status(200).json({ updatePost: post});
};


module.exports = { getAllPost, createPost, updatePost};
