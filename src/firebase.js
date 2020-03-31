import firebase from 'firebase';
import 'firebase/firestore';

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
  async getModuleReviews() {
    var promise = new Promise(resolve => {
      let list = []
      database.firebase_data.collection('reviews').onSnapshot(snapshot => {
        let item = {}
        snapshot.forEach(doc => {
          item = doc.data()
          item.id = doc.id
          list.push(item)
        })
      })
      resolve(list)
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
  // async getFaculties() {
  //   var promise = new Promise(resolve => {
  //     let list = []
  //     database.firebase_data.collection('faculties').onSnapshot(snapshot => {
  //       let item = {}
  //       snapshot.forEach(doc => {
  //         item = doc.data()
  //         item.id = doc.id
  //         list.push(item)
  //       })
  //     })
  //     resolve(list)
  //   })
  //   return promise
  // },



  //==================Use methods from here onwards==========================//

  //=====================================//
  //----------- addModuleResults---------//
  //=====================================//
  async addModuleResults(module_result){ //input must have grade, module, sem, year, SU
    var result = module_result
    var promise = new Promise(resolve =>{
      database.getUser().then(user =>{
        database.firebase_data.collection('students').doc(user)
        .get().then(userData =>{
          var user_ = userData.data()
          //check if module is added
          database.firebase_data.collection('module_grades')
          .where('module' ,"==",result.selectedModule)
          .where('studentID', '==', user)
          .get().then(snapshot =>{
            if(snapshot.empty){
              //add module_results
              database.firebase_data.collection('module_grades').add({
                SU: false,
                attribute: result.selectedModule.slice(0,2),
                course: user_.course,
                faculty: user_.faculty,
                grade: result.selectedGrade,
                module: result.selectedModule,
                sem: 1,
                studentID: user,
                year: 2019
              })
              //update student overall cap, modules taken, attributes, cap per semester
              //update faculty attributes and number of students taken
              resolve(snapshot.empty)
            } else {
              resolve(snapshot.empty)
            }
          })   
        })
      })
    })
    return promise
  },

  //=====================================//
  //----------- getModuleReview----------//
  //=====================================//
  async getModuleReviewID(module_){
    var promise = new Promise(function(resolve) {
      var reviews = []
      database.firebase_data.collection("reviews")
      .where("module_code", "==", module_)
      .get().then(function(snapshot) {
        snapshot.forEach(doc =>{
          reviews.push(doc.id)
        })
        resolve(reviews)

      });
    })
    return promise
  },

  //=====================================//
  //----------- getUserReview----------//
  //=====================================//
  async getUserReviewID(user){
    var promise = new Promise(function(resolve) {
      var reviews = []
      database.firebase_data.collection("reviews")
      .where("userid", "==", user)
      .get().then(function(snapshot) {
        snapshot.forEach(doc =>{
          reviews.push(doc.id)
        })
        resolve(reviews)
      });
    })
    return promise
  },

  //=====================================//
  //----------- getStudentInfo-----------//
  //=====================================//
  getStudentInfo(){
    var promise = new Promise(function(resolve){
      //get student information
      database.firebase_data.collection("students").doc(database.user)
      .onSnapshot(function(user){ 
        var userData = user.data()
        var result = {
          name: userData.name,
          faculty: userData.faculty,
          dept: userData.dept,
          course: userData.course,
          modules: userData.modules_taken,
          sap_by_sem: userData.sap_by_sem,
          overall_cap: userData.overall_cap
        }
        resolve(result)
      })
    })
    return promise
  },

  // async getGrades() {
  //   var promise = new Promise(resolve => {
  //     let list = []
  //     database.firebase_data.collection('grades').orderBy('id').onSnapshot(snapshot => {
  //       let item = {}
  //       snapshot.forEach(doc => {
  //         item = doc.data()
  //         item.id = doc.id
  //         list.push(item)
  //       })
  //     })
  //     resolve(list)

  //   })
  //   return promise
  // },
  // async getYears() {
  //   var promise = new Promise(resolve => {
  //     let list = []
  //     database.firebase_data.collection('years').orderBy('id').onSnapshot(snapshot => {
  //       let item = {}
  //       snapshot.forEach(doc => {
  //         item = doc.data()
  //         item.id = doc.id
  //         list.push(item)
  //       })
  //     })
  //     resolve(list)

  //   })
  //   return promise
  // },
  // async getSemesters() {
  //   var promise = new Promise(resolve => {
  //     let list = []
  //     database.firebase_data.collection('semesters').orderBy('id').onSnapshot(snapshot => {
  //       let item = {}
  //       snapshot.forEach(doc => {
  //         item = doc.data()
  //         item.id = doc.id
  //         list.push(item)
  //       })
  //     })
  //     resolve(list)

  //   })
  //   return promise
  // },


  //=====================================//
  //----------- getModules---------------//
  //=====================================//
  async getModules(module){
    var promise = new Promise(resolve => {
      database.firebase_data.collection("modules")
      .doc(module)
      .get()
      .then(doc => {
        resolve(doc.data())
      })
    })
    return promise
  },

  //=====================================//
  //----------- ifAddedModule------------//
  //=====================================//
  async ifAddedModule(module,user){
    var promise = new Promise(resolve =>{
      database.firebase_data.collection("module_grades")
      .where("studentID", "==", user)
      .where("module", "==", module)
      .get().then(snapshot =>{
        snapshot.forEach(doc =>{
          if (doc){
            resolve(doc.data())
          } else {
            resolve(null)
          }
        })
      })
    })
    return promise

  }



  //=====================================//
  //----------- setStudentModule-----------//
  //=====================================//
  // in progress
  //setModuleResults(moduleCode, su, grade, sem, year, teacher) {
    //set into module_grades
    //update student overall cap
    //update semester cap
    //update student attributes
    // set module attribute

    // 
  //}
    // database.firebase_data.collection("module_grades").where("studentID","==",database.user)
  // .get().then(function(snapshot){
  //   var grades = []
  //   snapshot.forEach(function(module_grade_){
  //     grades.push(module_grade_.data())
  //   })
  //   result.modules = grades
  //   resolve(result)
  // })
//   calculateGrade(grade){
//     if (grade == "A+" || grade == "A"){
//         return 5
//     } else if (grade == "A-"){
//         return 4.5
//     } else if (grade == "B+"){
//         return 4
//     } else if (grade == "B"){
//         return 3.5
//     } else if (grade == "B-"){
//         return 3
//     } else if (grade == "C+"){
//         return 2.5
//     } else if (grade == "C"){
//         return 2
//     } else if (grade == "D+"){
//         return 1.5
//     } else if (grade == "D"){
//         return 1
//     } else if (grade == "F"){
//         return 0
//     }
// },

}

export default database;





//===============ARCHIVED=============================//


  //=====================================//
  //----------- getModuleDetails---------//
  //=====================================//
  // this function will be replaced with a query from NUSmods if possible
  // getModuleDetails(module) {
  //   var promise = new Promise(function(resolve){
  //     //query for all data
  //     database.firebase_data.collection("modules").doc(module)
  //     .get().then(function(doc){
  //       var data = doc.data()
  //       //setting object to return and querying all fields except semesterData
  //       var result = {
  //         moduleCode: data.code,
  //         title: data.title,
  //         description: data.description,
  //         moduleCredit: data.credit,
  //         department: data.dept,
  //         faculty: data.faculty,
  //         workload: data.workload,
  //         prerequisite: data.pre_req, //modules are string format with ',' separating; can use the string.split()
  //         preclusion: data.pre_clu, //modules are string format with ',' separating; can use the string.split()
  //         semesterData:  []
  //       }
  //       //querying semester1 Data
  //       database.firebase_data.collection("modules").doc(module).collection("sem_1")
  //       .get().then(function(snapshot){
  //         var list = []
  //         snapshot.forEach(function(doc){
  //           list.push(doc.data())
  //         })
  //         result.semesterData.push({semester_1: list})
  //       })
  //       //querying semester2 Data
  //       database.firebase_data.collection("modules").doc(module).collection("sem_2")
  //       .get().then(function(snapshot){
  //         var list = []
  //         snapshot.forEach(function(doc){
  //           list.push(doc.data())
  //         })
  //         result.semesterData.push({semester_2: list})
  //       })
  //       //returning result object to promise
  //       resolve(result)
  //     })
  //   })
  //   //returning promise object
  //   return promise
  // },
  
  //=====================================//
  //----------- getAllModules------------//
  //=====================================//
  // this function will be replaced with a query from NUSmods if possible
  // getAllModules(){
  //   // this query gets all the modules and their details so no need query for details again
  //   var promise = new Promise(function(resolve){
  //     var list = []
  //     database.firebase_data.collection("modules")
  //     .get().then(function(snapshot){
  //       snapshot.forEach(function(module){
  //         database.getModuleDetails(module.id).then(function(data){
  //           var mod = {}
  //           mod[module.id] = data
  //           list.push(mod)
  //         })
  //       })
  //       resolve(list)
  //     })
  //   })
  //   //returning promise object
  //   return promise
  // },
