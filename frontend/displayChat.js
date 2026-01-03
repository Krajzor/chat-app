import { messageInputListener } from "./messageInputListener.js";

const currentUser = JSON.parse(localStorage.getItem('user'));
const currentUserId = currentUser?.userId;

function scrollToBottom(page) {
    page.scrollTop = page.scrollHeight;
}

export async function displayChat(messages) {
    
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

    messageInputListener();

    const messagesContainer = document.querySelector('.chat-messages-container');
    let messagesContainerHTMl = '';

    function sentOrReceived(message) {
        if (message.senderId === currentUserId) {
            return 'sent';
        }
        return 'received';
    }

    messages.forEach((message) => {
        messagesContainerHTMl += `<div class="chat-message ${sentOrReceived(message)}">${message.text}</div>`;
    });

    messagesContainer.innerHTML = messagesContainerHTMl;

    scrollToBottom(messagesContainer);
}

export function appendMessage(message) {
    const messagesContainer = document.querySelector('.chat-messages-container');

    messagesContainer.innerHTML += `<div class="chat-message ${message.senderId === currentUserId ? 'sent': 'received'}">${message.text}</div>`
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
