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

// Get the auth object we get after using sign in and store in our database
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // All this will do is create the data/snapshoot

  // if we logout we get null
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  // const collectionRef = firestore.collection('users');
  // const collectionSnapshot = await collectionRef.get();

  // console.log({collection:collectionSnapshot.docs.map(doc => doc.data())});
  // we get back ether query reference or query snapshot
  // query ref object does not have actual data, gives details about it or method to get the Snapshot object

  if (!snapShot.exists) {
    // if it doesnt exist we want to create it there so use documentRef object
    const {
      displayName,
      email
    } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user', error.message);
    }

  }
  return userRef;

};

export const viewEmailMessage = () =>{
  const messageRef = firestore.collection('messages');
  const snapshot = messageRef.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});

  console.log('In fire store!');
  console.log(messageRef);
  console.log(snapshot);
}


export const addEmailMessage =({name, email, company, phone,message,date},callback)=>{
  
  firestore.collection("messages").add({
    name: name,
    company: email,
    email: company,
    phone: phone,
    message:message,
    date:date
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    callback(true);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
    callback(false);
});

}



export const addCollectionAndDocuments =async (collectionKey,objectsToAdd)=>{
  // create collection
  const collectionRef = firestore.collection(collectionKey);
  

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // in the collection make new document reference and make your own key
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef,obj);
  });
  // fire off batch, returns a promise
return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc=> {
    const {title,items} = doc.data();
    return {
      routeName:encodeURI(title.toLowerCase()),
      id:doc.id,
      title,
      items
    }
  });
 
  // pass in initial object
  // goes into new initial collection, first element
  return transformedCollection.reduce((accumulator,collection)=>{
    accumulator[collection.title.toLowerCase()]=collection;
    return accumulator;
  },{});
  
};

export const getCurrentUser = () => {
  return new Promise((resolve,reject) => {
    // onauthstatechanged takes a function where parameter is what user state is
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      console.log(userAuth);
      unsubscribe();
      resolve(userAuth);
    },reject)
  })
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
//   We want to trigger google pop up when ever we use this auth
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;