import "./responses.css";

export default function Responses({
  message,
  response,
  previousMessages,
  previousResponses,
}) {

  // console.log(message)
  // console.log(response)
  // console.log(previousMessages)
  // console.log(previousResponses)


  const lastMessage = previousMessages[previousMessages.length - 1];
  // console.log(previousMessages)
  // console.log(response) // This is the response from the API for our latest message




  // console.log(previousResponses)


return (
  <div className="msg-container">
    {/* Beginning of response from api */}
    <div>
      {previousResponses.map((previousResponse, index) => (
        <div key={index}>
          <div className="user-msg-wrap">
            <p className="main-user-message">{previousMessages[index]}</p>
          </div>
          <div className="ai-msg-wrap">
            <p className="main-ai-message">{previousResponse}</p>
          </div>
        </div>
      ))}
      {/* Render the latest message and response */}
      <div>
        <div className="user-msg-wrap">
          <p className="main-user-message">{lastMessage}</p>
        </div>
        <div className="ai-msg-wrap">
          <p className="main-ai-message">{response}</p>
        </div>
      </div>
    </div>
    {/* End of response from api */}
  </div>
);
}
