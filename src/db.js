const firebaseConfig = {
    apiKey: "AIzaSyAiRkHbiFCQwG9EF67qtJqSbHAlJbY_XvY",
    authDomain: "keep-clone-60509.firebaseapp.com",
    databaseURL: "https://keep-clone-60509-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "keep-clone-60509",
    storageBucket: "keep-clone-60509.appspot.com",
    messagingSenderId: "1072331783762",
    appId: "1:1072331783762:web:367efe49ab33e649cc298b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();