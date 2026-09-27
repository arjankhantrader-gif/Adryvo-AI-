// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVyzcpklnT0hRqTS128nKL",
    authDomain: "adryvo.firebaseapp.com",
    projectId: "adryvo",
    storageBucket: "adryvo.firebasestorage.app",
    messagingSenderId: "814950964069",
    appId: "1:814950964069:web:9609bcaecab4f7cdd95f8c",
    measurementId: "G-MMVMJINQ7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const homeScreen = document.getElementById('home-screen');
const loginScreen = document.getElementById('login-screen');
const signupScreen = document.getElementById('signup-screen');
const dashboardScreen = document.getElementById('dashboard-screen');

// Screen Navigation Functions
window.showAuth = function(type) {
    homeScreen.style.display = 'none';
    dashboardScreen.style.display = 'none';
    if (type === 'login') {
        loginScreen.style.display = 'block';
        signupScreen.style.display = 'none';
    } else {
        loginScreen.style.display = 'none';
        signupScreen.style.display = 'block';
    }
};

window.showHome = function() {
    homeScreen.style.display = 'block';
    loginScreen.style.display = 'none';
    signupScreen.style.display = 'none';
    dashboardScreen.style.display = 'none';
};

window.showDashboard = function() {
    homeScreen.style.display = 'none';
    loginScreen.style.display = 'none';
    signupScreen.style.display = 'none';
    dashboardScreen.style.display = 'block';
};

// Firebase Auth Functions
window.handleSignUp = function() {
    const email = document.getElementById('signup-email').value;
    const pass = document.getElementById('signup-pass').value;
    if(!email || !pass) {
        alert("Please fill all fields");
        return;
    }
    createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            alert("Sign up successful!");
            window.showDashboard();
        })
        .catch((error) => {
            alert(error.message);
        });
};

window.handleLogin = function() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    if(!email || !pass) {
        alert("Please fill all fields");
        return;
    }
    signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            alert("Login successful!");
            window.showDashboard();
        })
        .catch((error) => {
            alert(error.message);
        });
};

window.handleLogout = function() {
    signOut(auth).then(() => {
        window.showHome();
    }).catch((error) => {
        alert(error.message);
    });
};

// Check user state on load
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.showDashboard();
    }
});
