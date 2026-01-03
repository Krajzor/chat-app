let currentUser = null;

export function getCurrentUser() {
    if (!currentUser) {
        const stored = localStorage.getItem('user');
        if (stored) {
            currentUser = JSON.parse(stored);
        }
    }
    return currentUser;
}

export function setCurrentUser(user) {
    currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
}

export function clearCurrentUser() {
    currentUser = null;
    localStorage.removeItem('user');
}