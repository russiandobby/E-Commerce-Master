import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC8OlRKsbdcRrOLvgKNhfn5dZ4Af564Lyk",
    authDomain: "e-store-b69d6.firebaseapp.com",
    databaseURL: "https://e-store-b69d6.firebaseio.com",
    projectId: "e-store-b69d6",
    storageBucket: "e-store-b69d6.appspot.com",
    messagingSenderId: "15150721443",
    appId: "1:15150721443:web:61686bc3659c18b1519216",
    measurementId: "G-0EMB3E1YB1"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
//   We want to trigger google pop up when ever we use this auth
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle =()=> auth.signInWithPopup(provider);
  
  export default firebase;