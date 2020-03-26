import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBQekFjlKoc6250PaDd3qnMDo6riT2Cv_I",
  authDomain: "papa-gateau-7f9ac.firebaseapp.com",
  databaseURL: "https://papa-gateau-7f9ac.firebaseio.com",
  projectId: "papa-gateau-7f9ac",
  storageBucket: "papa-gateau-7f9ac.appspot.com",
  messagingSenderId: "1092852574586",
  appId: "1:1092852574586:web:562d2097749c1d71348ec3",
  measurementId: "G-HFP31039H8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
