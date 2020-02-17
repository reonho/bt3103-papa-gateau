<template>
    <div id="AddModuleModal">
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
    </div>
</template>


<script>
export default {
    name: 'AddModuleModal',
    props: {
        msg: String
    },
    components:function(){
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
