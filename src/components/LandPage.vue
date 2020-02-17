<template>
<div class="land">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div class="container" id="navbar">
            <a class="navbar-brand" href="#">
                <img src="https://www.iconsdb.com/icons/preview/white/nike-xxl.png" alt="" height=50 width=50>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                <a class="nav-link" href="#">Home
                        <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Services</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Contact</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>

<!-- Page Content -->
    <div class="container-fluid" style="text-align: justify">
        <h1 class="mt-4 mb-3 ml-3">BT3103 Protoype App</h1>
        <h3 class = "ml-3">My Stats </h3>
        <div style="display:flex" class= "container-fluid p-3">
            <div id="chart" style="width:50% ;" class="mb-4 mt-4">
                <apexchart type="radar" :options="chartOptions2" :series="series1"></apexchart>
            </div>
            <div id="chart" style="width:50% ;" class="mb-4 mt-4">
                <apexchart type="line" :options="chartOptions1" :series="series2"></apexchart>
            </div>
        
        </div>

        <div id = "modlist">
            Modules Included: {{ moduleList }}
        </div>

        <div id="mod-modal">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add Module</button>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Module</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                Module Code:
                                <input name="mod" v-model = "mod" value="" type="text" class="form-control mb-2">

                                Semester Undertaken:
                                <input name="sem" v-model = "sem" value="" type="text" class="form-control mb-2">
                                
                                Professor:
                                <input name="prof" v-model = "prof" value="" type="text" class="form-control mb-2">  
                            
                                Grade Obtained:
                                <input name="grade" v-model = "grade" value="" type="text" class="form-control mb-2"> 
                                
                                <!--input type="text" class="form-control" id="module-code">
                                </div>
                                <div class="form-group">
                                <label for="message-text" class="col-form-label">Message</label>
                                <textarea class="form-control" id="message-text"></textarea-->
                            </div>
                        </form>
                    </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button v-on:click = "printMods()" type="button" class="btn btn-success success">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p></p>
        
        
    </div>
</div>

</template>

<script>
export default {
  name: 'LandPage',
  props: {
    msg: String
  },
  components:function(){
  },
  data: function(){ 
    return {series1: [{ name: 'My Average',data: [5, 4.5, 4, 5, 3, 4],}, { name: 'NUS Average',data: [3.6, 3, 4, 3.5, 4, 4],}],
    series2: [{ name: 'Series 2',data: [4.1, 4.4, 4.2, 4],}],
    chartOptions2: {
        chart: {
            height: 350,
            type: 'radar',
            dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 5,
                left: 5,
                blur: 3,
                color: '#000',
                opacity: 0.3
            },
        },
        dataLabels: {
            enabled: true,
        },
        title: {
            text: ''
        },
        xaxis: {
            labels: {
             style: {
                fontSize: '15px',
                colors: ''
             }
            },
            categories: ['CS', 'BT', 'EC', 'MA', 'IS', 'CNM']
        },
    },
    moduleList: [],
    mod: "",

    chartOptions1: {
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 1,
                left: 1,
                blur: 10,
                opacity: 0.15
            },
            toolbar: {
            show: false
            }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            labels: {
                style: {
                fontSize: '15px',
                colors: ''
                }
            },
            categories: ['Y1S1', 'Y1S2', 'Y1S2', 'Y2S2']
        },
        yaxis: {
              title: {
                text: 'CAP'
              },
              
              max: 5.0,
              min: 1
            },
            
    },
   

    };
  
},
methods: {
    printMod: function(){
    var moduleTitle = document.createElement("FORM");
    moduleTitle.setAttribute("id", "mod");
    document.body.appendChild(x);
    var sem = document.createTextNode("sem");
    var prof = document.createTextNode("prof");
    var grade = document.createTextNode("grade");
    x.appendChild(sem);
    x.appendChild(prof);
    x.appendChild(grade);
    
},

printMods() {
    this.moduleList = this.mod
  },
}



  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';

</style>
