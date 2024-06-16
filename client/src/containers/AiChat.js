import React, { useState } from "react";
import Form from "../components/Form";
import Responses from "../components/Responses";
import Header from "../components/Header";
import './AiChat.css';

export default function AiChat({ setLoggedIn, user }) {
  const [message, setMessage] = useState([]); // Add this line
  const [response, setResponse] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]); // Add this line
  const [previousResponses, setPreviousResponses] = useState([]); // Add this line

  // Function to handle the form submission

  function onSubmit(e) {
    e.preventDefault();
    // Get the message from the input field
    const message = e.target.elements.message.value;
    setMessage(message);

    // Send the message to the server
    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponse(data.response);
      })
      .then(() => {
        handleConversation();
      })
      .catch((error) => {
        console.error("Error sending message: ", error);
      });
  }

function handleConversation() {
  // Add the new message to the end of the previousMessages array
  setPreviousMessages(previousMessages => [...previousMessages, message]);
  setPreviousResponses(previousResponses => [...previousResponses, response]);
}

return (
  <div className="chat-main-container">
    <Header className="Header" user={user} setLoggedIn={setLoggedIn} />
    <div className="Responses">
      <Responses
        message={message}
        response={response}
        previousMessages={previousMessages}
        previousResponses={previousResponses}
      />
    </div>
    <Form className="Form" onSubmit={onSubmit} setLoggedIn={setLoggedIn} user={user} />
  </div>
);
}
