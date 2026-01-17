import { addConversation } from "/addConversation.js";
import { logout } from "/logout.js";

export function initSidebar() {
    const addFriendBtn = document.querySelector('.add-friend-button');
    const logoutBtn = document.querySelector('.logout-button');

    const newAddFriendBtn = addFriendBtn.cloneNode(true);
    const newLogoutBtn = logoutBtn.cloneNode(true);

    addFriendBtn.replaceWith(newAddFriendBtn);
    logoutBtn.replaceWith(newLogoutBtn);

    newAddFriendBtn.addEventListener('click', addConversation);
    newLogoutBtn.addEventListener('click', logout);
}