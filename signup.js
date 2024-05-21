// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDx9Q0iWX-EQpyLOA2n5OC2ia4NHT4VcHM",
    authDomain: "veexchage-p2.firebaseapp.com",
    databaseURL: "https://veexchage-p2-default-rtdb.firebaseio.com",
    projectId: "veexchage-p2",
    storageBucket: "veexchage-p2.appspot.com",
    messagingSenderId: "103489803359",
    appId: "1:103489803359:web:37ccc4fb3bd207cbd677ea",
    measurementId: "G-JCNH6ZTQ30"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    const signUpForm = document.getElementById('signUpForm');
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log("Form submitted:", { name, email, password });

        // Sign up the user with Firebase Authentication
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("User signed up:", userCredential);
                const user = userCredential.user;

                // Save user details to Firebase Realtime Database
                firebase.database().ref('users/' + user.uid).set({
                    name: name,
                    email: email
                }).then(() => {
                    console.log("User data saved to database");
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
