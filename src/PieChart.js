import database from "./firebase.js"
import { Doughnut } from 'vue-chartjs'
//const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  //mixins: [reactiveProp],
  data: function () {
    return {
      ratings: 0,
      responsive: true,
      datacollection: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#CDB38B",
              "#FCD59C",
              "#CD6839",
              "#E2DDB5",

              "#CDC9A5",
              "#BAAF07",
              "#DBDB70",
              "#4F4F2F",
              
              "#A2C257",
              "#D4ED91",
              "#F4F776",
              "#615E3F",

              "#F0E68C",
              "#CDC9A5",
              "#C6C3B5",
              "#E8C782"              
            ] // chose 16 colours - 16 faculties in NUS in total.
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Faculties",
          padding: 5
        },
        legend: {
          display: false
        },
        animation: {
          animateRotate: true
        } 
      }
    }
  },
  props: ['semester', 'code', 'years'],
  methods: {
    fetchItems: function () {
      database.firebase_data.collection('reviews').get().then(querySnapShot => {
        var faculties = new Object()
        var display = false
        querySnapShot.forEach(doc => {
          // console.log(doc.data())
          var sem = doc.data().detailsForm.selectedSemester
          var modCode = doc.data().module_code
          var yr = doc.data().detailsForm.selectedYear
          if ((isNaN(sem) ? sem.includes("Semester " + (this.semester + 1)) : sem == this.semester) && modCode == this.code && this.years.includes(yr)) {
            display = true
            var fac = doc.data().detailsForm.selectedFaculty
            if (!Object.prototype.hasOwnProperty.call(faculties, fac)) {
              faculties[fac] = 1
            } else {
              faculties[fac] += 1
            }
          }
        })
        Object.entries(faculties).forEach(([key, value]) => {
          this.datacollection.labels.push(key)
          this.datacollection.datasets[0].data.push(value)
        })
        if (display) this.renderChart(this.datacollection, this.options)
      })

    }
  },
  created() {
    this.fetchItems()
  },
  watch: {
    years: function () {
      this.datacollection.datasets[0].data = []
      this.options.animation.animateRotate = false
      this.fetchItems()
    }
  }
}