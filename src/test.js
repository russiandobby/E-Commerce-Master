import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();
firestore.collection('users').doc('zEL85mcBrCBfkkQxa2Gt').collection('cartItems');
// or
firestore.doc('/users/zEL85mcBrCBfkkQxa2Gt/cartItems/NmGcqYNNqVSrW0fd4ARa');
// or
firestore.doc('/users/zEL85mcBrCBfkkQxa2Gt/cartItems');