importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const app = firebase.initializeApp({
    apiKey: "AIzaSyChPwi4C85V1YbNXkHdxaO1qJy0qQj1p1c",
    authDomain: "treinamento-fcm.firebaseapp.com",
    projectId: "treinamento-fcm",
    storageBucket: "treinamento-fcm.firebasestorage.app",
    messagingSenderId: "269396493527",
    appId: "1:269396493527:web:01f6c70e2eb411b46edc92",
})

const messaging = firebase.messaging(app);