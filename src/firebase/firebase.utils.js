import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCuaFTg0iF4p7R1fDXGnVJRTLmcIxnHLnk',
  authDomain: 'talabat-mweb.firebaseapp.com',
  databaseURL: 'https://talabat-mweb.firebaseio.com',
  projectId: 'talabat-mweb',
  storageBucket: 'talabat-mweb.appspot.com',
  messagingSenderId: '967144306692',
  appId: '1:967144306692:web:d1c6d23b78532654'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('error creating user', error.message);
    }
  }

  return userRef;
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
