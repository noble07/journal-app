import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'


let firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}

// let firebaseConfigTesting = {
//   apiKey: "AIzaSyBNWna2cUwCJM3XSkG3yGcIumMCteiCs1I",
//   authDomain: "testing-react-52508.firebaseapp.com",
//   projectId: "testing-react-52508",
//   storageBucket: "testing-react-52508.appspot.com",
//   messagingSenderId: "198189140841",
//   appId: "1:198189140841:web:45449e129362f438e2cbf8"
// }

// if (process.env.NODE_ENV === 'test') {
//   // testing
//   firebase.initializeApp(firebaseConfigTesting);
// } else {
//   // dev/prod
//   firebase.initializeApp(firebaseConfig);
// }

firebase.initializeApp(firebaseConfig);

  // Initialize Firebase

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}