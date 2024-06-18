import React, { useEffect, useState } from 'react'

export default function Conversations({ user }) {
    const [chats, setChats] = useState([])

    console.log(user._id)

    // function to fetch all chats from the database according to the userid of the user at http://localhost:5000/allchats
    useEffect(() => {
    async function getChats() {
        try {
            const response = await fetch("http://localhost:5000/allchats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userid: user._id,
                }),
            });
            const data = await response.json();
            setChats(data.chats);
            console.log(data)
        } catch (error) {
            console.error("Error fetching chats: ", error.message);
        }
    }
    getChats();
    }, [user._id])

  return (
    <div>
        <h1>Conversations</h1>
        <ul>
            {chats.map((chat, index) => (
                <li key={index}>
                    <p>{chat.chatName}</p>
                    <p>{chat.lastMessage}</p>
                    <p>{chat.lastResponse}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}
