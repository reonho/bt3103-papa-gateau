<template>
<div class="NavBar" style="border-bottom:1px solid white;border-bottom-color:grey;font-family:'PT Sans', 'Dosis', 'Fira Sans'">
   <md-toolbar class="test" style="" md-elevation="0">
       <h3 class="md-title" style="flex: 2; color:white;font-weight:bold">
        <router-link class="nav-link" to="/">
           <md-button style="font-weight:600;font-size: 150%;color:white;font-family: 'Varela Round','Dosis','Fira Sans'"><img src="../../public/logo_transparent2.png" style="height:40px;width:50px;padding-bottom:5px" /> MODEAUX</md-button>
        </router-link>
        </h3>
          <md-button style="color:white;font-weight:bold" v-on:click="logout()">Logout</md-button>
        <md-menu md-size="medium" md-align-trigger>
        </md-menu>
        <router-link class="nav-link" to="/">
          <md-button style="color:white;font-weight:bold">Dashboard</md-button>
        </router-link>

        <router-link class="nav-link" to="/ModuleList">
          <md-button style="color:white;font-weight:bold" class="md-primary">Modules</md-button>
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
    import database from '../firebase'
    export default {
        name: 'NavBar',
        props: {
            msg: String,
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
            },
            logout(){
                console.log("hi")
                var self = this
                database.logout().then(function(e){
                    if(e){
                        self.$router.push("/loginPage")
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test {
    background: url('../assets/background.png') no-repeat;
    border:none;
    background-size: cover;
   
}
html {
    margin:0
}
.nav-link.router-link-active {
    padding-left:0;
}
.md-ripple {
    padding-left:0;
}
.md-toolbar.test.md-theme-default.md-elevation-0 {
    padding-left:0;
}
</style>
