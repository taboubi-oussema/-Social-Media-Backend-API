const GetAllMessages = (req, res) => {
    res.send("Get all messages");
};

const GetMessageById = (req, res) => {
    res.send("Get message by ID");
};

const CreateMessage = (req, res) => {
    res.send("Create message");
};

const UpdateMessage = (req, res) => {
    res.send("Update message");
};

const DeleteMessage = (req, res) => {
    res.send("Delete message");
};

module.exports={
    GetAllMessages,
    GetMessageById,
    CreateMessage,
    UpdateMessage,
    DeleteMessage
};