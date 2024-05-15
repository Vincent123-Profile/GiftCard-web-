// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Handle sign-up form submission
document.getElementById('sign-up-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;

            // Save user details to the database
            database.ref('users/' + user.uid).set({
                name: name,
                email: email
            });

            // Send verification email
            user.sendEmailVerification()
                .then(() => {
                    console.log("Verification email sent.");
                }).catch((error) => {
                    console.error("Error sending verification email:", error);
                });

            // Update the user's profile with their name
            user.updateProfile({
                displayName: name
            }).then(() => {
                // Redirect to the thank you page
                window.location.href = "Thanks.html";
            }).catch((error) => {
                console.error("Error updating profile:", error);
            });
        })
        .catch((error) => {
            console.error("Error signing up:", error);
            alert(error.message);
        });
});