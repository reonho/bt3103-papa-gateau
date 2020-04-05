import { HorizontalBar } from 'vue-chartjs'
import database from "./firebase.js"

export default {
  extends: HorizontalBar,
  props: ['semester', 'code'],
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
    numWholeStars(n) {
      return Math.floor(n);
    },
    numHalfStars(n) {
      if (n % 1 >= 0.5) {
        return 1;
      } else return 0
    },
    fetchItems: function () {
      database.firebase_data.collection('reviews').get().then(querySnapShot => {
        var numbers = [0,0,0,0,0]
        var easy = [0,0,0,0,0]
        var manag = [0,0,0,0,0]
        var eman = [0,0,0,0,0]
        var display = false
        querySnapShot.forEach(doc => {
          var sem = doc.data().detailsForm.selectedSemester
          var modCode = doc.data().module_code
          if ((isNaN(sem) ? sem.includes("Semester " + (this.semester + 1)) : sem == this.semester) && modCode == this.code) {
            display = true
            var rating = doc.data().commentForm.rating
            numbers[rating - 1] += 1

            var easiness = doc.data().commentForm.difficulty
            easy[easiness - 1] += 1

            var wkload = doc.data().commentForm.workload
            manag[wkload - 1] += 1

            var exam = doc.data().tutorialForm.exam
            eman[exam - 1] += 1
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
      
        var ele = document.getElementById("avg_gold_stars")
        var ele1 = document.getElementById("avg_grey_stars")

        for (var x = 0; x < this.numWholeStars(avg); x++) {
          let star = document.createElement("i")
          star.className = "fa fa-star"
          ele.appendChild(star)
        }

        for (var z = 0; z < this.numHalfStars(avg); z++) {
          let hstar = document.createElement("i")
          hstar.className = "fas fa-star-half-alt"
          ele.appendChild(hstar)
        }

        for (var y = 0; y < (5 - this.numWholeStars(avg) - this.numHalfStars(avg)); y++) {
          let gstar = document.createElement("i")
          gstar.className = "fa fa-star"
          ele1.appendChild(gstar)
        }

        var esum = 0
        for (var s = 0; s < 5; s++) {
          esum += (easy[s] * (s + 1))
        }
        var eavg = Math.round((esum / numPpl + Number.EPSILON) * 100) / 100
        document.getElementById("easy").innerHTML = eavg

        var ele2 = document.getElementById("easy_gold_stars")
        var ele3 = document.getElementById("easy_grey_stars")

        for (x = 0; x < this.numWholeStars(eavg); x++) {
          let star = document.createElement("i")
          star.className = "fa fa-star"
          ele2.appendChild(star)
        }

        for (z = 0; z < this.numHalfStars(eavg); z++) {
          let hstar = document.createElement("i")
          hstar.className = "fas fa-star-half-alt"
          ele2.appendChild(hstar)
        }

        for (y = 0; y < (5 - this.numWholeStars(eavg) - this.numHalfStars(eavg)); y++) {
          let gstar = document.createElement("i")
          gstar.className = "fa fa-star"
          ele3.appendChild(gstar)
        }

        var msum = 0
        for (var t = 0; t < 5; t++) {
          msum += (manag[t] * (t + 1))
        }
        var mavg = Math.round((msum / numPpl + Number.EPSILON) * 100) / 100
        document.getElementById("manageable").innerHTML = mavg

        var ele4 = document.getElementById("man_gold_stars")
        var ele5 = document.getElementById("man_grey_stars")

        for (x = 0; x < this.numWholeStars(mavg); x++) {
          let star = document.createElement("i")
          star.className = "fa fa-star"
          ele4.appendChild(star)
        }

        for (z = 0; z < this.numHalfStars(mavg); z++) {
          let hstar = document.createElement("i")
          hstar.className = "fas fa-star-half-alt"
          ele4.appendChild(hstar)
        }

        for (y = 0; y < (5 - this.numWholeStars(mavg) - this.numHalfStars(mavg)); y++) {
          let gstar = document.createElement("i")
          gstar.className = "fa fa-star"
          ele5.appendChild(gstar)
        }

        var exsum = 0
        for (t = 0; t < 5; t++) {
          exsum += (eman[t] * (t + 1))
        }
        var exavg = Math.round((exsum / numPpl + Number.EPSILON) * 100) / 100
        document.getElementById("exam").innerHTML = exavg

        var ele6 = document.getElementById("exam_gold_stars")
        var ele7 = document.getElementById("exam_grey_stars")

        for (x = 0; x < this.numWholeStars(exavg); x++) {
          let star = document.createElement("i")
          star.className = "fa fa-star"
          ele6.appendChild(star)
        }

        for (z = 0; z < this.numHalfStars(exavg); z++) {
          let hstar = document.createElement("i")
          hstar.className = "fas fa-star-half-alt"
          ele6.appendChild(hstar)
        }

        for (y = 0; y < (5 - this.numWholeStars(exavg) - this.numHalfStars(exavg)); y++) {
          let gstar = document.createElement("i")
          gstar.className = "fa fa-star"
          ele7.appendChild(gstar)
        }

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