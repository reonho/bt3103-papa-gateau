import { HorizontalBar } from 'vue-chartjs'
import database from "./firebase.js"

export default {
  extends: HorizontalBar,
  props: ['semester'],
  data: function () {
    return {
      datacollection: {
        labels: ["5 star", "4 star", "3 star", "2 star", "1 star"],
        datasets: [
          {
            data: [],
            label: "Number of votes",
            backgroundColor: "rgba(255,99,132,0.5)"
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                display: true
              },
              gridLines: {
                display: true
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    }
  },
  methods: {
    fetchItems: function () {
      database.firebase_data.collection('reviews').get().then(querySnapShot => {
        var numbers = [0,0,0,0,0]
        var easy = [0,0,0,0,0]
        var manag = [0,0,0,0,0]
        var display = false
        querySnapShot.forEach(doc => {
          var sem = doc.data().detailsForm.selectedSemester
          if (sem.includes("Semester " + (this.semester + 1))) {
            display = true
            var rating = doc.data().commentForm.rating
            numbers[rating - 1] += 1

            var easiness = doc.data().commentForm.difficulty
            easy[easiness - 1] += 1

            var wkload = doc.data().commentForm.workload
            manag[wkload - 1] += 1
          }
        })
        
        this.datacollection.datasets[0].data = numbers.reverse()
        var sum = 0
        var numPpl = numbers.reduce((a, b) => a + b, 0)
        for (var i = 0; i < 5; i++) {
          sum += (numbers[i] * (5 - i))
        }
        var avg = Math.round((sum / numPpl + Number.EPSILON) * 100) / 100
        document.getElementById("avg").innerHTML = avg

        var esum = 0
        for (var s = 0; s < 5; s++) {
          esum += (easy[s] * (s + 1))
        }
        var eavg = Math.round((esum / numPpl + Number.EPSILON) * 100) / 100
        document.getElementById("easy").innerHTML = eavg

        var msum = 0
        for (var t = 0; t < 5; t++) {
          msum += (manag[t] * (t + 1))
        }
        var mavg = Math.round((msum / numPpl + Number.EPSILON) * 100) / 100
        document.getElementById("manageable").innerHTML = mavg

        this.avgRating = avg
        if (display) this.renderChart(this.datacollection, this.options)
        else {
          /*this.options.title.display = true
          this.options.title.text = "No Data"
          this.options.responsive = true
          this.renderChart(this.datacollection, this.options)*/
          // does not display anything unless title is set to not display up there
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