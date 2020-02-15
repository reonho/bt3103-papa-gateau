<template>
<div class="land">
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
    <div class="container">
        <h1 class="mt-4 mb-5">BT3103 Protoype App</h1>
         <!--button type="button" data-toggle="modal" data-target="#myModal">Launch modal</button!-->
         
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add a Subject</button>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add New Module</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            Module Code:
                            <input name="mod" value="" type="text" class="form-control mb-2">

                            Semester Undertaken:
                            <input name="sem" value="" type="text" class="form-control mb-2">
                            
                            Professor:
                            <input name="prof" value="" type="text" class="form-control mb-2">  
                           
                            Grade Obtained:
                            <input name="grade" value="" type="text" class="form-control mb-2"> 
                            
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
                    <button type="button" class="btn btn-primary">Confirm</button>
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
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './style.css';
</style>
