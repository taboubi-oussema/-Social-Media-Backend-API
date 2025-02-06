

const GetAllNotifications = (req, res) => {
  res.send("Get all notifications");
};

const GetNotificationById = (req, res) => {
  res.send("Get notification by ID");
};

const CreateNewNotification = (req, res) => {
  res.send("Create new notification");
};

const UpdateNotification = (req, res) => {
  res.send("Update notification");
};

const DeleteNotification = (req, res) => {
  res.send("Delete notification");
};

module.exports = {
  GetAllNotifications,
  GetNotificationById,
  CreateNewNotification,
  UpdateNotification,
  DeleteNotification,
};
