import { initSidebar } from '/sidebar.js';
import { generateContactsHTML } from '/getContacts.js';
import { socket } from '/socket.js';

export function startApp(user) {
    socket.auth = { userId: user.userId };
    socket.connect();

    generateContactsHTML(user);
    initSidebar();
}