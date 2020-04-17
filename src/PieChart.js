import database from "./firebase.js"
import { Doughnut } from 'vue-chartjs'
//const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  //mixins: [reactiveProp],
  data: function () {
    return {
      ratings: 0,
      datacollection: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(185,168,242)",
              "rgb(42,179,189)",
              "rgb(41,227,199)",
              "rgb(213,240,111)"
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
  props: ['semester', 'code', 'years'],
  methods: {
    fetchItems: function () {
      database.firebase_data.collection('reviews').get().then(querySnapShot => {
        var faculties = new Object()
        var display = false
        querySnapShot.forEach(doc => {
          var sem = doc.data().detailsForm.selectedSemester
          
          var modCode = doc.data().module_code
          var yr = doc.data().detailsForm.selectedYear
          if ((isNaN(sem) ? sem.includes("Semester " + (this.semester + 1)) || sem.includes("Special Term " + (this.semester - 1)) : sem == this.semester) && modCode == this.code && this.years.includes(yr)) {
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
        var ratings = this.datacollection.datasets[0].data.reduce((a, b) => a + b, 0);
        this.$root.$emit("showratings", ratings);
        document.getElementById("ratings").innerHTML = ratings;
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
  },
  watch: {
    years: function () {
      this._data._chart.destroy()
      this.datacollection.datasets[0].data = []
      this.options.title.text = "Faculties"
      this.fetchItems()
    }
  }
}