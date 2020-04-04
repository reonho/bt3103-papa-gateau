import database from "./firebase.js"
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(200, 125, 73)",
              "rgb(180, 110, 100)",
              "rgb(30, 78, 190)",
              "rgb(50, 100, 78)"
            ]
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
        }
      }
    }
  },
  props: ['semester'],
  methods: {
    fetchItems: function () {
      database.firebase_data.collection('reviews').get().then(querySnapShot => {
        var faculties = new Object()
        var display = false
        querySnapShot.forEach(doc => {
          console.log(doc.data())
          var sem = doc.data().detailsForm.selectedSemester
          if (sem.includes("Semester " + (this.semester + 1))) {
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
        document.getElementById("ratings").innerHTML = this.datacollection.datasets[0].data.reduce((a, b) => a + b, 0)
        if (display) this.renderChart(this.datacollection, this.options)
        else {
          this.options.title.text = "No Data"
          this.options.responsive = true
          this.renderChart(this.datacollection, this.options)
        }
      })
    }
  },
  created() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.fetchItems()
  }
}