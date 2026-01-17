import { setCurrentUser } from "./authState.js";

export function initLogin(onLoginSuccess) {
    const loginScreen = document.querySelector('.login-screen');
    const mainScreen = document.querySelector('.main');
    const loginButton = document.querySelector('.login-button');

    loginScreen.style.display = 'flex';
    mainScreen.style.display = 'none';

    const newLoginButton = loginButton.cloneNode(true);
    loginButton.replaceWith(newLoginButton);

    newLoginButton.addEventListener('click', async () => {
        const username = document.querySelector('.username').value;
        const password = document.querySelector('.password').value;
        const errorElement = document.querySelector('.login-error');

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) {
                errorElement.textContent = 'Invalid username or password';
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



