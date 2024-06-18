import React, { useState } from 'react'
import './Login.css'

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
    <div className='login-input-container'>
        <label className='login-input-label'>
            Email
            <input className='login-input' type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className='login-input-label'>
            Password
            <input className='login-input' type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className='login-btn' onClick={handleLogin}>Login</button>
    </div>
  )
}


