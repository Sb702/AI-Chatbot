import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import Responses from "../components/Responses";
import Header from "../components/Header";
import "./AiChat.css";
import Conversations from "../components/Conversations";

export default function AiChat({ setLoggedIn, user }) {
  const [message, setMessage] = useState(""); // Add this line
  const [response, setResponse] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]); // Add this line
  const [previousResponses, setPreviousResponses] = useState([]); // Add this line
  const [chatName, setChatName] = useState("");
  const [converse, setConverse] = useState(false);
  const [showConversations, setShowConversations] = useState(false);

  useEffect(() => {
    function newChatName() {
      if (chatName === "") {
        setChatName(chatName + Math.floor(Math.random() * 1000));
      }
    }
    newChatName();
  }, []);

  // Function to handle the form submission

  async function onSubmit(e) {
    e.preventDefault();

    // We need a way to update previousMessages only when we have already sent a message (converse = true). We can do this by adding the new message to the previousMessages array

    if (converse) {
      handleConversation();
    }

    const conversation = {
      chatName: chatName,
      messages: [previousMessages],
      responses: [previousResponses],
      lastMessage: message,
      user: user._id,
    };

    if (converse === false) {
      setConverse(true);
    }

    // console.log(conversation)

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          dbContent: conversation,
        }),
      });

      const data = await response.json();
      setResponse(data.response);
      handleConversation();
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  }

  function handleConversation() {
    // Add the new message to the end of the previousMessages array remove any "" from the arrays
    setPreviousMessages([...previousMessages, message].filter(Boolean));
    setPreviousResponses([...previousResponses, response].filter(Boolean));
  }

  return (
    <div className="chat-main-container">
      <div className="conversation-btn-container">
        <button onClick={() => setShowConversations(!showConversations)}>
          Conversations
        </button>
      </div>
      {showConversations && (
        <div className="conversation-container">
          <Conversations
            user={user}
            setChatName={setChatName}
            previousMessages={previousMessages}
            previousResponses={previousResponses}
            setPreviousMessages={setPreviousMessages}
            setPreviousResponses={setPreviousResponses}
          />
        </div>
      )}
      <div className="Header">
        <Header user={user} setLoggedIn={setLoggedIn} chatName={chatName} />
      </div>
      <div className="Responses">
        <Responses
          message={message}
          response={response}
          previousMessages={previousMessages}
          previousResponses={previousResponses}
        />
      </div>
      <Form
        className="Form"
        onSubmit={onSubmit}
        setLoggedIn={setLoggedIn}
        setMessage={setMessage}
        user={user}
      />
    </div>
  );
}
