import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

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
  props: ['semester', 'code'],
  methods: {
    fetchItems: function () {
      database.firebase_data.collection('reviews').get().then(querySnapShot => {
        var faculties = new Object()
        var display = false
        querySnapShot.forEach(doc => {
          var sem = doc.data().detailsForm.selectedSemester
          var modCode = doc.data().module_code
          if (sem.includes("Semester " + (this.semester + 1)) && modCode == this.code) {
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
    this.renderChart(this.chartData, this.options)
  }
}