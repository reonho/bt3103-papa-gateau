import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHfoVSLAYvW2SFO9FRftQ6c5EtV3w-g0g",
  authDomain: "modeaux-3089e.firebaseapp.com",
  databaseURL: "https://modeaux-3089e.firebaseio.com",
  projectId: "modeaux-3089e",
  storageBucket: "modeaux-3089e.appspot.com",
  messagingSenderId: "648954694353",
  appId: "1:648954694353:web:8a421abb78e90c8dd513f0"
};


console.log(process.env.VUE_APP_APIKEY)

firebase.initializeApp(firebaseConfig);

var database = {
  // DONT USE METHODS HERE, use methods from below indication
  firebase_data: firebase.firestore(),
  user: null,

  setUser(user) {
    this.user = user;
  },

  getUser() {
    var promise = new Promise(function (resolve) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          database.user = user.uid;
          resolve(database.user);
        } else {
          database.user = null;
          resolve(database.user);
        }
      });
    });
    return promise;
  },

  login(email, password) {
    var promise = new Promise(function(resolve, reject) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          var errorMessage = error.message;
          reject(errorMessage);
        })
        .then(
          (user) => {
            database.user = user.uid;

            resolve(true);
          },
          (err) => {
            resolve(err);
          }
        );
    });
    return promise;
  },

  convertCap(grade) {
    if (grade == "A" || grade == "A+") {
      return 5;
    } else if (grade == "A-") {
      return 4.5;
    } else if (grade == "B+") {
      return 4;
    } else if (grade == "B") {
      return 3.5;
    } else if (grade == "B-") {
      return 3;
    } else if (grade == "C+") {
      return 2.5;
    } else if (grade == "C") {
      return 2;
    } else if (grade == "D") {
      return 1;
    } else {
      return 0;
    }
  },

  logout() {
    var promise = new Promise(function (resolve) {
      firebase
        .auth()
        .signOut()
        .then(function () {
          resolve(true);
        });
    });
    return promise;
  },

  //==============================================ModuleResultsFunctions==============================================

  //=====================================//
  //----------- addModuleResults---------//
  //=====================================//
  async addModuleResults(module_result) {
    //input must have grade, module, sem, year, SU
    var result = module_result;
    var promise = new Promise((resolve, reject) => {
      database.getUser().then((user) => {
        database.firebase_data
          .collection("students")
          .doc(user)
          .get()
          .then((userData) => {
            var user_ = userData.data();
            //check if module is added
            database.firebase_data
              .collection("module_grades")
              .where("module", "==", result.selectedModule)
              .where("studentID", "==", user)
              .get()
              .then((snapshot) => {
                if (snapshot.empty) {
                  //check if module exists
                  database.firebase_data
                    .collection("modules")
                    .where("info.moduleCode", "==", result.selectedModule)
                    .get()
                    .then(snapshot_=>{
                      if (!snapshot_.empty){
                        var results = {
                          SU: result.selectedSU,
                          attribute: result.selectedModule.slice(0, 2),
                          course: user_.course,
                          faculty: user_.faculty,
                          grade: result.selectedGrade,
                          module: result.selectedModule,
                          sem: result.selectedSemester,
                          studentID: user,
                          year: result.selectedYear,
                        };
                        database.firebase_data
                          .collection("module_grades")
                          .add(results);
                        //update student overall cap, modules taken, attributes, cap per semester
                        database.updateStudentInfo();
                        //update faculty attributes and number of students taken
                        resolve("success");
                      } else {
                        reject("Not a valid module!")
                      }
                    })
                  //add module_results
                } else {
                  reject("module already taken!");
                }
              });
          });
      });
    });
    return promise;
  },

  //=====================================//
  //-------- updateModuleResults---------//
  //=====================================//
  //newModuleGrades is an object with sem, year, grade attributes to be updated
  async updateModuleResults(module_result) {
    var promise = new Promise((resolve, reject) => {
      database.getUser().then((user) => {
        database.firebase_data
          .collection("module_grades")
          .where("studentID", "==", user)
          .where("module", "==", module_result.selectedModule)
          .get()
          .then((snapshot) => {
            if (!snapshot.empty) {
              snapshot.forEach((doc) => {
                database.firebase_data
                  .collection("module_grades")
                  .doc(doc.id)
                  .update({
                    year: module_result.selectedYear,
                    sem: module_result.selectedSemester,
                    grade: module_result.selectedGrade,
                  });
                database.updateStudentInfo();
                resolve("Module Grade Updated!");
              });
            } else {
              reject("Module Grade not in database!");
            }
          });
      });
    });
    return promise;
  },

  //=====================================//
  //----------- getModuleResults -----//
  //=====================================//
  async getModuleResults() {
    //input must have grade, module, sem, year, SU
    var promise = new Promise((resolve) => {
      var modulelist = []
      database.getUser().then((user) => {
        //check if module is added
        database.firebase_data
          .collection("module_grades")
          .where("studentID", "==", user)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              modulelist.push(doc.data());
            });
            resolve(modulelist);
          });
      });
    });
    return promise;
  },
  //=====================================//
  //----------- deleteModuleResults -----//
  //=====================================//
  async deleteModuleResults(module_){
    var user = await database.getUser()
    var module_delete = await database.firebase_data
      .collection("module_grades")
      .where("studentID","==",user)
      .where("module",'==',module_)
      .get()
    var promise = new Promise((resolve,reject) =>{
      module_delete.forEach(doc=>{
        doc.ref.delete().then(e=>{
          database.updateStudentInfo()
          resolve(e)
        }).catch(e=>{
          reject(e)
        })
      })
    })
    return promise
  },

  //=====================================//
  //----------- ifAddedModule------------//
  //=====================================//
  async ifAddedModule(module, user) {
    var promise = new Promise((resolve) => {
      database.firebase_data
        .collection("module_grades")
        .where("studentID", "==", user)
        .where("module", "==", module)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              resolve(doc.data());
            });
          } else {
            resolve(null);
          }
        });
    });
    return promise;
  },


  //===========================================LandPageDashboardFunctions==============================================

  //=====================================//
  //----------- getCohortTopModules------//
  //=====================================//
  async getCohortTopModules(batch) {
    var students = await database.getCohortStudents(batch);
    console.log(students)
    var modules = [];
    var amt = [];
    for (var x in students){
      var mod_ = await database.getStudentModules(students[x])
      for (var y in mod_){
        var module_ = mod_[y]
        if (modules.includes(module_)) {
          var index = modules.indexOf(module_);
          amt[index] += 1;
        } else {
          modules.push(module_);
          amt.push(1);
        }
      }
    }
    return new Promise(resolve=>{
      resolve({module: modules, amount: amt})
    });
  },

  async getCohortStudents(batch){
    var promise = new Promise(resolve =>{
      var students = []
      database.firebase_data
      .collection("students")
      .where("batch","==", batch)
      .get()
      .then(snapshot=>{
        snapshot.forEach(result =>{
          students.push(result.id)
        })
        resolve(students)
      })
    })
    return promise
  },

  async getStudentModules(studentID){
    var modules = []
    var promise = new Promise(resolve=>{
      database.firebase_data
        .collection("module_grades")
        .where("studentID", "==", studentID)
        .get()
        .then(snapshot=>{
          snapshot.forEach(mod_=>{
            modules.push(mod_.data().module)
          })
          resolve(modules)
        })
    })
    return promise
  },

  //=====================================//
  //----------- getFacultyAttributes-----//
  //=====================================//
  async getFacultyAttributes(faculty) {
    var promise = new Promise((resolve) => {
      database.firebase_data
        .collection("module_grades")
        .where("faculty", "==", faculty)
        .get().then(snapshot=>{
          var attributes = []
          snapshot.forEach(doc=>{
            var grade_ = doc.data()
              if (grade_.SU == "No"){
                if (attributes.empty){
                  attributes.push({
                    amt: 1,
                    att: grade_.attribute,
                    grade : database.convertCap(grade_.grade)
                  })
                } else {
                  var flag = false
                  for (var att in attributes){
                    if (attributes[att].att == grade_.attribute){
                      flag = true
                      attributes[att].grade = (attributes[att].grade*attributes[att].amt + database.convertCap(grade_.grade))/
                        (attributes[att].amt + 1);
                      attributes[att].amt += 1
                      break;
                    }
                  }
                  if (!flag){
                    attributes.push({
                      amt: 1,
                      att: grade_.attribute,
                      grade : database.convertCap(grade_.grade)
                    })
                  }
                }
              }            
          })
          resolve(attributes)
        })
    });
    return promise;
  },

  //=====================================//
  //----------- getNUSAttributes-----//
  //=====================================//
  async getNUSAttributes() {
    var promise = new Promise((resolve) => {
      database.firebase_data
        .collection("module_grades")
        .get().then(snapshot=>{
          var attributes = []
          snapshot.forEach(doc=>{
            var grade_ = doc.data()
              if (grade_.SU == "No"){
                if (attributes.empty){
                  attributes.push({
                    amt: 1,
                    att: grade_.attribute,
                    grade : database.convertCap(grade_.grade)
                  })
                } else {
                  var flag = false
                  for (var att in attributes){
                    if (attributes[att].att == grade_.attribute){
                      flag = true
                      attributes[att].grade = (attributes[att].grade*attributes[att].amt + database.convertCap(grade_.grade))/
                        (attributes[att].amt + 1);
                      attributes[att].amt += 1
                      break;
                    }
                  }
                  if (!flag){
                    attributes.push({
                      amt: 1,
                      att: grade_.attribute,
                      grade : database.convertCap(grade_.grade)
                    })
                  }
                }
              }            
          })
          resolve(attributes)
        })
    });
    return promise;
  },

  //=====================================//
  //----------- getModuleReview----------//
  //=====================================//
  async getModuleReviewID(module_) {
    var promise = new Promise(function (resolve) {
      var reviews = [];
      database.firebase_data
        .collection("reviews")
        .where("module_code", "==", module_)
        .get()
        .then(function (snapshot) {
          snapshot.forEach((doc) => {
            reviews.push(doc.id);
          });
          resolve(reviews);
        });
    });
    return promise;
  },

  //=====================================//
  //----------- getUserReview----------//
  //=====================================//
  async getUserReviewID(user) {
    var promise = new Promise(function (resolve) {
      var reviews = [];
      database.firebase_data
        .collection("reviews")
        .where("userid", "==", user)
        .get()
        .then(function (snapshot) {
          snapshot.forEach((doc) => {
            reviews.push(doc.id);
          });
          resolve(reviews);
        });
    });
    return promise;
  },

  async getModuleReviews() {
    var promise = new Promise((resolve) => {
      let list = [];
      database.firebase_data.collection("reviews").onSnapshot((snapshot) => {
        let item = {};
        snapshot.forEach((doc) => {
          item = doc.data();
          item.id = doc.id;
          list.push(item);
        });
      });
      resolve(list);
    });
    return promise;
  },


  //===========================================Queries for student data==================================================

  //=====================================//
  //----------- getStudentInfo-----------//
  //=====================================//
  // For use in LandPage to update data in LandPage
  async getStudentInfo() {
    await database.updateStudentInfo()
    var promise = new Promise(function(resolve) {
      //get student information
      database.firebase_data
        .collection("students")
        .doc(database.user)
        .onSnapshot(function (user) {
          var userData = user.data();
          var result = {
            name: userData.name,
            faculty: userData.faculty,
            dept: userData.dept,
            course: userData.course,
            modules: userData.modules_taken,
            sap_by_sem: userData.sam_by_sem,
            overall_cap: userData.overall_cap,
            batch: userData.batch,
            attributes: userData.attributes
          };
          resolve(result);
        });
    });
    return promise;
  },

  async updateStudentInfo() {
    var student_att = await database.getStudentAttributes()
    var student_modTaken = await database.getStudentModulesTaken()
    var student_overallCap = await database.getStudentOverallCap()
    var student_samBySem = await database.getStudentSam_by_sem()
    var promise = new Promise(resolve =>{
      database.getUser().then(user =>{
        database.firebase_data
          .collection("students")
          .doc(user)
          .update({
            attributes: student_att,
            modules_taken: student_modTaken,
            overall_cap: student_overallCap,
            sam_by_sem: student_samBySem
          })
          resolve(true)
      })
    })
    return promise
  },
  //=====================================//
  //------- getStudentAttributes---------//
  //=====================================//
  async getStudentAttributes(){
    var promise = new Promise(resolve => {
      database.getUser().then(user =>{
        database.firebase_data.collection('module_grades')
        .where('studentID', '==', user)
        .get().then(snapshot =>{
          var attributes = []
          if (!snapshot.empty){
            snapshot.forEach(grade =>{
              var ModGrade = grade.data()
              if (ModGrade.SU == "No"){
                if (attributes.empty){
                  attributes.push({
                    amt: 1,
                    att: ModGrade.attribute,
                    grade : database.convertCap(ModGrade.grade)
                  })
                } else {
                  var flag = false
                  for (var att in attributes){
                    if (attributes[att].att == ModGrade.attribute){
                      flag = true
                      attributes[att].grade = (attributes[att].grade*attributes[att].amt + database.convertCap(ModGrade.grade))/
                        (attributes[att].amt + 1);
                      attributes[att].amt += 1
                      break;
                    }
                  }
                  if (!flag){
                    attributes.push({
                      amt: 1,
                      att: ModGrade.attribute,
                      grade : database.convertCap(ModGrade.grade)
                    })
                  }
                }
              }
            })
            resolve(attributes)
          }
        })
      })
    })
    return promise
  },
  //=====================================//
  //----- getStudentModulesTaken---------//
  //=====================================//
  async getStudentModulesTaken(){
    var promise = new Promise(resolve =>{
      database.getUser().then(user=>{
        database.firebase_data.collection('module_grades')
        .where('studentID','==',user)
        .get().then(snapshot=>{
          var completedMods = []
          if (!snapshot.empty){
            snapshot.forEach(grade=>{
              var ModGrade = grade.data()
              completedMods.push({
                SU: ModGrade.SU,
                module: ModGrade.module,
                sem: ModGrade.sem,
                year: ModGrade.year
              })
            })
          }
          resolve(completedMods)
        })
      })
    })
    return promise
  },
  //=====================================//
  //-------- getStudentOverallCap--------//
  //=====================================//
    async getStudentOverallCap(){
    var promise = new Promise(resolve =>{
      database.getUser().then(user=>{
        database.firebase_data.collection('module_grades')
        .where('studentID','==',user)
        .get().then(snapshot=>{
          var noOfModules = 0
          var totalCap = 0
          if (!snapshot.empty){
            snapshot.forEach(grade=>{
              var ModGrade = grade.data()
              if (ModGrade.SU == "No"){
                totalCap += database.convertCap(ModGrade.grade)
                noOfModules ++
              }
            })
          }
          resolve(totalCap/noOfModules)
        })
      })
    })
    return promise
  },
  //=====================================//
  //-------- getStudentSam_by_sem--------//
  //=====================================//
  async getStudentSam_by_sem(){
    var promise = new Promise(resolve =>{
      database.getUser().then(user=>{
        database.firebase_data.collection('module_grades')
        .where('studentID','==',user)
        .get().then(snapshot=>{
          var sam_by_sem = []
          if (!snapshot.empty){
            snapshot.forEach(grade=>{
              var ModGrade = grade.data()
              if (ModGrade.SU == "No"){
                if (sam_by_sem.empty){
                  sam_by_sem.push({
                    amt: 1,
                    cap: database.convertCap(ModGrade.grade),
                    sem: ModGrade.sem,
                    year: ModGrade.year
                  })
                } else {
                  var flag = false
                  for (var sem in sam_by_sem){
                    if (sam_by_sem[sem].year == ModGrade.year && sam_by_sem[sem].sem == ModGrade.sem){
                      flag = true
                      sam_by_sem[sem].cap = (sam_by_sem[sem].cap*sam_by_sem[sem].amt + database.convertCap(ModGrade.grade))/
                        (sam_by_sem[sem].amt + 1);
                      sam_by_sem[sem].amt ++
                      break;
                    }
                  }
                  if (!flag){
                    sam_by_sem.push({
                      amt: 1,
                      cap: database.convertCap(ModGrade.grade),
                      sem: ModGrade.sem,
                      year: ModGrade.year
                    })  
                  }
                }
              }
            })
          }
          resolve(sam_by_sem)
        })
      })
    })
    return promise
  },

  //=====================================//
  //----------- getModules---------------//
  //=====================================//
  async getModules(module) {
    var promise = new Promise((resolve) => {
      database.firebase_data
        .collection("modules")
        .doc(module)
        .get()
        .then((doc) => {
          resolve(doc.data());
        });
    });
    return promise;
  },

  //=====================================//
  //----------- getModuleAttributes-----//
  //=====================================//
  // async getModuleAttributes(module_) {
  //   var promise = new Promise((resolve) => {
  //     database.firebase_data
  //       .collection("module_grades")
  //       .where("module", "==", module_)
  //       .get().then(snapshot=>{
  //         var attributes = []
  //         snapshot.forEach(doc=>{
  //           var grade_ = doc.data()
  //             if (grade_.SU == "No"){
  //               if (attributes.empty){
  //                 attributes.push({
  //                   amt: 1,
  //                   att: grade_.attribute,
  //                   grade : database.convertCap(grade_.grade)
  //                 })
  //               } else {
  //                 var flag = false
  //                 for (var att in attributes){
  //                   if (attributes[att].att == grade_.attribute){
  //                     flag = true
  //                     attributes[att].grade = (attributes[att].grade*attributes[att].amt + database.convertCap(grade_.grade))/
  //                       (attributes[att].amt + 1);
  //                     attributes[att].amt += 1
  //                     break;
  //                   }
  //                 }
  //                 if (!flag){
  //                   attributes.push({
  //                     amt: 1,
  //                     att: grade_.attribute,
  //                     grade : database.convertCap(grade_.grade)
  //                   })
  //                 }
  //               }
  //             }            
  //         })
  //         resolve(attributes)
  //       })
  //   });
  //   return promise;
  // },

  //==============================================ModulePage and Review Page functions=====================================
  //=====================================//
  //----------- getFaculties-------------//
  //=====================================//
  async getFaculties() {
    var promise = new Promise((resolve) => {
      var faculties = [];
      database.firebase_data
        .collection("faculties")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            faculties.push(doc.data().name);
          });
          faculties.sort();
          resolve(faculties);
        });
    });
    return promise;
  },

  //=====================================//
  //----------- getAllModuleCodes--------//
  //=====================================//
  async getAllModuleCodes() {
    var promise = new Promise((resolve) => {
      var modules = [];
      database.firebase_data
        .collection("modules")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            modules.push(doc.id);
          });
          resolve(modules);
        });
    });
    return promise;
  },

  //=====================================//
  //----------- getCourses---------------//
  //=====================================//
  async getCourses() {
    var promise = new Promise((resolve) => {
      var courses = [];
      database.firebase_data
        .collection("courses")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            courses.push(doc.data().name);
          });
          resolve(courses);
        });
    });
    return promise;
  },

  //=====================================//
  //----------- ifAddedReview------------//
  //=====================================//

  async ifAddedReview(module, user) {
    var promise = new Promise(resolve => {
      database.firebase_data.collection("reviews")
        .where("userid", "==", user)
        .where("module_code", "==", module)
        .get().then(snapshot => {
          if (!snapshot.empty) {
            snapshot.forEach(doc => {
              resolve(doc.data())
            })
          } else {
            resolve(null)
          }
        })
    })
    return promise

  },

  //=====================================//
  //---------- getModuleAttributes-------//
  //=====================================//
  async getModuleAttributes(module_code) {
    var top_grades = ['A+', 'A']
    var top_attributes = [];
    var top_students = [];
    var attr_list = []
    var promise = new Promise(function (resolve) {
      database.firebase_data
        .collection("module_grades")
        .where("module", "==", module_code)
        .get().then(function (results) {
          if (results.empty) {
            resolve('no data')
          }
          results.forEach(function (r) {
            var rdata = r.data()
            if (top_grades.includes(rdata.grade)) {
              top_students.push({
                studentID: rdata.studentID,
                grade: rdata.grade
              })
            }

          })
          if (top_students.length === 0) {
            resolve('no data')
          }
          return top_students
        })
        .then(function (ts) {
          ts.forEach(function (s) {
            database.firebase_data
              .collection("students")
              .doc(s.studentID)
              .get()
              .then(function (user) {
                var attributes = user.data().attributes;
                attributes.forEach(function (attribute) {
                  var att = attribute.att.trim();
                  var grade = attribute.grade;
                  if (attr_list.includes(att)) {
                    var idx = attr_list.indexOf(att)
                    var old = top_attributes[idx]
                    old['total'] = old['total'] + grade
                    old['amt'] += 1
                    old['grade'] = old['total'] / old['amt']
                  } else {
                    attr_list.push(att)
                    top_attributes.push({ total: grade, amt: 1, att: att, grade: grade })
                  }
                });
              });
            resolve(top_attributes)
          })
        })
    })
    return promise
  },

  //=====================================//
  //----------- register-----------------//
  //=====================================//
  async register(email, password, name_, course_, enrolmentBatch) {
    var promise = new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(()=>{
          database.firebase_data
            .collection("departments")
            .where("courses", "array-contains", course_)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc_) => {
                var department = doc_.data().name;
                database.firebase_data
                  .collection("faculties")
                  .where("departments", "array-contains", department)
                  .get()
                  .then((snapshot) => {
                    snapshot.forEach((_doc_) => {
                      var faculty_ = _doc_.data().name;
                      database.getUser().then((doc) => {
                        database.firebase_data
                          .collection("students")
                          .doc(doc)
                          .set({
                            attributes: [],
                            batch: enrolmentBatch,
                            course: course_,
                            name: name_,
                            current_sem: {},
                            dept: department,
                            faculty: faculty_,
                            modules_taken: [],
                            overall_cap: 0,
                            sam_by_sem: [{}, {}, {}, {}, {}, {}, {}, {}],
                          });
                        resolve("account created!");
                      });
                    });
                  });
              });
            });
        })
        .catch(function (error) {
          var errorMessage = error.message;
          reject(errorMessage);
        });
    });
    return promise;
  },
};


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
//
  //=====================================//
  //----------- updateStudentInfo--------//
  //=====================================//
  //For use in addModuleModal to update the data in database
  // async updateStudentInfo() {
  //   //update overall cap
  //   database.firebase_data
  //     .collection("students")
  //     .doc(module_results.studentID)
  //     .get()
  //     .then((user) => {
  //       var cap = user.data().overall_cap;
  //       var mod_taken = user.data().modules_taken;
  //       var mod_counted = 0;
  //       var x;
  //       if (!mod_taken.empty) {
  //         for (x in mod_taken) {
  //           if (!mod_taken[x].SU) {
  //             mod_counted++;
  //           }
  //         }
  //         if (module_results.SU == "No") {
  //           database.firebase_data
  //             .collection("students")
  //             .doc(module_results.studentID)
  //             .update({
  //               overall_cap:
  //                 (cap * mod_counted +
  //                   database.convertCap(module_results.grade)) /
  //                 (mod_counted + 1),
  //             });
  //           //update attributes
  //           var att = user.data().attributes;
  //           var y;
  //           if (!att.empty) {
  //             var flag = false;
  //             for (y in att) {
  //               if (att[y].att == module_results.attribute) {
  //                 flag = true;
  //                 att[y].grade =
  //                   (att[y].grade * att[y].amt +
  //                     database.convertCap(module_results.grade)) /
  //                   (att[y].amt + 1);
  //                 att[y].amt += 1;
  //               }
  //             }
  //             if (!flag) {
  //               database.firebase_data
  //                 .collection("students")
  //                 .doc(module_results.studentID)
  //                 .update({
  //                   attributes: firebase.firestore.FieldValue.arrayUnion({
  //                     att: module_results.attribute,
  //                     amt: 1,
  //                     grade: database.convertCap(module_results.grade),
  //                   }),
  //                 });
  //             } else {
  //               database.firebase_data
  //                 .collection("students")
  //                 .doc(module_results.studentID)
  //                 .update({
  //                   attributes: att,
  //                 });
  //             }
  //           } else {
  //             database.firebase_data
  //               .collection("students")
  //               .doc(module_results.studentID)
  //               .update({
  //                 attributes: firebase.firestore.FieldValue.arrayUnion({
  //                   att: module_results.attribute,
  //                   amt: 1,
  //                   grade: database.convertCap(module_results.grade),
  //                 }),
  //               });
  //           }
  //         }
  //       } else {
  //         if (module_results.SU == "No") {
  //           database.firebase_data
  //             .collection("students")
  //             .doc(module_results.studentID)
  //             .update({
  //               overall_cap: database.convertCap(module_results.grade),
  //             });
  //           database.firebase_data
  //             .collection("students")
  //             .doc(module_results.studentID)
  //             .update({
  //               attributes: firebase.firestore.FieldValue.arrayUnion({
  //                 att: module_results.attribute,
  //                 amt: 1,
  //                 grade: database.convertCap(module_results.grade),
  //               }),
  //             });
  //         }
  //       }
  //       //addmodule into modules_taken
  //       var temp = null;
  //       if (module_results.SU == "No") {
  //         temp = false;
  //       } else {
  //         temp = true;
  //       }
  //       database.firebase_data
  //         .collection("students")
  //         .doc(module_results.studentID)
  //         .update({
  //           modules_taken: firebase.firestore.FieldValue.arrayUnion({
  //             SU: temp,
  //             module: module_results.module,
  //             sem: module_results.sem,
  //             year: module_results.year,
  //           }),
  //         });
  //       //update sam_by_sem
  //       if (module_results.SU == "No") {
  //         var arr = user.data().sam_by_sem;
  //         var z;
  //         var flag_ = 0;
  //         for (z in arr) {
  //           if (
  //             arr[z].year == module_results.year &&
  //             arr[z].sem == module_results.sem
  //           ) {
  //             flag_ = false;
  //             arr[z].cap =
  //               (arr[z].cap * arr[z].amt +
  //                 database.convertCap(module_results.grade)) /
  //               (arr[z].amt + 1);
  //             arr[z].amt += 1;
  //             break;
  //           } else if (arr[z].year == null) {
  //             flag_ = z;
  //             break;
  //           }
  //         }
  //         if (flag_) {
  //           arr[flag_] = {
  //             year: module_results.year,
  //             sem: module_results.sem,
  //             amt: 1,
  //             cap: database.convertCap(module_results.grade),
  //           };
  //         }
  //         database.firebase_data
  //           .collection("students")
  //           .doc(module_results.studentID)
  //           .update({
  //             sam_by_sem: arr,
  //           });
  //         //update current_sem
  //         var year = 0;
  //         var semester = 0;
  //         var total_sems = arr;
  //         for (var sem in total_sems) {
  //           if (total_sems[sem].year != null) {
  //             if (total_sems[sem].year > year) {
  //               year = total_sems[sem].year;
  //               semester = total_sems[sem].sem;
  //             } else if (
  //               total_sems[sem].year == year &&
  //               total_sems[sem].sem > semester
  //             ) {
  //               year = total_sems[sem].year;
  //               semester = total_sems[sem].sem;
  //             }
  //           } else if (total_sems[sem].year == null && sem != 0) {
  //             break;
  //           }
  //         }
  //         if (year != 0 && semester != 0) {
  //           var current_sem = {
  //             sem: semester,
  //             year: year,
  //           };
  //           database.firebase_data
  //             .collection("students")
  //             .doc(module_results.studentID)
  //             .update({
  //               current_sem: current_sem,
  //             });
  //         }
  //       }
  //       //update faculty attributes
  //       if (module_results.SU == "No") {
  //         database.firebase_data
  //           .collection("faculties")
  //           .where("name", "==", module_results.faculty)
  //           .get()
  //           .then((snapshot) => {
  //             snapshot.forEach((faculty) => {
  //               var attr = faculty.data().attributes;
  //               if (!attr.empty) {
  //                 var flag = false;
  //                 for (var x in attr) {
  //                   if (attr[x].att == module_results.attribute) {
  //                     attr[x].grade =
  //                       (attr[x].grade * attr[x].amt +
  //                         database.convertCap(module_results.grade)) /
  //                       (attr[x].amt + 1);
  //                     attr[x].amt += 1;
  //                   }
  //                 }
  //                 if (!flag) {
  //                   attr.push({
  //                     att: module_results.attribute,
  //                     amt: 1,
  //                     grade: database.convertCap(module_results.grade),
  //                   });
  //                 }
  //               } else {
  //                 attr.push({
  //                   att: module_results.attribute,
  //                   amt: 1,
  //                   grade: database.convertCap(module_results.grade),
  //                 });
  //               }
  //               database.firebase_data
  //                 .collection("faculties")
  //                 .doc(faculty.id)
  //                 .update({
  //                   attributes: attr,
  //                 });
  //             });
  //           });
  //       }
  //     });
  // },
