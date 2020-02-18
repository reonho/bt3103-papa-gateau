<template>
<div class="container-fluid py-5">
    <h3 style="text-align:center"> My Reviews </h3>
  <!-- For Demo Purpose -->

  <div class="py-5">
    <div class="row">
      <div class="col-lg-9 mx-auto">
        
        
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
.breadcrumb-caret .breadcrumb-item+.breadcrumb-item::before {
  content: '\f0da';
  font-family: 'FontAwesome';
}

/* Bullet */
.breadcrumb-bullet .breadcrumb-item+.breadcrumb-item::before {
  content: '•';
}

/* Arrow Breadcrumb */
.breadcrumb-arrow .breadcrumb-item+.breadcrumb-item::before {
  content: '';
}

.breadcrumb-arrow {
  height: 40px;
  line-height: 40px;
}

.breadcrumb-arrow .breadcrumb-item:first-child a {
  border-radius: 4px 0 0 4px;
}

.breadcrumb-arrow .breadcrumb-item,
.breadcrumb-arrow .breadcrumb-item a,
.breadcrumb-arrow .breadcrumb-item span {
  display: inline-block;
  vertical-align: top;
}

.breadcrumb-arrow .breadcrumb-item:not(:first-child) {
  margin-left: -1px;
}

.breadcrumb-arrow .breadcrumb-item+.breadcrumb-item:before {
  padding: 0;
  content: "";
}

.breadcrumb-arrow .breadcrumb-item a,
.breadcrumb-arrow .breadcrumb-item.active {
  height: 40px;
  padding: 0 10px 0 25px;
  line-height: 40px;
}

.breadcrumb-arrow .breadcrumb-item a {
  position: relative;
  color: #fff;
  text-decoration: none;
  background-color: #3bafda;
  border: 1px solid #3bafda;
}

.breadcrumb-arrow .breadcrumb-item a:after,
.breadcrumb-arrow .breadcrumb-item a:before {
  position: absolute;
  top: -1px;
  width: 0;
  height: 0;
  content: '';
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}

.breadcrumb-arrow .breadcrumb-item a:before {
  right: -10px;
  z-index: 3;
  border-left-color: #3bafda;
  border-left-style: solid;
  border-left-width: 11px;
}

.breadcrumb-arrow .breadcrumb-item a:after {
  right: -11px;
  z-index: 2;
  border-left: 11px solid #2494be;
}

.breadcrumb-arrow .breadcrumb-item a:focus,
.breadcrumb-arrow li a:hover {
  background-color: #4fc1e9;
  border: 1px solid #4fc1e9;
}

.breadcrumb-arrow .breadcrumb-item a:focus:before,
.breadcrumb-arrow li a:hover:before {
  border-left-color: #4fc1e9;
}

.breadcrumb-arrow li.active:after,
.breadcrumb-arrow li.active:before {
  border-left-color: #2494be;
}

/*
*
* ==========================================
* FOR DEMO PURPOSES
* ==========================================
*
*/
body {
  min-height: 100vh;
  background-color: #00d2ff;
  background-image: linear-gradient(147deg, #00d2ff 0%, #3a7bd5 100%);
}

.text-uppercase {
  letter-spacing: 0.15em;
}
</style>
