import { getCurrentUser } from "./authState.js";
import { generateContactsHTML } from "./getContacts.js";
import { displayChat } from "./displayChat.js";

export async function addConversation() {
    const username = prompt('Enter username');
    if (!username) return;

    const currentUser = getCurrentUser();

    try {
        const res = await fetch('http://localhost:5000/api/conversations', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fromUserId: currentUser.userId,
                toUsername: username
            })
        });

        if (!res.ok) {
            const err = await res.json();
            alert(err.error || 'User not found or conversation already exists');
            return;
        }

        const conversation = await res.json();

        await generateContactsHTML(currentUser);
        displayChat(conversation._id);

    } catch (err) {
        console.log(err);
        alert('Server error. Try again.');
    }
}
