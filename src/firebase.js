import firebase from 'firebase';
import 'firebase/firestore'

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
var database = {
  firebase_data: firebase.firestore(),
  user: null,
  data: null,
  setUser (user) {
    this.user = user
  },
  getUser(){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          database.user = user.uid
        } else {
          database.user = null
        }
    })
    return database.user
  },
  login(email,password) {
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(
      user => {
        this.user = user.uid
      },
      err => {
        console.log(err)
      }
    );
  },
  logout(){
    firebase.auth().signOut()
  },
  getModuleReview(module_){
    var doc_name = module_ + ".R"
    database.firebase_data.collection("reviews").doc(doc_name)
    .get().then(function(doc) {
      database.data = doc
      
    });
    return database.data
  }


}

export default database;