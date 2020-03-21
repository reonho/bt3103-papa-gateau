import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAap-O2K4Pzkenjirw9S2Dw4ejG8kplyZA",
    authDomain: "papa-gateau.firebaseapp.com",
    databaseURL: "https://papa-gateau.firebaseio.com",
    projectId: "papa-gateau",
    storageBucket: "papa-gateau.appspot.com",
    messagingSenderId: "945138208035",
    appId: "1:945138208035:web:146ed078c96f9f09b81096",
    measurementId: "G-B09D9JVQ0B"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;