import React, { useState }from 'react';
import AiChat from './containers/AiChat';
import UserAuth from './containers/UserAuth';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);


  return (
    <div>
      {loggedIn === false && <UserAuth loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      {/* <AiChat /> */}
      {loggedIn && <AiChat />}
    </div>
  );
}

export default App;
