import { socket } from "./socket.js";

export async function createMessage(text, conversationId, senderId) {

    if (!text) return;

    const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            conversationId,
            senderId,
            text
        })

    });

    const savedMessage = await res.json();

    socket.emit('sendMessage', savedMessage);

    return savedMessage;
    
}
