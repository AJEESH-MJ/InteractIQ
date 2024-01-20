const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    res.status(400);
    throw new Error("Invalid message data");
  }
  var newMessage = {
    sender: req.user._id,
    chat: chatId,
    content: content,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name avatar");
    message = await message.populate("chat");
    mesasge = await User.populate(message, {
      path: "chat.users",
      select: "name avatar phoneNumber",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error("Invalid message data");
  }
});

const allMessage = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name avatar phoneNumber")
      .populate("chat")
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error("Invalid message data");
  }
});

module.exports = { sendMessage, allMessage };
