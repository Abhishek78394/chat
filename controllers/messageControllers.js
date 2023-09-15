const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");


exports.sendMessage = asyncHandler(async (req, res) => {
  try {
      const { content, chatId } = req.body;

      if (!content || !chatId) {
          console.log("Invalid data passed into request");
          return res.status(400).send("Invalid data");
      }

      const newMessage = {
          sender: req.user._id,
          content: content,
          chat: chatId,
      };

      const message = await Message.create(newMessage);

      // Assuming message.sender and message.chat are ObjectId references
      // You can manually populate these references if necessary
      const populatedMessage = await Message.findById(message._id)
          .populate("sender", "name pic")
          .populate("chat")
          .exec();

      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: populatedMessage });

      res.json(populatedMessage);
  } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).send("An error occurred");
  }
});




  exports.allMessages = asyncHandler(async (req, res) => {
    try {
      const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "name pic email")
        .populate("chat");
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });