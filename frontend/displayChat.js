import { createMessage } from './createMessage.js';
import { getCurrentUser } from './authState.js';
import { scrollToBottom, sentOrReceived } from './styles/utils.js';
import { socket } from './socket.js';

export async function displayChat(conversationId) {

    socket.emit('joinConversation', conversationId);

    async function getMessages(conversationId) {
        const res = await fetch(
            `http://localhost:5000/api/messages/${conversationId}`
        );
        const messages = await res.json();
        return messages;
    }
    
    socket.on('newMessage', (message) => { 
        appendMessage(message); 
    });

    const messages = await getMessages(conversationId);

    const currentUserId = getCurrentUser().userId;
    const chatContainer = document.querySelector('.chat-container');

    const pfpFileName = 'gonitramwaj.jpg';
    const username = 'gonitramwaj';
    const lastSeen = 'last seen today at 12:36 PM';

    let chatContainerHTML = `
        <div class="chat-header">
            <div class="chat-icon-container"><img class="chat-icon" src="./assets/pfps/${pfpFileName}"></div>
            <div class="chat-details">
                <div class="chat-name">${username}</div>
                <div class="chat-last-seen">${lastSeen}</div>
            </div>
            <div class="chat-functions">
                <div class="chat-call"><img class="chat-icon" src="./assets/icons/callButton.png"></div>
                <div class="chat-search"><img class="chat-icon" src="./assets/icons/searchButton.png"></div>
                <div class="chat-options"><img class="chat-icon" src="./assets/icons/optionsButton.png"></div>
            </div>
        </div>
        <div class="chat-messages-container">
            
        </div>
        <div class="chat-input-container">
            <div class="chat-input-icon-container"><img class="chat-input-icon" src="assets/icons/attachButton.png"></div>
            <div class="chat-input-icon-container"><img class="chat-input-icon" src="assets/icons/stickersButton.png"></div>
            <input class="chat-input" type="text" placeholder="Type a message...">
            <div class="chat-input-icon-container"><img class="chat-input-icon" src="assets/icons/voiceSearchButton.png"></div>
        </div>
    `;

    chatContainer.innerHTML = chatContainerHTML;

    function appendMessage(message) {
        const messagesContainer = document.querySelector('.chat-messages-container');

        messagesContainer.innerHTML += `<div class="chat-message ${sentOrReceived(message, currentUserId)}">${message.text}</div>`;
        scrollToBottom(messagesContainer);
    }


    const inputObject = document.querySelector('.chat-input');

    inputObject.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {

            const message = await createMessage(inputObject.value.trim());

            inputObject.value = '';

        } 
    });

    const messagesContainer = document.querySelector('.chat-messages-container');
    let messagesContainerHTMl = '';

    

    messages.forEach((message) => {
        messagesContainerHTMl += `<div class="chat-message ${sentOrReceived(message, currentUserId)}">${message.text}</div>`;
    });

    messagesContainer.innerHTML = messagesContainerHTMl;

    scrollToBottom(messagesContainer);
}

