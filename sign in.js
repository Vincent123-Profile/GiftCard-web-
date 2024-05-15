// Firebase configuration
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
  
  // Handle sign-in form submission
  document.getElementById('sign-in-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('sign-in-email').value;
    const password = document.getElementById('sign-in-password').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
  
        // Send a successful sign-in email (this requires backend setup)
        // For demonstration, we'll log the action
        console.log("Sign-in successful. Sending email...");
  
        // Redirect to the dashboard
        window.location.href = "C:\Users\HP\Documents\Gift landing\Dashboard\Responsive Admin Dashboard - final";
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        alert(error.message);
      });
  });
  

  const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure the email transporter using Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

exports.sendSignInEmail = functions.auth.user().onLogin((user) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: user.email,
    subject: 'Sign-In Successful',
    text: `Hello ${user.displayName || ''},\n\nYou have successfully signed in.`
  };

  return transporter.sendMail(mailOptions)
    .then(() => {
      console.log('Sign-in email sent to:', user.email);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
});
