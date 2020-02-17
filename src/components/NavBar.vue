<template>
<div class="NavBar">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
    <div class="container">
        <a class="navbar-brand" href="#">
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
            <router-link class="nav-link" to="/">logout</router-link>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
            </li>
        </ul>
        </div>
    </div>
    </nav>
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
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
