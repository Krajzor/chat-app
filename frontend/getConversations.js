import { getMessages } from './getMessages.js';

export async function getConversations(userID) {
    const res = await fetch(`http://localhost:5000/api/conversations/user/${userID}`);

    return await res.json();
}

export async function generateConversationsHTML(userID) {
    
    const conversationsToAppend = await getConversations(userID.userId);

    let contactsHTML = '';
    conversationsToAppend.forEach((conversation) => {
        contactsHTML += `
            <div class="contact js-contact-${conversation._id}" data-id="${conversation._id}">
                <div class="contact-pfp-container"><img class="contact-pfp" src="./assets/pfps/${conversation.avatar}"></div>
                <div>
                    <p class="contact-name-container">${conversation.title}</p>
                    <p class="contact-last-message-container">${conversation.lastMessage.text}</p>
                </div>
                <div class="contact-last-seen-container">Placheholder</div>
            </div>
        `;
    });
    document.querySelector('.contacts-container').innerHTML = contactsHTML;

    const conversations = document.querySelectorAll('.contact');
    conversations.forEach((conversation) => {
        conversation.addEventListener('click', () => {
            getMessages(conversation.dataset.id);
        });
    });
    
}