import { setCurrentUser, getCurrentUser } from "./authState.js";
import { startApp } from "./app.js";

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
        exitLogin();
        startApp();
        
        document.querySelector('.login-screen').style.display = 'none';
        document.querySelector('.main').style.display = 'grid';
    }   catch (err) {
        errorElement.textContent = 'Server error';
    }
});

function exitLogin() {
    const savedUser = getCurrentUser();
    if (savedUser) {
        document.querySelector('.login-screen').style.display = 'none';
        document.querySelector('.main').style.display = 'grid';
    } else {
        document.querySelector('.login-screen').style.display = 'flex';
        document.querySelector('.main').style.display = 'none';
    }
}



if (getCurrentUser()) {
    exitLogin();
    startApp();
}

