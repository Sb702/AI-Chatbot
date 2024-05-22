import React, { useState } from "react";

function App() {
  const [response, setResponse] = useState('');
  
  
  // Function to handle the form submission


  function onSubmit (e) {
    e.preventDefault();
    // Get the message from the input field
    const message = e.target.elements.message.value;

    // Send the message to the server
    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "message": message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponse(data.response);
      })
      .catch((error) => {
        console.error("Error sending message: ", error);
      });
  }

  return (
    <div>
      <h1>ChatGPT</h1>
      {/* Beginning of text entering */}
      <form onSubmit={onSubmit}>
        <label>
          Enter your message:
          <input type="text" name="message" />
        </label>
        <button type="submit">Send</button>
      </form>
      {/* End of text entering */}


            {/* Beginning of response from api */}
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
      {/* End of response from api */}
    </div>
  )
}

export default App;
