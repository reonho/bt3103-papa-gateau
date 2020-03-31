firebase = require('firebase')

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
var database = firebase.firestore()

var faculties = [
  {
    id: 1,
    title: "Arts & Social Sciences"
  },
  {
    id: 2,
    title: "Business"
  },
  {
    id: 3,
    title: "Computing"
  },
  {
    id: 4,
    title: "Continuing and Lifelong Education"
  },
  {
    id: 5,
    title: "Dentistry"
  },
  {
    id: 6,
    title: "Design & Environment"
  },
  {
    id: 7,
    title: "Engineering"
  },
  {
    id: 8,
    title: "Interactive Sciences & Engineering"
  },
  {
    id: 9,
    title: "Law"
  },
  {
    id: 10,
    title: "Medicine"
  },
  {
    id: 11,
    title: "Music"
  },
  {
    id: 12,
    title: "Public Health"
  },
  {
    id: 13,
    title: "Public Policy"
  },
  {
    id: 14,
    title: "Science"
  }
]


var grades = [
  {
    id: 1,
    title: "A+"
  },
  {
    id: 2,
    title: "A"
  },
  {
    id: 3,
    title: "A-"
  },
  {
    id: 4,
    title: "B+"
  },
  {
    id: 5,
    title: "B"
  },
  {
    id: 6,
    title: "B-"
  },
  {
    id: 7,
    title: "C+"
  },
  {
    id: 8,
    title: "C"
  },
  {
    id: 9,
    title: "D+"
  },
  {
    id: 10,
    title: "D"
  },
  {
    id: 11,
    title: "F"
  },
  {
    id: 12,
    title: "S"
  },
  {
    id: 13,
    title: "U"
  }
]


var years = [
  {
    id: 1,
    title: 'AY1920'
  },
  {
    id: 2,
    title: 'AY1819'
  },
  {
    id: 3,
    title: 'AY1718'
  },
  {
    id: 4,
    title: 'AY1617'
  }

]

var semesters = [
  {
    id: 1,
    title: 'Semester 1'
  },
  {
    id: 2,
    title: 'Semester 2'
  },
  {
    id: 3,
    title: 'Special Term 1'
  },
  {
    id: 4,
    title: 'Special Term 2'
  }
]


// faculties.forEach(fac => {
//   database.collection('faculties').add({
//     id: fac.id,
//     title: fac.title

//   })

// })

// grades.forEach(g => {
//   database.collection('grades').add({
//     id: g.id,
//     title: g.title
//   })
// })

// years.forEach(y => {
//   database.collection('years').add({
//     id: y.id,
//     title: y.title
//   })
// })

// semesters.forEach(s => {
//   database.collection('semesters').add({
//     id: s.id,
//     title: s.title
//   })
// })

