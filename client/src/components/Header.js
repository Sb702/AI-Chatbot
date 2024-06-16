import React from "react";

export default function Header({ user, setLoggedIn}) {
  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <div>
      <h1 className="headline">Ask AI Anything!</h1>
      {user && <h3>Welcome, {user.username}!</h3>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
