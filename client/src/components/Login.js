import React, { useState } from 'react'

export default function Login({ setLoggedIn, setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin() {
    // console.log(email, password)
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      username: email,
      password: password
      })
    })
    .then(response => {
      if (response.status === 200) {
      setLoggedIn(true);
      }
      return response.json();
    })
    .then(data => setUser(data.user))
    .catch(error => console.error(error))
  }

  return (
    <div>
        <label>
            Email:
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
            Password:
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>
    </div>
  )
}


