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
    { (
      <div>
        {previousMessages.map((message, index) => (
            (
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
      </div>
    )}
    {/* End of response from api */}
  </div>
);
}
