
<ol class="breadcrumb">
  <li><a href="<?=base_url()?>">Home</a></li>&nbsp;/&nbsp;
  <li class="active">Retrospectives</li>
</ol>
 
    <section class="ftco-section">
      <div class="container">
         
        <div class="row d-flex">
            <div class="body">
               <?php
                    if (($this->session->userdata('id') != '') &&  ($this->session->userdata('name') !='')) {          
               ?>
                      <div class="table-responsive">
                            <table class="table table-bordered table-hover js-basic-example dataTable" id="dataTable-Banner">
                                <thead>
                                     <tr>
                                        <th colspan="6"><center>Retrospectives</center></th>
                                    </tr>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Year</th>
                                        <th>Course</th>
                                        <th>Technology</th>
                                        <th>Title</th>
                                        <th>Download</th>
                                    </tr>
                                </thead>
                                <tbody id="loadBanner">  
                                      <?php   $i=1;
                                        foreach ($data as $res)
                                          {  
                                      ?>     
                                          <tr>
                                            <td><?=$i; ?></td>
                                            <td><?=$res['startyear']; ?>-<?=$res['endyear']; ?></td>
                                            <td><?=$res['course']; ?></td>
                                            <td><?=$res['technology']; ?></td>
                                            <td><?=$res['project_name']; ?></td>
                                            <td><a href="<?=base_url()?>Documentation/<?=$res['project_file']; ?>" class="btn btn-success" download="<?=$res['project_file']; ?>">Download</a></td>
                                        </tr>
                                      <?php
                                            $i++;
                                          }                    
                                      ?>                                                                      
                                </tbody>
                            </table>
                      </div>
              <?php                
                  } 
                 else { ?>
                      <div class="table-responsive">
                            <table class="table table-bordered table-hover js-basic-example dataTable" id="dataTable-Banner">
                                <thead>
                                     <tr>
                                        <th colspan="6"><center>Please login to download previous year documentation. Click here to Login <a href="#" id="open-model" class="btn btn-success">Login</a></center></th>
                                    </tr>
                                </thead>
                            </table>
                      </div>                                     
              <?php 
                  }
              ?>  
              <br><br><br><br><br><br><br><br><br>      
            </div>

            <!-- Code for Modal Popup -->
            <div id="save-banner" class="modal fade" data-toggle="modal" data-keyboard="false" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="blue bigger" id="title">Login</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">                                                     
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="tehsil-name" class="col-form-label">Username :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="txt_name" placeholder="Username">
                                </div>                                                        
                            </div><br />  
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="tehsil-name" class="col-form-label">Password :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-8">
                                    <input type="password" class="form-control" id="txt_pass" placeholder="Password">
                                </div>                                                        
                            </div><br />                                                                                                                                                                                                                          
                        </div>
                        <div id="loadingDiv" class="pageLoader">
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-danger">
                                <i class="ace-icon fa fa-times"></i>
                                Cancel
                            </button>
                            <button id="btn_save" class="btn btn-success">
                                <i class="ace-icon fa fa fa-check-square-o"></i>
                                Login
                            </button>
                        </div>           
                    </div>
                </div>
            </div>
            <!-- End of Modal Popup Window -->

        </div>
      </div>
    </section>

        <script type="text/javascript">
        $(document).ready(function() {
              $("#open-model").click(function(){
                     $('#save-banner').modal('show');
              });

              $("#btn_save").click(function(){
                    var name = $('#txt_name').val();
                    var pass = $('#txt_pass').val();  
                    if (name!="") 
                      {
                         if (pass!="") {
                                 $.post(base_url+'Mainpage/studentLogin',{name: name, pass:pass},function(res){
                                      if (res>0)
                                       {
                                           alert("Login successfully.....!");  
                                           location.reload(true);                                                                
                                       }
                                       else
                                       { 
                                           alert("Login failed.....!");  
                                       }
                                });   
                         }else{
                            alert("Please enter password......!");
                         }
                      }else{
                         alert("Please enter username......!");
                      }                                      
              });
        });
    </script>
		