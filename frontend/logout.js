import { clearCurrentUser } from "./authState.js";
import { socket } from "./socket.js";

export function logout() {
    const logoutButton = document.querySelector('.logout-button');
    if (!logoutButton) return;

    clearCurrentUser();

    document.querySelector('.main').style.display = 'none';

    document.querySelector('.login-screen').style.display = 'flex';

    document.querySelector('.contacts-container').innerHTML = '';
    document.querySelector('.chat-container').innerHTML = '<div class="chat-placeholder-container"><div class="chat-placeholder">Pick a contact</div></div>';

    document.querySelector('.username').value = '';
    document.querySelector('.password').value = '';
    socket.disconnect();
}