const GetAllComments = (req, res) => {
  res.send("Get all comments");
};

const GetCommentById = (req, res) => {
  res.send("Get comment by ID");
};

const CreateNewComment = (req, res) => {
  res.send("Create new comment");
};

const UpdateComment = (req, res) => {
  res.send("Update comment");
};

const DeleteComment = (req, res) => {
  res.send("Delete comment");
};

module.exports = {
  GetAllComments,
  GetCommentById,
  CreateNewComment,
  UpdateComment,
  DeleteComment,
};
