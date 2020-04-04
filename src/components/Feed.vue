<template>
<div class="container-fluid py-5">
    <h3 style="text-align:center"> My Reviews </h3>
  <!-- For Demo Purpose -->

  <div class="py-5">
    <div class="row">
      <div class="col-lg-9 mx-auto">
        <md-card class="md-primary" md-with-hover>
            <md-ripple>
                <md-card-header>
                <div class="md-title">Reviews</div>
                <div class="md-subhead">With hover and ripple effects</div>
                </md-card-header>
            </md-ripple>
        </md-card>
        
        <div class="card shadow mb-4">
          <div class="card-body shadow-sm p-5">
            <!-- Default breadcrumb-->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">21 LIKES</li>
                <li class="breadcrumb-item">2 COMMENTS</li>
                <li class="breadcrumb-item">3000 VIEWS</li>
                <!--li aria-current="page" class="breadcrumb-item active text-uppercase">Data</li-->
              </ol>
            </nav>
            <h5 class="text-muted">BT3103 Application Development for Business Analytics </h5>
            <p class="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
          </div>
        </div>

        <div class="card shadow mb-4">
          <div class="card-body shadow-sm p-5">
            <!-- Default breadcrumb-->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">2 LIKES</li>
                <li class="breadcrumb-item">2 COMMENTS</li>
                <li class="breadcrumb-item">920 VIEWS</li>
                <!--li aria-current="page" class="breadcrumb-item active text-uppercase">Data</li-->
              </ol>
            </nav>
            <h5 class="text-muted">BT3102 Computational Methods for Business Analytics </h5>
            <p class="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
          </div>
        </div>

        <div class="card shadow mb-4">
          <div class="card-body shadow-sm p-5">
            <!-- Default breadcrumb-->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">10 LIKES</li>
                <li class="breadcrumb-item">3 COMMENTS</li>
                <li class="breadcrumb-item">1050 VIEWS</li>
                <!--li aria-current="page" class="breadcrumb-item active text-uppercase">Data</li-->
              </ol>
            </nav>
            <h5 class="text-muted">CS1010S </h5>
            <p class="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
          </div>
        </div>
        
     
      </div>
    </div>
  </div>
</div>
</template>


<script>
    export default {
        name: 'Feed',
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
</style>
