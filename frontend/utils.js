export function scrollToBottom(page) {
    page.scrollTop = page.scrollHeight;
}

export function sentOrReceived(message, userId) {
    if (message.senderId === userId) {
        return 'sent';
    }
    return 'received';
}