import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDs7OJWPuoMXIXXBe2OVXAxT22JETympo8",
  authDomain: "clothing-e-commerce-fda02.firebaseapp.com",
  databaseURL: "https://clothing-e-commerce-fda02.firebaseio.com",
  projectId: "clothing-e-commerce-fda02",
  storageBucket: "clothing-e-commerce-fda02.appspot.com",
  messagingSenderId: "163852036888",
  appId: "1:163852036888:web:f9d851223d7631701f0c6d",
  measurementId: "G-8P9YP110BJ",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

//This gives us access to the new google auth provider class from the authentication library

provider.setCustomParameters({ prompt: "select_account" });

//We want to always trigger the google pop-up whenever we use this google auth provider for authentication and sign-in

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
