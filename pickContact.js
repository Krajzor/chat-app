import { contactInfo } from "./contact-info.js";

function generateContactsHTML(contactsToRender) {
    let contactsHTML = '';
    contactsToRender.forEach((contact) => {
        contactsHTML += `
            <div class="contact js-contact-${contact.id}" data-id="${contact.id}">
                <div class="contact-pfp-container"><img class="contact-pfp" src="./assets/pfps/${contact.pfp}"></div>
                <div>
                    <p class="contact-name-container">${contact.name}</p>
                    <p class="contact-last-message-container">Placeholder for now</p>
                </div>
                <div class="contact-last-seen-container">Placheholder</div>
            </div>
        `;
    });
    document.querySelector('.contacts-container').innerHTML = contactsHTML;

    const contacts = document.querySelectorAll('.contact');
    contacts.forEach((contact) => {
        contact.addEventListener('click', () => {
            console.log(contact.dataset.id);
        });
    });

} 

generateContactsHTML(contactInfo);

const searchInput = document.querySelector('.contacts-search');

searchInput.addEventListener('input', (e) => {
    const searchValue = searchInput.value.toLowerCase();
    const matchingContacts = contactInfo.filter((contact) => contact.name.toLowerCase().includes(searchValue));
    generateContactsHTML(matchingContacts);
});