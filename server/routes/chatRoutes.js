const OpenAI = require("openai-api");
const axios = require("axios");
const OPENAI_API_KEY =
  "sk-proj-W5OtN5pJhPZwAd8JEL59T3BlbkFJLn6kEDrJi4lbVWmDic0N";
const chatSchema = require("../Schemas/ChatSchema");

exports.Chat = async function (req, res) {
  const { message, dbContent } = req.body;
  console.log(dbContent);

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant who is meant to translate whatever they get into Italian",
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
