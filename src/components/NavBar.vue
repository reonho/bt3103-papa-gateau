<template>

<div class="NavBar">
   <md-toolbar class="md-accent" style="background:salmon" md-elevation="2">
       <h3 class="md-title" style="flex: 2; font-size: 250%; margin-left:4vh;cursor:pointer" onclick="window.location.href = '/#/LandPage';">Modeaux</h3>
       <router-link class="nav-link" to="/">
          <md-button>Logout</md-button>
        </router-link>
        <md-menu md-size="medium" md-align-trigger>
            <md-button md-menu-trigger>Dashboard</md-button>
            <md-menu-content>
                <md-menu-item @click="scroll(227.578125)">Statistics</md-menu-item>
                <md-menu-item @click="scroll(227.578125)">Academic Progress</md-menu-item>
                <md-menu-item @click="scroll(839.828125)">Degree Progress</md-menu-item>
                <md-menu-item @click="scroll(-110)">Back to Top</md-menu-item>
            </md-menu-content>
        </md-menu>
        <router-link class="nav-link" to="/ModuleList">
          <md-button class="md-primary">Modules</md-button>
        </router-link>
    </md-toolbar>
    
    <!-- Navigation>
    <nav class="navbar-expand-lg navbar-dark bg-dark static-top">
    <div class="container-fluid">

        <a class="navbar-brand ml-1" href="#">
         
            <img src="https://www.iconsdb.com/icons/preview/white/nike-xxl.png" alt="" height=50 width=50>
            </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
            <router-link to="/"/>
            <li class="nav-item">
            <router-link class="nav-link" to="/LandPage">Dashboard</router-link>
            </li>
            <li class="nav-item">
           
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
            </li>
        </ul>
        </div>
    </div>
    </nav-->
</div>
</template>


<script>
    export default {
        name: 'NavBar',
        props: {
            msg: String
        },
        components:{
        },
        data: function(){ 
            return {
            };
        },
        methods: {
            scroll(ev){
                this.$emit('scroll',ev)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
