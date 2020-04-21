import { HorizontalBar } from "vue-chartjs";
import database from "./firebase.js";
//const { reactiveProp } = mixins

export default {
  extends: HorizontalBar,
  //mixins: [reactiveProp],
  props: ["semester", "code", "years", "loading"],
  data: function() {
    return {
      numPpl: 0,
      datacollection: {
        labels: ["5 star", "4 star", "3 star", "2 star", "1 star"],
        datasets: [
          {
            data: [],
            label: "Number of votes",
            backgroundColor: "rgb(255,99,71,0.5)",
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                display: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        animation: {
          animateRotate: true
        } 
      },
    };
  },
  methods: {
    calc (n) {
      return Math.round((n / this.numPpl + Number.EPSILON) * 100) / 100;
    },
    fetchItems: function() {  
      database.firebase_data
        .collection("reviews")
        .get()
        .then((querySnapShot) => {
          var numbers = [0, 0, 0, 0, 0];
          var easy = [0, 0, 0, 0, 0];
          var manag = [0, 0, 0, 0, 0];
          var eman = [0, 0, 0, 0, 0];
          var work = [0, 0, 0, 0, 0];
          var display = false;
          this.numPpl = 0;
          querySnapShot.forEach((doc) => {
            let sem = doc.data().detailsForm.selectedSemester;
            let modCode = doc.data().module_code;
            let yr = doc.data().detailsForm.selectedYear;
            // console.log(sem)
            if (
              (isNaN(sem)
                ? sem.includes("Semester " + (this.semester + 1))
                : sem == this.semester) &&
              modCode == this.code &&
              this.years.includes(yr)
            ) {
              this.numPpl += 1;
              display = true;
              let rating = doc.data().commentForm.rating;
              numbers[rating - 1] += 1;

              let easiness = doc.data().commentForm.difficulty;
              easy[easiness - 1] += 1;

              let asgnmt = doc.data().tutorialForm.ap;
              manag[asgnmt - 1] += 1;

              let exam = doc.data().tutorialForm.exam;
              eman[exam - 1] += 1;

              let wkload = doc.data().commentForm.workload;
              work[wkload - 1] += 1;
            }
          });

          this.datacollection.datasets[0].data = numbers.reverse();
          var sum = 0, esum = 0, msum = 0, exsum = 0, wsum = 0;
          for (var i = 0; i < 5; i++) {
            sum += numbers[i] * (5 - i);
            esum += easy[i] * (i + 1);
            msum += manag[i] * (i + 1);
            exsum += eman[i] * (i + 1);
            wsum += work[i] * (i + 1);
          }
          // console.log(sum)
          // console.log(this.calc(sum))
          this.$root.$emit("showValues", this.calc(sum), "avg");
          this.$root.$emit("showValues", this.calc(esum), "easy");
          this.$root.$emit("showValues", this.calc(msum), "manag_asgn");
          this.$root.$emit("showValues", this.calc(exsum), "manag_exam");
          this.$root.$emit("showValues", this.calc(wsum), "manag_wkld");
          this.$root.$emit("showValues", this.numPpl, "ratings");
          if (display) this.renderChart(this.datacollection, this.options);
        });  
    },
  },
  created() {
    this.fetchItems();
  },
  watch: {
    years: function() {
      this.datacollection.datasets[0].data = []
      this.options.animation.animateRotate = false
      this.fetchItems();
    },
  },
};
