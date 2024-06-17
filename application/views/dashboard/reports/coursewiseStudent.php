    <section class="content"> 
        <div class="container-fluid">
            <ol class="breadcrumb breadcrumb-bg-teal">
                <li><a href="javascript:void(0);"><i class="material-icons">home</i> Home</a></li>
                <li class="active"><i class="material-icons">assignment</i> <?=$heading ?></li>
             </ol> 
            <!-- Basic DataTable -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2><?=$heading ?> 
                            </h2>                       
                        </div>                    
                        <div class="body">
                            <div class="row">
                                <div class="col-md-2">
                                    <label for="recipient-name" class="col-form-label">Course :<span class="compulsoryField">&nbsp;*</span></label>
                                </div>
                                <div class="col-md-4">
                                    <select class="form-control searchData" id="course">
                                    </select> 
                                </div>                                                        
                            </div><br />                              
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="dataTable-Banner">
                                    <thead>
                                        <tr>
                                            <th style="width: 60px;">Sr.No</th>
                                            <th>Student Name</th>
                                            <th>Contact</th>
                                            <th>Email Id</th>
                                            <!-- <th>Address</th> -->
                                        </tr>
                                    </thead>
                                    <tbody id="loadBanner">                                                                                 
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>  
            <div class="row clearfix">
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10"></div>
                <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                    <a href="<?=base_url();?>Admin/dashboard" class="btn bg-teal btn-lg waves-effect"><i class="glyphicon glyphicon-arrow-left"></i>&nbsp;&nbsp;Back</a>
                </div>            
            </div><br>                       
            <!-- #END# Basic DataTable -->          
        </div>
    </section> 
    <script src="<?=base_url()?>assets/dashboard/js/custom/coursewiseStudent.js"></script> 