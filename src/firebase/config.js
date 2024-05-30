//importing all firebase components from firebase/app
import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


//firebase config code copied from main firebase site..
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBAOTQwVR0u2NBtZXC8EbSiSxu9FO76R0",
    authDomain: "the-dojosite-58cba.firebaseapp.com",
    projectId: "the-dojosite-58cba",
    storageBucket: "the-dojosite-58cba.appspot.com",
    messagingSenderId: "44246982486",
    appId: "1:44246982486:web:5334a72f51de0ff38780f7",
    measurementId: "G-R9J1KCJ9GK"
};

//initialize
firebase.initializeApp(firebaseConfig)

//initializing firebase and authentication
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage=firebase.storage();

//timestamp
const timeStamp = firebase.firestore.Timestamp;

//exporting all constants so that they can be used in different parts of project
export { projectFirestore, projectAuth, projectStorage, timeStamp };

