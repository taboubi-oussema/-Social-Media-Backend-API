const express = require("express");
const route = express.Router();
const GetAllUser = (req, res) => {
  res.send("all");
};
const GetUserById = (req, res) => {
  res.send("by");
};
const CreateNewUser = (req, res) => {
  res.send("creat");
};
const UpdateUser = (req, res) => {
  res.send("update");
};
const DeleteUser = (req, res) => {
  res.send("de;ee");
};
module.exports = {
  GetAllUser,
  GetUserById,
  UpdateUser,
  DeleteUser,
  CreateNewUser,
};
