const { Message, messageJoiSchema } = require("../model/message.model");
const asynchandler = require("express-async-handler");
const { User } = require("../model/user.model");

/**
 * @desc Get All Messages
 * @route  /api/messages
 * @method GET
 * @access public
 */
const GetAllMessages = asynchandler(async (req, res) => {
  try {
    const messages = await Message.find().populate("sender receiver");
    if (!messages.length) {
      return res.status(404).json({ message: "No messages found" });
    }
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @desc Get Message By ID
 * @route  /api/messages/:id
 * @method GET
 * @access public
 */
const GetMessageById = asynchandler(async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate(
      "sender receiver"
    );
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @desc Create New Message
 * @route  /api/messages
 * @method POST
 * @access public
 */
const CreateMessage = asynchandler(async (req, res) => {
  try {
    const { error } = messageJoiSchema(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const sender = await User.findById(req.body.sender);
    const receiver = await User.findById(req.body.receiver);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or Receiver not found" });
    }

    const newMessage = new Message({
      text: req.body.text,
      sender: req.body.sender,
      receiver: req.body.receiver,
    });

    await newMessage.save();
    return res.status(201).json({
      message: "Message created successfully",
      newMessage,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @desc Update Message
 * @route  /api/messages/:id
 * @method PUT
 * @access public
 */
const UpdateMessage = asynchandler(async (req, res) => {
  try {
    const existingMessage = await Message.findById(req.params.id);
    if (!existingMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text || existingMessage.text,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Message updated successfully",
      updatedMessage,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @desc Delete Message
 * @route  /api/messages/:id
 * @method DELETE
 * @access public
 */
const DeleteMessage = asynchandler(async (req, res) => {
  try {
    const exist = await Message.findById(req.params.id);
    if (!exist) {
      return res.status(404).json({ message: "Message not found" });
    }

    await Message.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = {
  GetAllMessages,
  GetMessageById,
  CreateMessage,
  UpdateMessage,
  DeleteMessage,
};
