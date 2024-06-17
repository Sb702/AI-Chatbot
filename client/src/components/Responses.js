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

return (
  <div className="msg-container">
    {/* Beginning of response from api */}
    {response && (
      <div>
        {previousMessages.map((message, index) => (
          message && previousResponses[index] && (
            <div key={index}>
              <div className="user-msg-wrap">
                <p className="main-user-message">{previousMessages[index]}</p>
              </div>
              <div className="ai-msg-wrap">
                <p className="main-ai-message">{previousResponses[index]}</p>
              </div>
            </div>
          )
        ))}
        <div className="user-msg-wrap">
          {lastMessage && <p>{lastMessage}</p>}
        </div>
        <div className="ai-msg-wrap">
          {response && <p>{response}</p>}
        </div>
      </div>
    )}
    {/* End of response from api */}
  </div>
);
}
