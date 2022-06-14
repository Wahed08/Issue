const { query } = require("express");
const HttpError = require("../ErrorModel/errorModel");
const Post = require("../models/postModel");

//getAllIssue
const getAllIssue = async (req, res, next) => {
  let All;
  const searchField={};

  if(req.query.keyword){
    searchField.$or=[
      {"title" : {$regex: req.query.keyword, $options: 'i'}},
      {"description" : {$regex: req.query.keyword, $options: 'i'}},
      {"status" : {$regex: req.query.keyword, $options: 'i'}}
    ]
  }

  try {
    All = await Post.find(searchField);
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

  res
    .status(200)
    .json({ All_post: All.map((user) => user.toObject({ getters: true })) });
};

//createIssue
const createIssue = async (req, res, next) => {
  const { title, description, status, date } = req.body;

  const createdPost = new Post({
    title,
    description,
    date: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    status,
    creatorId: req.user._id,
  });

  try {
    await createdPost.save();
  } catch (err) {
    const error = new HttpError("Post Uploaded failed, please try again", 501);
    return next(error);
  }

  res.status(201).json({ Post: createdPost });
};

//update Issue
const updateIssue = async (req, res, next) => {
  const { status } = req.body;
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update post.",
      500
    );
    return next(error);
  }

  post.status = status;

  try {
    await post.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update issue.",
      500
    );
    return next(error);
  }

  res.status(200).json({ updatePost: post });
};

//delete Issue
const deleteIssue = async (req, res, next) => {
  const postId = req.params.pid;
  let post;
  try {
    post = await Post.findByIdAndDelete(postId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete issue.",
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError("Could not find issue for this id.", 404);
    return next(error);
  }

  res.status(200).json({ message: "Deleted Post." });
};

//getIssueDetails
const getIssueDetails = async (req, res, next) => {
  let issue;
  const pid = req.params.pid;
  try {
    issue = await Post.findById(pid);
  } catch (err) {
    const error = new HttpError(
      "Could not find any issue, try again later",
      420
    );
    return next(error);
  }

  if (!issue) {
    const error = new HttpError(
      "do not have any issue provided with this id",
      402
    );
    return next(error);
  }

  res.status(200).json({ Issue: issue });
};

//Issue edit by own user
const editIssue = async (req, res, next) => {
  const { title, description } = req.body;
  const postId = req.params.pid;

  let issue;
  try {
    issue = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update issue!.",
      500
    );
    return next(error);
  }

  issue.title = title;
  issue.description = description;

  try {
    await issue.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update issue.",
      500
    );
    return next(error);
  }

  res.status(200).json({ updateIssue: issue });
};

module.exports = {
  getAllIssue,
  createIssue,
  updateIssue,
  deleteIssue,
  getIssueDetails,
  editIssue,
};
