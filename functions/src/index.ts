/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import * as cors from "cors";

admin.initializeApp();

const corsHandler = cors({ origin: true });

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-email-password", // Replace with your email password
  },
});

export const sendSignInEmail = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    const { email } = req.body;

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Sign-In Successful",
      text: `Hello,\n\nYou have successfully signed in.`,
    };

    transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log("Sign-in email sent to:", email);
        res.status(200).send({ message: "Email sent" });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        res.status(500).send({ error: "Error sending email" });
      });
  });
});
