import { addConversation } from "./addConversation.js";
import { logout } from "./logout.js";

export function initSidebar() {
    document.querySelector('.add-friend-button').addEventListener('click', () => {
        addConversation();
    });
    document.querySelector('.logout-button').addEventListener('click', () => {
        logout();
    });
}