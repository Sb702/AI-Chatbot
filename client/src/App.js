import React, { useState }from 'react';
import AiChat from './containers/AiChat';
import UserAuth from './containers/UserAuth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  return (
    <div>
      {loggedIn === false && <UserAuth loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} />}
      {/* <AiChat /> */}
      {loggedIn && <AiChat setLoggedIn={setLoggedIn} user={user}/>}
    </div>
  );
}

export default App;
