import { setCurrentUser } from "./authState.js";

export function initLogin(onLoginSuccess) {
    document.querySelector('.login-screen').style.display = 'flex';
    document.querySelector('.main').style.display = 'none';
    const loginButton = document.querySelector('.login-button');

    loginButton.addEventListener('click', async () => {
        const username = document.querySelector('.username').value;
        const password = document.querySelector('.password').value;
        const errorElement = document.querySelector('.login-error');

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            });

            if (!res.ok) {
                errorElement.textContent = 'Invalid username or password';
                return;
            }

            const user = await res.json();

            setCurrentUser(user);
            
            document.querySelector('.login-screen').style.display = 'none';
            document.querySelector('.main').style.display = 'grid';

            onLoginSuccess(user);

        }   catch (err) {
            errorElement.textContent = 'Server error';
        }
    });
}


