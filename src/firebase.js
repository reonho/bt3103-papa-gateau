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
    var promise = new Promise(function(resolve){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          database.user = user.uid
          resolve(database.user)
        } else {
          database.user = null
          resolve(database.user)
        }
      })
    })
    return promise
  },
  login(email,password) {
    var promise = new Promise(function(resolve){
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        user => {
          database.user = user.uid
          resolve(true)
        },
        err => {
          resolve(err)
        }
      );
    })
    return promise
  },
  logout(){
    var promise = new Promise(function(resolve){
      firebase.auth().signOut().then(function(){
        resolve(true)
      })

    })
    return promise
  },
  getModuleReview(module_){
    database.data = null
    var promise = new Promise(function(resolve) {
      var doc_name = module_ + ".R"
      database.firebase_data.collection("reviews").doc(doc_name)
      .get().then(function(doc) {
        database.data = doc.data()
        resolve(database.data)
      });
    })
    return promise
  },
  getModules(){
    database.data = null
    var promise = new Promise(function(resolve) {
      database.firebase_data.collection("modules").doc()
      .get().then(function(doc) {
        database.data = doc.data()
        resolve(database.data)
      });
    })
    return promise
  },
  


}

export default database;