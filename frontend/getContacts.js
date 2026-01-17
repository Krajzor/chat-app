import { displayChat} from './displayChat.js';

export async function getContacts(userID) {
    const res = await fetch(`http://localhost:5000/api/conversations/user/${userID}`);

    return await res.json();
}

export async function generateContactsHTML(user) {
    const contacts = await getContacts(user.userId);
    const contactsContainer = document.querySelector('.contacts-container');

   
    contactsContainer.innerHTML = contacts.map(contact => {
        const other = contact.participants.find(participant => participant._id !== user.userId)

        const avatar = other.avatar;
        const displayName = other.displayName;
        const lastSeen = other.lastSeen;
        const date = new Date(lastSeen);

        const formattedLastSeen = date.toLocaleString();

        const lastMessage = contact.lastMessage.text || '';

        return `
            <div class="contact js-contact-${contact._id}" data-id="${contact._id}" data-title="${displayName.toLowerCase()}" ">
                <div class="contact-pfp-container"><img class="contact-pfp" src="./assets/pfps/${avatar}"></div>
                <div>
                    <p class="contact-name-container">${displayName}</p>
                    <p class="contact-last-message-container">${lastMessage}</p>
                </div>
                <div class="contact-last-seen-container">${formattedLastSeen}</div>
            </div>
        `
        }
    ).join('');
    
    enableContactClicks(contactsContainer);
    enableSearch(contactsContainer);
    
}

function enableSearch(container) {
    const searchInput = document.querySelector('.contacts-search');

    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase();

        container.querySelectorAll('.contact').forEach(contact => {
            const title = contact.dataset.title;
            contact.style.display = title.includes(value) ? 'grid' : 'none';
        });
    });
}

function enableContactClicks(container) {
    container.addEventListener('click', (e) => {
        const contact = e.target.closest('.contact');
        if (!contact) return;

        displayChat(contact.dataset.id);
    });
}