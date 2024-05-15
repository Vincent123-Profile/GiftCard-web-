// signup.js

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDx9Q0iWX-EQpyLOA2n5OC2ia4NHT4VcHM",
    authDomain: "veexchage-p2.firebaseapp.com",
    projectId: "veexchage-p2",
    storageBucket: "veexchage-p2.appspot.com",
    messagingSenderId: "103489803359",
    appId: "1:103489803359:web:37ccc4fb3bd207cbd677ea",
    measurementId: "G-JCNH6ZTQ30"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.querySelector('form');
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Sign up the user with Firebase Authentication
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Save user details to Firebase Realtime Database
                firebase.database().ref('users/' + user.uid).set({
                    name: name,
                    email: email
                }).then(() => {
                    // Redirect to thank you page
                    window.location.href = 'Thanks.html';
                }).catch((error) => {
                    console.error('Error saving user to database:', error);
                });
            })
            .catch((error) => {
                console.error('Error signing up:', error);
            });
    });
});
