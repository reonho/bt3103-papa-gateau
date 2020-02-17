<template>
<div class="loginPage">
    <div style="text-align: justify">
        <h1 class="mt-4 mb-3 ml-3">BT3103 Login Page</h1>
        <li class="nav-item">
        <router-link class="LandPage" to="/LandPage">Login</router-link>
        </li>
    </div>
</div>
</template>


<script>
    export default {
    name: 'loginPage',
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
