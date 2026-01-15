import { socket } from "./socket.js";

export async function createMessage(text){

    if (!text) return;

    const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            conversationId: '694bc8f729d2c01abd7801a2',
            senderId: '694bc791e602d354226d9ad8',
            text
        })

    });

    const savedMessage = await res.json();

    socket.emit('sendMessage', savedMessage);

    return savedMessage;
    
}
