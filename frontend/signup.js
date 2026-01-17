import { setCurrentUser } from "./authState.js";

export function initSignup(onLoginSuccess) {
    const loginScreen = document.querySelector('.login-screen');
    const mainScreen = document.querySelector('.main');
    const signupButton = document.querySelector('.signup-button');

    loginScreen.style.display = 'flex';
    mainScreen.style.display = 'none';

    const newSignupButton = signupButton.cloneNode(true);
    signupButton.replaceWith(newSignupButton);

    newSignupButton.addEventListener('click', async () => {
        const username = document.querySelector('.username').value;
        const password = document.querySelector('.password').value;
        const errorElement = document.querySelector('.login-error');

        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) {
                const errorData = await res.json();
                errorElement.textContent = errorData.error;
                return;
            }

            const user = await res.json();
            setCurrentUser(user);

            loginScreen.style.display = 'none';
            mainScreen.style.display = 'grid';

            onLoginSuccess(user);
        } catch (err) {
            errorElement.textContent = 'Server error';
        }
    });
}

