const Notification = require("../model/notification.model");
const asynchandler = require("express-async-handler");
const { User } = require("../model/user.model");
/**
 * @desc Get All Notifications
 * @route  /api/notifications
 * @method GET
 * @access public
 */
const GetAllNotifications = asynchandler(async (req, res) => {
  try {
    const notifications = await Notification.find().populate("user");
    if (!notifications.length) {
      return res.status(404).json({ message: "No notifications found" });
    }
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @desc Get Notification By ID
 * @route  /api/notifications/:id
 * @method GET
 * @access public
 */
const GetNotificationById = asynchandler(async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id).populate(
      "user"
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    return res.status(200).json(notification);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @desc Create New Notification
 * @route  /api/notifications
 * @method POST
 * @access public
 */
const CreateNewNotification = asynchandler(async (req, res) => {
  try {
    if (!req.body.user) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!req.body.message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const newNotification = new Notification({
      user: req.body.user,
      message: req.body.message,
      read: req.body.read || false,
    });

    await newNotification.save();
    return res.status(201).json({
      message: "Notification created successfully",
      newNotification,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @desc Update Notification
 * @route  /api/notifications/:id
 * @method PUT
 * @access public
 */
const UpdateNotification = asynchandler(async (req, res) => {
  try {
    const existingNotification = await Notification.findById(req.params.id);
    if (!existingNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        message: req.body.message || existingNotification.message,
        read:
          req.body.read !== undefined
            ? req.body.read
            : existingNotification.read,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Notification updated successfully",
      updatedNotification,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @desc Delete Notification
 * @route  /api/notifications/:id
 * @method DELETE
 * @access public
 */
const DeleteNotification = asynchandler(async (req, res) => {
  try {
    const exist = await Notification.findById(req.params.id);
    if (!exist) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await Notification.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Notification deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = {
  GetAllNotifications,
  GetNotificationById,
  CreateNewNotification,
  UpdateNotification,
  DeleteNotification,
};
