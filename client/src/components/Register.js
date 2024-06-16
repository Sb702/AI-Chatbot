import React from 'react'

export default function Register() {
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
        <label>
            Confirm Password:
            <input type="password" />
        </label>
        <button>Register</button>
    </div>
  )
}
