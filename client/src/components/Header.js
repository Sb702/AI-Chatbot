import React from "react";

export default function Header({ user, setLoggedIn, chatName }) {
  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <div>
      <h1 className="headline">Ask AI Anything!</h1>
      {user && <h3>Welcome, {user.username}!</h3>}
      <h3>You're in Chat: {chatName}</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
