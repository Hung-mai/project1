import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyB3kbRMEynn-FhNPUAEjhjxax_NGucrWFw",
    authDomain: "project1-e683b.firebaseapp.com",
    databaseURL: "https://project1-e683b.firebaseio.com",
    projectId: "project1-e683b",
    storageBucket: "project1-e683b.appspot.com",
    messagingSenderId: "662741041287",
    appId: "1:662741041287:web:10724a8787a16c73beb822",
    measurementId: "G-82QBEGLVDF"
};


// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const firebaseApp = firebase.initializeApp(firebaseConfig);