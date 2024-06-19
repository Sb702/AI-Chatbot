const OpenAI = require("openai-api");
const axios = require("axios");
const chatSchema = require("../Schemas/ChatSchema");
const dotenv = require("dotenv");

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_KEY;


exports.Chat = async function (req, res) {
  const { message, dbContent } = req.body;
  console.log(dbContent);

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
// We want to include all the messages and responses in the conversation to openai. We can do this by including the messages and responses in the body of the request to the openai api
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant who is meant to help the user with whatever quetions they have.",
          },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const chatResponse = response.data.choices[0].message.content;

    const existingChat = await chatSchema.findOne({
      chatName: dbContent.chatName,
    });



    const chat = new chatSchema({
      chatName: dbContent.chatName,
      messages: dbContent.lastMessage,
      responses: chatResponse,
      lastMessage: dbContent.lastMessage,
      lastResponse: chatResponse,
      user: dbContent.user,
    });

    // Right now we're creating a new array of responses everytime a new message is sent to the chat. This is not ideal as it will create a new array of responses everytime a new message is sent. We need to update the existing array of responses with the new response
    if (existingChat) {
      const newResponses = [...existingChat.responses, chatResponse]
      const newMessages = [...existingChat.messages, dbContent.lastMessage]
      existingChat.messages = newMessages;
      existingChat.responses = newResponses;
      existingChat.lastMessage = dbContent.lastMessage;
      existingChat.lastResponse = chatResponse;
      await existingChat.save();
      return res.json({ response: chatResponse });
    }

    await chat.save();

    res.json({ response: chatResponse });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error.message);
    res.status(500).json({ error: "Failed to communicate with OpenAI" });
  }
};

// set up a function to fetch all chats from the database according to the userid of the user
exports.getChats = async function (req, res) {
  const { userid } = req.body;
  // console.log(userid);

  try {
    const chats = await chatSchema.find({ user: userid });
    res.json({ chats: chats });
  } catch (error) {
    console.error("Error fetching chats: ", error.message);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
}