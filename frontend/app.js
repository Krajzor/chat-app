import { generateConversationsHTML } from './getConversations.js';
import { socket } from './socket.js';

export function startApp(user) {
    socket.auth = { userId: user.userId };
    socket.connect();

    generateConversationsHTML(user);
}