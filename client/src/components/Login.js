import React from 'react'

export default function Login() {
  return (
    <div>
        <label>
            Email:
            <input type="email" />
        </label>
        <label>
            Password:
            <input type="password" />
        </label>
        <button>Login</button>
    </div>
  )
}
