import { initLogin } from '/login.js';
import { getCurrentUser } from '/authState.js';
import { startApp } from '/app.js';
import { initSignup } from '/signup.js';

function initApp(){
    const user = getCurrentUser();
    if (user) {
        document.querySelector('.login-screen').style.display = 'none';
        document.querySelector('.main').style.display = 'grid';
        startApp(user);
    }  else {
        initLogin(startApp);
        initSignup(startApp);
    }

}

initApp();
