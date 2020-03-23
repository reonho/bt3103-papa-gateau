import firebase from 'firebase'

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

firebase.initializeApp(firebaseConfig)
// var database = firebase.firestore()
var database = {
  firebase_data: firebase.firestore(),

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

  async getFaculties() {
    var promise = new Promise(resolve => {
      let list = []
      database.firebase_data.collection('faculties').onSnapshot(snapshot => {
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
  async getGrades() {
    var promise = new Promise(resolve => {
      let list = []
      database.firebase_data.collection('grades').orderBy('id').onSnapshot(snapshot => {
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
  async getYears() {
    var promise = new Promise(resolve => {
      let list = []
      database.firebase_data.collection('years').orderBy('id').onSnapshot(snapshot => {
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
  async getSemesters() {
    var promise = new Promise(resolve => {
      let list = []
      database.firebase_data.collection('semesters').orderBy('id').onSnapshot(snapshot => {
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
  }
}


export default database;