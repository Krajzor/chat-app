import { messages } from "./contact-info.js";

function renderChatMessages() {
    const messagesContainer = document.querySelector('.chat-messages-container');

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    let messagesContainerHTMl = '';

    messages.forEach((message) => {
        messagesContainerHTMl += `<div class="chat-message ${message.sentOrReceived}">${message.content}</div>`;
    });

    messagesContainer.innerHTML = messagesContainerHTMl;

    scrollToBottom();
}

renderChatMessages();