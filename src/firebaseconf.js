import firebase from 'firebase/app'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBL0CNfFfe_4x1hEtk3IJvZxCBHzAtVLp8",
  authDomain: "proyectofirebase-536e3.firebaseapp.com",
  projectId: "proyectofirebase-536e3",
  storageBucket: "proyectofirebase-536e3.appspot.com",
  messagingSenderId: "330616681490",
  appId: "1:330616681490:web:6451660206c757b7e694cb",
  measurementId: "G-FFKDBMB2YK"
};
  // Initialize Firebase
 const fire = firebase.initializeApp(firebaseConfig);
 const DBstore = fire.firestore()
 export {DBstore}