import { contactInfo } from './contact-info.js';
import { generateConversationsHTML } from './getConversations.js';
import { getCurrentUser } from './authState.js';

export function renderApp() {
    const currentUser = getCurrentUser();

     

    generateConversationsHTML(currentUser);

    const searchInput = document.querySelector('.contacts-search');

    searchInput.addEventListener('input', (e) => {
        const searchValue = searchInput.value.toLowerCase();
        const matchingContacts = contactInfo.filter((contact) => contact.name.toLowerCase().includes(searchValue));
        generateConversationsHTML(matchingContacts);
    });
}

