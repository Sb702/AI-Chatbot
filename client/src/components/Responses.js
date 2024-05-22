import "./responses.css";

export default function Responses({
  message,
  response,
  previousMessages,
  previousResponses,
}) {
  console.log(previousMessages);

  return (
    <div>
      {/* Beginning of response from api */}
      {response && (
        <div>
          <div className="user-msg-wrap">
            <p>{message}</p>
          </div>
          <div className="ai-msg-wrap">
            <p>{response}</p>
          </div>{" "}
          {previousMessages.map((message, index) => (
            <div key={index}>
                <div className="user-msg-wrap">
              <p className="main-user-message">{message}</p>
                </div>
                <div className="ai-msg-wrap">
              <p className="main-ai-message">{previousResponses[index]}</p>
                </div>
            </div>
          ))}
        </div>
      )}
      {/* End of response from api */}
    </div>
  );
}
