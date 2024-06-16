import "./responses.css";

export default function Responses({
  message,
  response,
  previousMessages,
  previousResponses,
}) {

  return (
    <div>
      {/* Beginning of response from api */}
      {response && (
        <div>
          <div className="user-msg-wrap">
            {message && <p>{message}</p>}
          </div>
          <div className="ai-msg-wrap">
            {response && <p>{response}</p>}
          </div>{" "}
          {previousMessages.map((message, index) => (
            message && previousResponses[index] && (
              <div key={index}>
                  <div className="user-msg-wrap">
                <p className="main-user-message">{message}</p>
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
