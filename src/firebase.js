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

  getUserInfo(){
    var promise = new Promise(function(resolve) {
      firebase.auth().onAuthStateChanged(function(user){
        var doc_name = user.uid
        database.firebase_data.collection("students").doc(doc_name)
        .get().then(function(doc) {
          database.data = doc.data()
          resolve(database.data)
        });
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

  //=====================================//
  //----------- getModuleDetails---------//
  //=====================================//
  getModuleDetails(module) {
    var promise = new Promise(function(resolve){
      //query for all data
      database.firebase_data.collection("modules").doc(module)
      .get().then(function(doc){
        var data = doc.data()
        //setting object to return and querying all fields except semesterData
        var result = {
          moduleCode: data.code,
          title: data.title,
          description: data.description,
          moduleCredit: data.credit,
          department: data.dept,
          faculty: data.faculty,
          workload: data.workload,
          prerequisite: data.pre_req, //modules are string format with ',' separating; can use the string.split()
          preclusion: data.pre_clu, //modules are string format with ',' separating; can use the string.split()
          semesterData:  []
        }
        //querying semester1 Data
        database.firebase_data.collection("modules").doc(module).collection("sem_1")
        .get().then(function(snapshot){
          var list = []
          snapshot.forEach(function(doc){
            list.push(doc.data())
          })
          result.semesterData.push({semester_1: list})
        })
        //querying semester2 Data
        database.firebase_data.collection("modules").doc(module).collection("sem_2")
        .get().then(function(snapshot){
          var list = []
          snapshot.forEach(function(doc){
            list.push(doc.data())
          })
          result.semesterData.push({semester_2: list})
        })
        //returning result object to promise
        resolve(result)
      })
    })
    //returning promise object
    return promise
  },
  
  //=====================================//
  //----------- getAllModules------------//
  //=====================================//
  getAllModules(){
    // this query gets all the modules and their details so no need query for details again
    var promise = new Promise(function(resolve){
      var list = []
      database.firebase_data.collection("modules")
      .get().then(function(snapshot){
        snapshot.forEach(function(module){
          database.getModuleDetails(module.id).then(function(data){
            var mod = {}
            mod[module.id] = data
            list.push(mod)
          })
        })
        resolve(list)
      })
    })
    //returning promise object
    return promise
  }


}

export default database;