import { appendMessage } from "./displayChat.js";

export function messageInputListener(){
    const inputObject = document.querySelector('.chat-input');

    

    inputObject.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {

            const text = inputObject.value.trim();

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

            appendMessage(savedMessage);
            
            inputObject.value = '';
        } 
    });
}
