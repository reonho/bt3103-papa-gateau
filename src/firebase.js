import firebase from 'firebase';
import 'firebase/firestore'

// for some reason cannot use CJ's config?

const firebaseConfig = {
    apiKey: "AIzaSyA0mKkrlysr2qlW2OpqLLol24O5LWc_WxQ",
    authDomain: "modeaux-13857.firebaseapp.com",
    databaseURL: "https://modeaux-13857.firebaseio.com",
    projectId: "modeaux-13857",
    storageBucket: "modeaux-13857.appspot.com",
    messagingSenderId: "289222405994",
    appId: "1:289222405994:web:a783f3cdb5044ab5a0ff13",
    measurementId: "G-R8TXP8D90D"
};

firebase.initializeApp(firebaseConfig);

var database = {
  
  // DONT USE METHODS HERE, use methods from below indication
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



  //==================Use methods from here onwards==========================//

  //=====================================//
  //----------- getModuleReview----------//
  //=====================================//
  //in progress
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
  // this function will be replaced with a query from NUSmods if possible
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
  // this function will be replaced with a query from NUSmods if possible
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
  },

  //=====================================//
  //----------- getStudentInfo-----------//
  //=====================================//
  getStudentInfo(){
    var promise = new Promise(function(resolve){
      //get user uid from authentication
      database.getUser().then(function(){
        //get student information
        database.firebase_data.collection("students").doc(database.user)
        .get().then(function(user){ 
          var userData = user.data()
          var result = {
            name: userData.name,
            faculty: null,
            dept: null,
            course: null,
            modules: userData.modules_taken,
            sap_by_sem: userData.sap_by_sem,
            overall_cap: userData.overall_cap
          }
          // comment this if using NUSmods api------------------------
          database.getCourseInfo(userData.course).then(function(course_info){ // will be replaced with nusmods api
            result.faculty = course_info.faculty
            result.dept = course_info.dept
            result.course = course_info.name
            resolve(result)
          })
          //--------------------------------------------------------
          //uncomment the following if using NUSmods api
          //resolve(result)
        })
      })
    })
    return promise
  },

  //=====================================//
  //----------- setStudentModule-----------//
  //=====================================//
  // in progress
    // database.firebase_data.collection("module_grades").where("studentID","==",database.user)
  // .get().then(function(snapshot){
  //   var grades = []
  //   snapshot.forEach(function(module_grade_){
  //     grades.push(module_grade_.data())
  //   })
  //   result.modules = grades
  //   resolve(result)
  // })





  //===========================================================================================//
  //=============The following functions assume that we are storing own module data============//
  //=============In the event that we cant get NUSMODS data, we will use the functions below===//
  //==================If not, we will delete the following functions below=====================//
  //===========================================================================================//




  //=====================================//
  //----------- getCourseInfo------------//
  //=====================================//
  getCourseInfo(course){ 
    var promise = new Promise(function(resolve){
      database.firebase_data.collection("courses").doc(course)
      .get().then(function(course_){
        var course_data = course_.data()
        var data = {
          dept: null,
          faculty: null,
          name: course_data.name
        }
        database.firebase_data.collection("faculties").doc(course_data.faculty)
        .get().then(function(faculty_){
          var faculty_data = faculty_.data()
          data.faculty = faculty_data.name
        })
        database.firebase_data.collection("departments").doc(course_data.dept)
        .get().then(function(dept_){
          var dept_data = dept_.data()
          data.dept = dept_data.name
          resolve(data)
        })
      })
    })
    return promise
  }


}

export default database;