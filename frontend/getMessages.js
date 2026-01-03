import { displayChat } from "./displayChat.js";

export async function getMessages(conversationId) {
    const res = await fetch(
        `http://localhost:5000/api/messages/${conversationId}`
    );
    const messages = await res.json();

    displayChat(messages);
}