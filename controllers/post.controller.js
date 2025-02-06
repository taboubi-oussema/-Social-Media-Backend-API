const express = require("express");
const route = express.Router();

const GetAllPosts = (req, res) => {
  res.send("Get all posts");
};

const GetPostById = (req, res) => {
  res.send("Get post by ID");
};

const CreateNewPost = (req, res) => {
  res.send("Create new post");
};

const UpdatePost = (req, res) => {
  res.send("Update post");
};

const DeletePost = (req, res) => {
  res.send("Delete post");
};

module.exports = {
  GetAllPosts,
  GetPostById,
  CreateNewPost,
  UpdatePost,
  DeletePost,
};
