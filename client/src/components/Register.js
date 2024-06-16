import React, { useState } from 'react'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleRegister() {
    console.log(username, password)
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
  }




  return (
    <div>
        <label>
            Email:
            <input type="email" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
            Password:
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
            Confirm Password:
            <input type="password" />
        </label>
        <button onClick={handleRegister}>Register</button>
    </div>
  )
}
