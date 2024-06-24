"use client";
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Adjust the URL to match your server

function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on('message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <>
            <div className="App">
                <h1>Socket.IO Chat</h1>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </>
    );
}

export default Chat;
