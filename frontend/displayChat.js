import { createMessage } from './createMessage.js';
import { getCurrentUser } from './authState.js';
import { scrollToBottom, sentOrReceived } from './styles/utils.js';
import { socket } from './socket.js';



export async function displayChat(conversationId) {

    socket.off('newMessage');

    socket.emit('joinConversation', conversationId);

    async function getMessages(conversationId) {
        const res = await fetch(
            `/api/messages/${conversationId}`
        );
        const messages = await res.json();
        return messages;
    }
    
    socket.on('newMessage', (message) => { 
        appendMessage(message); 
    });

    const messages = await getMessages(conversationId);

    const currentUser = getCurrentUser();
    const currentUserId = currentUser.userId;
    const chatContainer = document.querySelector('.chat-container');

    async function getConversation(conversationId) {
        const res = await fetch(`/api/conversations/${conversationId}`);
        const conversation = await res.json();
        return conversation;
    }

    const conversation = await getConversation(conversationId);
    const other = conversation.participants.find(participant => participant._id !== currentUserId)
    const avatar = other.avatar;
    const displayName = other.displayName;
    const lastSeen = other.lastSeen;
    const date = new Date(lastSeen);

    const formattedLastSeen = date.toLocaleString();
    

    let chatContainerHTML = `
        <div class="chat-header">
            <div class="chat-icon-container"><img class="chat-icon" src="./assets/pfps/${avatar}"></div>
            <div class="chat-details">
                <div class="chat-name">${displayName}</div>
                <div class="chat-last-seen">Last seen: ${formattedLastSeen}</div>
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

    const newInputObject = inputObject.cloneNode(true);
    inputObject.replaceWith(newInputObject);
    
    newInputObject.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            
            await createMessage(newInputObject.value.trim(), conversationId, currentUserId);

            newInputObject.value = '';
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

