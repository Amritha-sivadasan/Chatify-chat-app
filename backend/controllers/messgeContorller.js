const asyncHandler = require("express-async-handler");
const Message = require("../model/messageModel");
const User = require("../model/userModel");
const Chat = require("../model/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("invalid date passed into requrst");
    return res.statusCode(400);
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name picture");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name picture email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessage = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name picture email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
module.exports = { sendMessage, allMessage };
